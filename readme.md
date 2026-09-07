# Zona Fit Evolution — API

API REST para la gestión de usuarios, roles y membresías de un gimnasio.

## Arquitectura

Arquitectura en capas sobre Node.js + Express + MySQL:

- **routes/** — define los endpoints HTTP
- **controllers/** — recibe la petición, llama al servicio, responde
- **services/** — lógica de negocio y validaciones
- **repositories/** — queries SQL aisladas
- **models/** — estructura de las entidades
- **middlewares/** — validación de entrada y manejo de errores
- **config/** — conexión a base de datos
- **app.js** — configuración de la app de Express (middlewares + rutas)
- **server.js** — punto de entrada, levanta el servidor HTTP

## Entidad Usuario — Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| POST | /api/usuarios | Registrar usuario |
| GET | /api/usuarios | Listar usuarios |
| GET | /api/usuarios/:id | Obtener usuario por id |
| PUT | /api/usuarios/:id | Actualizar usuario |
| DELETE | /api/usuarios/:id | Eliminar usuario |

## Entidad Rol — Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| POST | /api/roles | Crear rol |
| GET | /api/roles | Listar roles |
| GET | /api/roles/:id | Obtener rol por id |
| DELETE | /api/roles/:id | Eliminar rol |

## Entidad Membresía — Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| POST | /api/membresias | Crear membresía |
| GET | /api/membresias | Listar membresías |
| GET | /api/membresias/:id | Obtener membresía por id (incluye datos del usuario) |
| PATCH | /api/membresias/:id/cancelar | Cancelar membresía |
| DELETE | /api/membresias/:id | Eliminar membresía |

## Instalación

```bash
npm install
cp .env.example .env   # completar credenciales de MySQL
mysql -u root -p < database/init.sql
node server.js
```

## Reglas de negocio implementadas

**Usuario**
- Correo único por usuario
- Contraseña mínimo 8 caracteres, con letras y números
- Contraseñas hasheadas con bcrypt, nunca expuestas en respuestas

**Rol**
- No se permiten roles con nombre duplicado

**Membresía**
- No se permite crear una membresía si el usuario no existe
- No se permite una segunda membresía **activa** para el mismo usuario (evita duplicidad/transferencia indebida)
- `fecha_fin` se calcula automáticamente según el tipo (`mensual`: 30 días, `trimestral`: 90 días, `anual`: 365 días) a partir de `fecha_inicio`
- Estados posibles: `activa`, `vencida`, `cancelada`

## Manejo de errores

Todas las validaciones de negocio lanzan `ErrorDominio` (`src/utils/errores.js`), capturado por el middleware centralizado `error.middleware.js`, que responde con el código de estado correspondiente (400, 404, 409, etc.) y un JSON `{ error: mensaje }`.

## Pendiente

- `auth.middleware.js` — autenticación/autorización (aún sin implementar)
- Módulo de membresías: servicios y rutas ya cubren CRUD + regla de duplicidad; falta definir permisos por rol
- Tests automatizados (por ahora hay scripts manuales `test-*.js` en la raíz, no comiteados, usados como herramientas de prueba local)

## Flujo de trabajo (Git Flow)

Ramas principales: `main` (producción) y `develop` (integración). Cada funcionalidad se desarrolla en una rama `feature/<nombre>` creada desde `develop` y se integra de vuelta con merge (`--no-ff`).
