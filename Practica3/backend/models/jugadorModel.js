// backend/models/jugadorModel.js
const db = require('../config/db');

// Obtener todos los jugadores
const getAllJugadores = (callback) => {
    db.query('SELECT * FROM jugadores', (err, results) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, results);
    });
};

// Crear un nuevo jugador
const createJugador = (jugador, callback) => {
    const { nombre, edad, equipo } = jugador;
    db.query('INSERT INTO jugadores (nombre, edad, equipo) VALUES (?, ?, ?)', [nombre, edad, equipo], (err, results) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, results);
    });
};

// Obtener un jugador por ID
const getJugadorById = (id, callback) => {
    db.query('SELECT * FROM jugadores WHERE id = ?', [id], (err, results) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, results[0]);
    });
};

// Actualizar un jugador
const updateJugador = (id, jugador, callback) => {
    const { nombre, edad, equipo } = jugador;
    db.query('UPDATE jugadores SET nombre = ?, edad = ?, equipo = ? WHERE id = ?', [nombre, edad, equipo, id], (err, results) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, results);
    });
};

// Eliminar un jugador
const deleteJugador = (id, callback) => {
    db.query('DELETE FROM jugadores WHERE id = ?', [id], (err, results) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, results);
    });
};

module.exports = {
    getAllJugadores,
    createJugador,
    getJugadorById,
    updateJugador,
    deleteJugador
};
