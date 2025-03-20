const mysql = require('mysql2/promise');

async function main() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'base_jugadores'
    });
    
    console.log('Connected to MySQL Database!');
    return connection;

  } catch (err) {
    console.error('Error:', err);
  }
}

module.exports = { main };//para usar en el index xd