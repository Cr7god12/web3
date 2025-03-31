// backend/app.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const jugadorRoutes = require('./routes/jugadorRoutes');

// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para procesar datos de formularios (POST)
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.use('/', jugadorRoutes);

// Iniciar el servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
