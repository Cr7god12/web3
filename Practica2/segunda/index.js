
const {main} = require('./database');
const mysql = require('mysql2/promise');  

async function mostrar() {
    try {
        connection = await main(); 

        if (!connection) {
            throw new Error('No se pudo establecer conexión con la base de datos.')
        }
        const [row1] = await connection.execute('SELECT * FROM jugadores');
        console.table(row1);

    } catch (error) {
        console.log('Error en la consulta: ', error);
    } finally {
        if(connection){
            connection.end();
        }
    }
}


async function insertar() {
    try {
        connection = await main(); 

        if (!connection) {
            throw new Error('No se pudo establecer conexión con la base de datos.')
        }
      
            const nombre = 'Roberto';
            const pais = 'Carlos';
            const cuidad = 'poo';
            const presidente = 'xd';
            const [insertResult] = await connection.execute(
              'INSERT INTO nom_estadio(nom_estadio, pais, cuidad,presidente) VALUES (?, ?,?,?)',
              [nombre, pais, cuidad, presidente]
            );
            console.log('Nuevo usuario insertado con ID:', insertResult.insertId);
        

    } catch (error) {
        console.log('Error en la consulta: ', error);
    } finally {
        if(connection){
            connection.end();
        }
    }
}



async function ejecutar() {
    console.time('Tiempo de ejecucion');
    await mostrar();
    await insertar();   
    console.timeEnd('Tiempo de ejecucion')
}
ejecutar();