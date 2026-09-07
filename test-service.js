const usuarioService = require('./src/services/usuario.service');

async function probar() {
  try {
    // Registrar usuario válido
    const usuario = await usuarioService.registrarUsuario({
      nombre: 'Liliana Test',
      correo: 'liliana.service@example.com',
      contrasena: 'clave1234',
      rol_id: 2
    });
    console.log('Usuario registrado (sin contraseña visible):', usuario);

    // Intentar registrar el mismo correo (debe fallar)
    try {
      await usuarioService.registrarUsuario({
        nombre: 'Otro',
        correo: 'liliana.service@example.com',
        contrasena: 'clave1234',
        rol_id: 2
      });
    } catch (error) {
      console.log('Error esperado (correo duplicado):', error.message);
    }

    // Intentar con contraseña débil (debe fallar)
    try {
      await usuarioService.registrarUsuario({
        nombre: 'Otro',
        correo: 'otro@example.com',
        contrasena: '123',
        rol_id: 2
      });
    } catch (error) {
      console.log('Error esperado (contraseña débil):', error.message);
    }

    // Limpieza
    await usuarioService.eliminarUsuario(usuario.id);
    console.log('Usuario de prueba eliminado');

    process.exit(0);
  } catch (error) {
    console.error('Error inesperado:', error.message);
    process.exit(1);
  }
}

probar();
