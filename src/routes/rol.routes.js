const express = require('express');
const router = express.Router();
const rolController = require('../controllers/rol.controller');
const validarBodyNoVacio = require('../middlewares/validation.middleware');

router.post('/', validarBodyNoVacio, rolController.crear);
router.get('/', rolController.listar);
router.get('/:id', rolController.obtenerPorId);
router.delete('/:id', rolController.eliminar);

module.exports = router;
