function manejadorErrores(error, req, res, next) {
  console.error('Error capturado:', error.message);

  const codigoEstado = error.codigoEstado || 500;
  const mensaje = error.codigoEstado ? error.message : 'Error interno del servidor';

  res.status(codigoEstado).json({ error: mensaje });
}

module.exports = manejadorErrores;
