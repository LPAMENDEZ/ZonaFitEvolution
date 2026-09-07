const express = require('express');
const router = express.Router();
const membresiaController = require('../controllers/membresia.controller');
const validarBodyNoVacio = require('../middlewares/validation.middleware');

router.post('/', validarBodyNoVacio, membresiaController.crear);
router.get('/', membresiaController.listar);
router.get('/:id', membresiaController.obtenerPorId);
router.patch('/:id/cancelar', membresiaController.cancelar);
router.delete('/:id', membresiaController.eliminar);

module.exports = router;
