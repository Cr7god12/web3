
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // Cambia esto si tu usuario es diferente
    password: '',  // Cambia esto si tienes una contraseña
    database: 'crudejemplo'  // Asegúrate de crear esta base de datos
});

// Conectar a la base de datos
connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión a la base de datos MySQL establecida.');
});

module.exports = connection;
