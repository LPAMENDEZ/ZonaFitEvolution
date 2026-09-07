const pool = require('../config/database');
const Rol = require('../models/rol.model');

async function crear(nombre) {
  const [resultado] = await pool.query(
    'INSERT INTO roles (nombre) VALUES (?)',
    [nombre]
  );
  return resultado.insertId;
}

async function obtenerTodos() {
  const [filas] = await pool.query('SELECT * FROM roles');
  return filas.map(fila => new Rol(fila));
}

async function obtenerPorId(id) {
  const [filas] = await pool.query('SELECT * FROM roles WHERE id = ?', [id]);
  if (filas.length === 0) return null;
  return new Rol(filas[0]);
}

async function obtenerPorNombre(nombre) {
  const [filas] = await pool.query('SELECT * FROM roles WHERE nombre = ?', [nombre]);
  if (filas.length === 0) return null;
  return new Rol(filas[0]);
}

async function eliminar(id) {
  const [resultado] = await pool.query('DELETE FROM roles WHERE id = ?', [id]);
  return resultado.affectedRows > 0;
}

module.exports = {
  crear,
  obtenerTodos,
  obtenerPorId,
  obtenerPorNombre,
  eliminar
};
