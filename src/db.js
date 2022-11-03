const mysql = require('mysql');
require('dotenv').config();


const conexion = mysql.createConnection({
    host: process.env.SERVER,
    port:process.env.PORT,
    user: process.env.USER,
    password: process.env.PASS ,
    database: process.env.DB,
    multipleStatements: true,
});

// Para verificar si la conexión es exitosa para Falló mientras se ejecuta el proyecto en la consola.
conexion.connect((err) => {
    if (!err) {
      console.log("Conexión Exitosa A la base de datos");
    } else {
      console.log(
        "Conexión fallida en la base de datos  \n Error :" + JSON.stringify(err, undefined, 2)
      );
    }
  });
  
  module.exports = conexion;
  