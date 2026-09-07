const rolRepository = require('../repositories/rol.repository');
const ErrorDominio = require('../utils/errores');

async function crearRol(nombre) {
  if (!nombre || nombre.trim().length === 0) {
    throw new ErrorDominio('El nombre del rol es obligatorio');
  }

  const existente = await rolRepository.obtenerPorNombre(nombre);
  if (existente) {
    throw new ErrorDominio('Ya existe un rol con ese nombre', 409);
  }

  const nuevoId = await rolRepository.crear(nombre);
  return rolRepository.obtenerPorId(nuevoId);
}

async function listarRoles() {
  return rolRepository.obtenerTodos();
}

async function obtenerRol(id) {
  const rol = await rolRepository.obtenerPorId(id);
  if (!rol) {
    throw new ErrorDominio('Rol no encontrado', 404);
  }
  return rol;
}

async function eliminarRol(id) {
  const rol = await rolRepository.obtenerPorId(id);
  if (!rol) {
    throw new ErrorDominio('Rol no encontrado', 404);
  }
  await rolRepository.eliminar(id);
  return { mensaje: 'Rol eliminado correctamente' };
}

module.exports = {
  crearRol,
  listarRoles,
  obtenerRol,
  eliminarRol
};
