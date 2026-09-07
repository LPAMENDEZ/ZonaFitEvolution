const pool = require('../config/database');
const Membresia = require('../models/membresia.model');

async function crear({ tipo, precio, fecha_inicio, fecha_fin, usuario_id }) {
  const [resultado] = await pool.query(
    'INSERT INTO membresias (tipo, precio, fecha_inicio, fecha_fin, usuario_id) VALUES (?, ?, ?, ?, ?)',
    [tipo, precio, fecha_inicio, fecha_fin, usuario_id]
  );
  return resultado.insertId;
}

async function obtenerTodas() {
  const [filas] = await pool.query('SELECT * FROM membresias');
  return filas.map(fila => new Membresia(fila));
}

async function obtenerPorId(id) {
  const [filas] = await pool.query('SELECT * FROM membresias WHERE id = ?', [id]);
  if (filas.length === 0) return null;
  return new Membresia(filas[0]);
}

async function obtenerActivaPorUsuario(usuario_id) {
  const [filas] = await pool.query(
    "SELECT * FROM membresias WHERE usuario_id = ? AND estado = 'activa'",
    [usuario_id]
  );
  if (filas.length === 0) return null;
  return new Membresia(filas[0]);
}

async function obtenerConUsuario(id) {
  const [filas] = await pool.query(
    `SELECT m.*, u.nombre AS nombre_usuario, u.correo AS correo_usuario
     FROM membresias m
     JOIN usuarios u ON m.usuario_id = u.id
     WHERE m.id = ?`,
    [id]
  );
  if (filas.length === 0) return null;
  return filas[0]; // objeto plano, ya que mezcla dos entidades
}

async function actualizarEstado(id, estado) {
  const [resultado] = await pool.query(
    'UPDATE membresias SET estado = ? WHERE id = ?',
    [estado, id]
  );
  return resultado.affectedRows > 0;
}

async function eliminar(id) {
  const [resultado] = await pool.query('DELETE FROM membresias WHERE id = ?', [id]);
  return resultado.affectedRows > 0;
}

module.exports = {
  crear,
  obtenerTodas,
  obtenerPorId,
  obtenerActivaPorUsuario,
  obtenerConUsuario,
  actualizarEstado,
  eliminar
};
