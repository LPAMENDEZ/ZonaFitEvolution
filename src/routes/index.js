const express = require('express');
const router = express.Router();
const usuarioRoutes = require('./usuario.routes');
const rolRoutes = require('./rol.routes');
const membresiaRoutes = require('./membresia.routes');

router.use('/usuarios', usuarioRoutes);
router.use('/roles', rolRoutes);
router.use('/membresias', membresiaRoutes);

module.exports = router;
