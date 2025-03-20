const connection = require('./database.js');
console.time('tiempo de ejecucion');
connection.query('SELECT * FROM nom_estadio', (err, results) => {
  if (err) {
    console.error('Error en la consulta:', err);
    return;
  }
  console.table( results);
  connection.query(
    'INSERT INTO nom_estadio(nom_estadio,pais,cuidad ,presidente) VALUES (?,?,?,?)',
    ['lunapark', 'alemania', 'munich', 'Kloop'],
    (err, result) => {
      if (err) {
        console.error('Error en la inserción:', err);
        return;
      }
      console.log('Nueva persona añadida con ID:', result.insertId);
    }
  );

});

console.timeEnd('tiempo de ejecucion');

