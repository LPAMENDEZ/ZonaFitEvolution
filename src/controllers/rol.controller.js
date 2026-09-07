const rolService = require('../services/rol.service');

async function crear(req, res, next) {
  try {
    const rol = await rolService.crearRol(req.body.nombre);
    res.status(201).json(rol);
  } catch (error) {
    next(error);
  }
}

async function listar(req, res, next) {
  try {
    const roles = await rolService.listarRoles();
    res.status(200).json(roles);
  } catch (error) {
    next(error);
  }
}

async function obtenerPorId(req, res, next) {
  try {
    const rol = await rolService.obtenerRol(req.params.id);
    res.status(200).json(rol);
  } catch (error) {
    next(error);
  }
}

async function eliminar(req, res, next) {
  try {
    const resultado = await rolService.eliminarRol(req.params.id);
    res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  crear,
  listar,
  obtenerPorId,
  eliminar
};
