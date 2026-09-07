const express = require('express');
const routes = require('./routes/index');
const manejadorErrores = require('./middlewares/error.middleware');

const app = express();

app.use(express.json()); // para leer JSON en el body
app.use('/api', routes);

app.use(manejadorErrores); // siempre al final

module.exports = app;
