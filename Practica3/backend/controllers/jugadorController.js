// backend/controllers/jugadorController.js
const db = require('../config/db');  // Conexión a la base de datos

// Mostrar todos los jugadores
exports.getAllJugadores = (req, res) => {
    const query = 'SELECT * FROM jugadores';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al obtener los jugadores');
        }
        res.render('index', { jugadores: results });
    });
};

// Mostrar el formulario de creación
exports.showCreateForm = (req, res) => {
    res.render('create');  // Renderiza la vista para crear un nuevo jugador
};

// Crear un jugador
exports.createJugador = (req, res) => {
    const { nombre, edad, equipo } = req.body;

    // Validación básica de los campos
    if (!nombre || !edad || !equipo) {
        return res.status(400).send('Todos los campos son requeridos');
    }

    // Consulta SQL para insertar un nuevo jugador
    const query = 'INSERT INTO jugadores (nombre, edad, equipo) VALUES (?, ?, ?)';
    db.query(query, [nombre, edad, equipo], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al agregar el jugador');
        }
        // Redirige a la lista de jugadores después de insertar
        res.redirect('/');
    });
};

// Mostrar el formulario de edición para un jugador
exports.showEditForm = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM jugadores WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al obtener el jugador');
        }
        if (results.length === 0) {
            return res.status(404).send('Jugador no encontrado');
        }
        res.render('edit', { jugador: results[0] });
    });
};

// Actualizar los datos de un jugador
exports.updateJugador = (req, res) => {
    const { id } = req.params;
    const { nombre, edad, equipo } = req.body;

    if (!nombre || !edad || !equipo) {
        return res.status(400).send('Todos los campos son requeridos');
    }

    const query = 'UPDATE jugadores SET nombre = ?, edad = ?, equipo = ? WHERE id = ?';
    db.query(query, [nombre, edad, equipo, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al actualizar el jugador');
        }
        res.redirect('/');
    });
};

// Eliminar un jugador
exports.deleteJugador = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM jugadores WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al eliminar el jugador');
        }
        res.redirect('/');
    });
};
