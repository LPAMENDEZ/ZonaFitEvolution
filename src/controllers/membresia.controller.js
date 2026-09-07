const membresiaService = require('../services/membresia.service');

async function crear(req, res, next) {
  try {
    const membresia = await membresiaService.crearMembresia(req.body);
    res.status(201).json(membresia);
  } catch (error) {
    next(error);
  }
}

async function listar(req, res, next) {
  try {
    const membresias = await membresiaService.listarMembresias();
    res.status(200).json(membresias);
  } catch (error) {
    next(error);
  }
}

async function obtenerPorId(req, res, next) {
  try {
    const membresia = await membresiaService.obtenerMembresia(req.params.id);
    res.status(200).json(membresia);
  } catch (error) {
    next(error);
  }
}

async function cancelar(req, res, next) {
  try {
    const resultado = await membresiaService.cancelarMembresia(req.params.id);
    res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
}

async function eliminar(req, res, next) {
  try {
    const resultado = await membresiaService.eliminarMembresia(req.params.id);
    res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  crear,
  listar,
  obtenerPorId,
  cancelar,
  eliminar
};
