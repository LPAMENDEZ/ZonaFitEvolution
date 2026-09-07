class Membresia {
  constructor({ id, tipo, precio, fecha_inicio, fecha_fin, estado, usuario_id, fecha_creacion }) {
    this.id = id;
    this.tipo = tipo;
    this.precio = precio;
    this.fecha_inicio = fecha_inicio;
    this.fecha_fin = fecha_fin;
    this.estado = estado;
    this.usuario_id = usuario_id;
    this.fecha_creacion = fecha_creacion;
  }
}

module.exports = Membresia;
