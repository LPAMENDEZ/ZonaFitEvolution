const bcrypt = require('bcrypt');
const usuarioRepository = require('../repositories/usuario.repository');
const ErrorDominio = require('../utils/errores');

const SALT_ROUNDS = 10;

function validarCorreo(correo) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(correo);
}

function validarContrasena(contrasena) {
  // Mínimo 8 caracteres, al menos una letra y un número
  return contrasena.length >= 8 && /[A-Za-z]/.test(contrasena) && /[0-9]/.test(contrasena);
}

async function registrarUsuario({ nombre, correo, contrasena, rol_id }) {
  if (!nombre || !correo || !contrasena || !rol_id) {
    throw new ErrorDominio('Todos los campos son obligatorios');
  }

  if (!validarCorreo(correo)) {
    throw new ErrorDominio('El correo no tiene un formato válido');
  }

  if (!validarContrasena(contrasena)) {
    throw new ErrorDominio('La contraseña debe tener mínimo 8 caracteres, con letras y números');
  }

  const existente = await usuarioRepository.obtenerPorCorreo(correo);
  if (existente) {
    throw new ErrorDominio('Ya existe un usuario registrado con ese correo', 409);
  }

  const contrasenaHasheada = await bcrypt.hash(contrasena, SALT_ROUNDS);

  const nuevoId = await usuarioRepository.crear({
    nombre,
    correo,
    contrasena: contrasenaHasheada,
    rol_id
  });

  const usuarioCreado = await usuarioRepository.obtenerPorId(nuevoId);
  return usuarioCreado.toJSON(); // toJSON ya excluye la contraseña
}

async function listarUsuarios() {
  const usuarios = await usuarioRepository.obtenerTodos();
  return usuarios.map(u => u.toJSON());
}

async function obtenerUsuario(id) {
  const usuario = await usuarioRepository.obtenerPorId(id);
  if (!usuario) {
    throw new ErrorDominio('Usuario no encontrado', 404);
  }
  return usuario.toJSON();
}

async function actualizarUsuario(id, { nombre, correo, rol_id }) {
  const usuario = await usuarioRepository.obtenerPorId(id);
  if (!usuario) {
    throw new ErrorDominio('Usuario no encontrado', 404);
  }

  if (correo && !validarCorreo(correo)) {
    throw new ErrorDominio('El correo no tiene un formato válido');
  }

  const actualizado = await usuarioRepository.actualizar(id, { nombre, correo, rol_id });
  if (!actualizado) {
    throw new ErrorDominio('No se pudo actualizar el usuario');
  }

  return obtenerUsuario(id);
}

async function eliminarUsuario(id) {
  const usuario = await usuarioRepository.obtenerPorId(id);
  if (!usuario) {
    throw new ErrorDominio('Usuario no encontrado', 404);
  }

  await usuarioRepository.eliminar(id);
  return { mensaje: 'Usuario eliminado correctamente' };
}

module.exports = {
  registrarUsuario,
  listarUsuarios,
  obtenerUsuario,
  actualizarUsuario,
  eliminarUsuario
};
