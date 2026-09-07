const pool = require('../config/database');
const Usuario = require('../models/usuario.model');

async function crear({ nombre, correo, contrasena, rol_id }) {
  const [resultado] = await pool.query(
    'INSERT INTO usuarios (nombre, correo, contrasena, rol_id) VALUES (?, ?, ?, ?)',
    [nombre, correo, contrasena, rol_id]
  );
  return resultado.insertId;
}

async function obtenerTodos() {
  const [filas] = await pool.query('SELECT * FROM usuarios');
  return filas.map(fila => new Usuario(fila));
}

async function obtenerPorId(id) {
  const [filas] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
  if (filas.length === 0) return null;
  return new Usuario(filas[0]);
}

async function obtenerPorCorreo(correo) {
  const [filas] = await pool.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
  if (filas.length === 0) return null;
  return new Usuario(filas[0]);
}

async function actualizar(id, { nombre, correo, rol_id }) {
  const [resultado] = await pool.query(
    'UPDATE usuarios SET nombre = ?, correo = ?, rol_id = ? WHERE id = ?',
    [nombre, correo, rol_id, id]
  );
  return resultado.affectedRows > 0;
}

async function eliminar(id) {
  const [resultado] = await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);
  return resultado.affectedRows > 0;
}

module.exports = {
  crear,
  obtenerTodos,
  obtenerPorId,
  obtenerPorCorreo,
  actualizar,
  eliminar
};
