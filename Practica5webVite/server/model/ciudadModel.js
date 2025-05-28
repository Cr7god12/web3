const db = require('../config/db');

const Ciudad = {
  getAll: callback => {
    db.query(
      `SELECT ciudad.*, pais.nombre AS nombre_pais
       FROM ciudad
       LEFT JOIN pais ON ciudad.id_pais = pais.id_pais`,
      callback
    );
  },

  create: (data, callback) => {
    db.query(
      'INSERT INTO ciudad (nombre, poblacion, region, id_pais) VALUES (?, ?, ?, ?)',
      [data.nombre, data.poblacion, data.region, data.id_pais],
      callback
    );
  },

  update: (id, data, callback) => {
    db.query(
      'UPDATE ciudad SET nombre = ?, poblacion = ?, region = ?, id_pais = ? WHERE id_ciudad = ?',
      [data.nombre, data.poblacion, data.region, data.id_pais, id],
      callback
    );
  },

  delete: (id, callback) => {
    db.query('DELETE FROM ciudad WHERE id_ciudad = ?', [id], callback);
  }
};

module.exports = Ciudad;
