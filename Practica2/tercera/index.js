
const { pool } = require('./database.js'); 


async function consultarEstadio() {
  try {
   
    pool.query('SELECT * FROM nom_estadio', (err, results, fields) => {
      if (err) {
        console.error('Error al realizar la consulta:', err);
        return;
      }
    

      console.table(results);
    });
  } catch (error) {
    console.error('Error en la consulta:', error);
  }
}



async function Ejecutar(){
  console.time('tiempo de ejecucion');
  await consultarEstadio();

  console.timeEnd('tiempo de ejecucion');
}

Ejecutar();




