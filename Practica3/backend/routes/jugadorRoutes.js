// backend/routes/jugadorRoutes.js
const express = require('express');
const router = express.Router();
const jugadorController = require('../controllers/jugadorController');

// Ruta para mostrar todos los jugadores
router.get('/', jugadorController.getAllJugadores);

// Ruta para mostrar el formulario de creación
router.get('/create', jugadorController.showCreateForm);

// Ruta para crear un jugador (POST)
router.post('/create', jugadorController.createJugador);

// Ruta para mostrar el formulario de edición
router.get('/edit/:id', jugadorController.showEditForm);

// Ruta para actualizar un jugador
router.post('/edit/:id', jugadorController.updateJugador);

// Ruta para eliminar un jugador
router.get('/delete/:id', jugadorController.deleteJugador);

module.exports = router;
