const db = require('../config/db');

const Pais = {
  getAll: callback => {
    db.query('SELECT * FROM pais', callback);
  },

  create: (data, callback) => {
    db.query(
      'INSERT INTO pais (nombre, capital, continente) VALUES (?, ?, ?)',
      [data.nombre, data.capital, data.continente],
      callback
    );
  },

  update: (id, data, callback) => {
    db.query(
      'UPDATE pais SET nombre = ?, capital = ?, continente = ? WHERE id_pais = ?',
      [data.nombre, data.capital, data.continente, id],
      callback
    );
  },

  delete: (id, callback) => {
    db.query('DELETE FROM pais WHERE id_pais = ?', [id], callback);
  }
};

module.exports = Pais;
