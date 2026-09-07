const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');
const validarBodyNoVacio = require('../middlewares/validation.middleware');

router.post('/', validarBodyNoVacio, usuarioController.registrar);
router.get('/', usuarioController.listar);
router.get('/:id', usuarioController.obtenerPorId);
router.put('/:id', validarBodyNoVacio, usuarioController.actualizar);
router.delete('/:id', usuarioController.eliminar);

module.exports = router;
