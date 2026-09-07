class Usuario {
  constructor({ id, nombre, correo, contrasena, rol_id, fecha_creacion }) {
    this.id = id;
    this.nombre = nombre;
    this.correo = correo;
    this.contrasena = contrasena;
    this.rol_id = rol_id;
    this.fecha_creacion = fecha_creacion;
  }

  // Nunca exponer la contraseña al convertir a JSON (respuestas de API)
  toJSON() {
    return {
      id: this.id,
      nombre: this.nombre,
      correo: this.correo,
      rol_id: this.rol_id,
      fecha_creacion: this.fecha_creacion
    };
  }
}

module.exports = Usuario;
