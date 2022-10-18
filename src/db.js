const mysql = require('mysql');

const conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "systemhtours",
    multipleStatements: true,
});

// Para verificar si la conexión es exitosa para Falló mientras se ejecuta el proyecto en la consola.
conexion.connect((err) => {
    if (!err) {
      console.log("Conexión Exitosa A la base de datos");
    } else {
      console.log(
        "Conexión fallida en la base de datos twot \n Error :" + JSON.stringify(err, undefined, 2)
      );
    }
  });
  
  module.exports = conexion;
  