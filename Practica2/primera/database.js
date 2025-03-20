const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: '', 
  database: 'base_jugadores' 
});

connection.connect(err => { 
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
  }
  console.log('Conexión exitosa a la base de datos');
});

module.exports = connection;
