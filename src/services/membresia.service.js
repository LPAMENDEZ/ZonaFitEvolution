const membresiaRepository = require('../repositories/membresia.repository');
const usuarioRepository = require('../repositories/usuario.repository');
const ErrorDominio = require('../utils/errores');

const DURACION_DIAS = {
  mensual: 30,
  trimestral: 90,
  anual: 365
};

function calcularFechaFin(fechaInicio, tipo) {
  const dias = DURACION_DIAS[tipo];
  if (!dias) {
    throw new ErrorDominio('Tipo de membresía no válido. Usa: mensual, trimestral o anual');
  }

  const fecha = new Date(fechaInicio);
  fecha.setDate(fecha.getDate() + dias);
  return fecha.toISOString().split('T')[0]; // formato YYYY-MM-DD
}

async function crearMembresia({ tipo, precio, fecha_inicio, usuario_id }) {
  if (!tipo || !precio || !fecha_inicio || !usuario_id) {
    throw new ErrorDominio('Todos los campos son obligatorios');
  }

  const usuario = await usuarioRepository.obtenerPorId(usuario_id);
  if (!usuario) {
    throw new ErrorDominio('El usuario indicado no existe', 404);
  }

  const membresiaActiva = await membresiaRepository.obtenerActivaPorUsuario(usuario_id);
  if (membresiaActiva) {
    throw new ErrorDominio('El usuario ya tiene una membresía activa. No se puede duplicar.', 409);
  }

  const fecha_fin = calcularFechaFin(fecha_inicio, tipo);

  const nuevoId = await membresiaRepository.crear({
    tipo,
    precio,
    fecha_inicio,
    fecha_fin,
    usuario_id
  });

  return membresiaRepository.obtenerConUsuario(nuevoId);
}

async function listarMembresias() {
  return membresiaRepository.obtenerTodas();
}

async function obtenerMembresia(id) {
  const membresia = await membresiaRepository.obtenerConUsuario(id);
  if (!membresia) {
    throw new ErrorDominio('Membresía no encontrada', 404);
  }
  return membresia;
}

async function cancelarMembresia(id) {
  const membresia = await membresiaRepository.obtenerPorId(id);
  if (!membresia) {
    throw new ErrorDominio('Membresía no encontrada', 404);
  }

  if (membresia.estado === 'cancelada') {
    throw new ErrorDominio('La membresía ya está cancelada');
  }

  await membresiaRepository.actualizarEstado(id, 'cancelada');
  return { mensaje: 'Membresía cancelada correctamente' };
}

async function eliminarMembresia(id) {
  const membresia = await membresiaRepository.obtenerPorId(id);
  if (!membresia) {
    throw new ErrorDominio('Membresía no encontrada', 404);
  }
  await membresiaRepository.eliminar(id);
  return { mensaje: 'Membresía eliminada correctamente' };
}

module.exports = {
  crearMembresia,
  listarMembresias,
  obtenerMembresia,
  cancelarMembresia,
  eliminarMembresia
};
