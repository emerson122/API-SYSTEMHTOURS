const express = require("express");
const mysql = require("../db");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

//Autor Emerson Ramos
//MIDDLEWARE
//middleware para asegurarse de que el token pertence a htours
function ensureToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  console.log(bearerHeader);
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearetoken = bearer[1];
    req.token = bearetoken;
    next();
  } else {
    res.sendStatus(403); //acceso prohibido
  }
}


// leer
router.get(["/usuarios", "/Leer"], (req, res) => {
  try {
    const sql = `CALL PROC_MS_USR_SELECCIONAR()`;
    mysql.query(sql, (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.send("No se pudo obtener resultados"); 
      }
    });
    console.log("Datos leidos correctamente");
  } catch (error) {
    res.send(error);
  }
});

// insertar
router.post("/usuarios/registrar", (req, res) => {
  try {
    const objUsuarios = {
      usuario: req.body.USER,
      name: req.body.NOMBRE_USUARIO,
      correo: req.body.CORREO_ELECTRONICO,
      passwd: req.body.PASS
    };
    const sql = `CALL PRC_MS_USR_REGISTRO("${objUsuarios.usuario}","${objUsuarios.name}", now(), 0, 1, "${objUsuarios.correo}", "${objUsuarios.passwd}")`;
    mysql.query(sql, (error,results) => {
      if (error) throw error;
      if(results.length > 0){
        res.json(results[0])
      }
      // res.send("Los datos se insertaron correctamente");
    });
    console.log("Datos insertados correctamente");
  } catch (error) {
    res.send(error);
  }
});

//Actualizar
router.put("/usuarios/actualizar/:cod", (req, res) => {
  try {
    const { cod } = req.params;
    const objUsuarios = {
      usuario: req.body.user,
      name: req.body.nombre,
      passwd: req.body.pass,
    };
    const sql = `Call PROC_USUARIOS(${objUsuarios.usuario},${objUsuarios.name},${objUsuarios.passwd},2,${cod})`;
    mysql.query(sql, (error) => {
      if (error) throw error;
      res.send("Los datos se Actualizaron correctamente");
    });
    console.log("Datos Actualizaron correctamente");
  } catch (error) {
    res.send(error);
  }
});

router.delete("/usuario/borrar/:cod", (req, res) => {
  try {
    const { cod } = req.params;
    const sql = `Call PROC_USUARIOS('', '', '', 3, ${cod});`;
    mysql.query(sql, (error) => {
      if (error) throw error;
      res.send("Los datos fueron borrados correctamente");
    });
    console.log("Datos borrados correctamente");
  } catch (error) {
    res.send(error);
  }
});

// metodo de recuperacion por correo
router.post("/recuperar", (req, res) => {
  try {
    const objtrecuperacion = {
      usuario: req.body.user,
    };
    const sql = `CALL SEL_USERANDEMAIL('${objtrecuperacion.usuario}')`;
    mysql.query(sql, (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.send("No se pudo obtener resultados");
      }
    });
    console.log("Datos leidos correctamente");
  } catch (error) {
    res.send(error);
  }
});

// metodo de recuperacion por pregunta
router.post("/preguntas", (req, res) => {
  try {
    const objpreguntas = {
      usuario: req.body.user,
      pregunta: req.body.preg,
      respuesta: req.body.resp,
    };
    const sql = `CALL PRC_USERPREG('${objpreguntas.usuario}','','','P')`;
    mysql.query(sql, (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.send("No se pudo obtener resultados");
      }
    });
    console.log("Datos leidos correctamente");
  } catch (error) {
    res.send(error);
  }
});
// metodo de recuperacion por respuesta
router.post("/respuesta", (req, res) => {
  try {
    const objpreguntas = {
      usuario: req.body.user,
      pregunta: req.body.preg,
      respuesta: req.body.resp,
    };
    const sql = `CALL PRC_USERPREG('${objpreguntas.usuario}','${objpreguntas.pregunta}','${objpreguntas.respuesta}','R')`;
    mysql.query(sql, (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.send("No se pudo obtener resultados");
      }
    });
    console.log("Datos leidos correctamente");
  } catch (error) {
    res.send(error);
  }
});

// metodo de recuperacion por respuesta
router.post("/pregunta/ignorada", (req, res) => {
  try {
    const objpreguntas = {
      usuario: req.body.user,
      pregunta: req.body.preg,
      respuesta: req.body.resp,
    };
    const sql = `CALL PRC_USERPREG('${objpreguntas.usuario}','${objpreguntas.pregunta}','${objpreguntas.respuesta}','I')`;
    mysql.query(sql, (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.send("No se pudo obtener resultados");
      }
    });
    console.log("Datos leidos correctamente");
  } catch (error) {
    res.send(error);
  }
});

//control
router.post("/conteo", (req, res) => {
  try {
    const objtrecuperacion = {
      usuario: req.body.user,
    };
    const sql = `Call SEL_CONTROL()`;
    mysql.query(sql, (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.send("No se pudo obtener resultados");
      }
    });
    console.log("Datos leidos correctamente");
  } catch (error) {
    res.send(error);
  }
});

//saber el estado de un Usuario
router.post("/estadousr", (req, res) => {
  try {
    const objuser = {
      usuario: req.body.user,
    };
    const sql = `CALL PRC_OPTIONS('${objuser.usuario}');`;
    mysql.query(sql, (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.send("No se pudo obtener resultados");
      }
    });
    console.log("Estado de usuario leidos correctamente");
  } catch (error) {
    res.send(error);
  }
});

//metodo de registro de preguntas
router.post("/preguntas/insertar", ensureToken,(req, res) => {
  try {
    jwt.verify(req.token, process.env.JWT, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
    const objpreguntas = {
      usuario: req.body.user,
      pregunta: req.body.preg,
      respuesta: req.body.resp,
      pass: req.body.pass,
    };
    const sql = `CALL PRC_PREGUNTAS('${objpreguntas.pregunta}', '${objpreguntas.respuesta}', '${objpreguntas.usuario}', '${objpreguntas.pass}' )`;
    mysql.query(sql, (error) => {
      if (error) throw error;
      
        res.send('datos insertados');
      
    });
    console.log("Datos insertados correctamente");
  }
});
  } catch (error) {
    res.send(error);
  }
});

//actualizar el estado de la persona a Activo
router.post("/estusr/actualizar", (req, res) => {
  try {
    const objpreguntas = {
      USUARIO: req.body.USER
    };
    const sql = `CALL UPD_ESTADOUSR('${objpreguntas.USUARIO}', '1' )`;
    mysql.query(sql, (error) => {
      if (error) throw error;
      
        res.sendStatus(200);
      
    });
    console.log("Datos insertados correctamente");
  } catch (error) {
    res.send(error);
  }
});


//actualizar el estado de la persona a bloqueado
router.post("/estusr/bloquear", (req, res) => {
  try {
    const objpreguntas = {
      USUARIO: req.body.USER
    };
    const sql = `CALL UPD_ESTADOUSR('${objpreguntas.USUARIO}', '2' )`;
    mysql.query(sql, (error) => {
      if (error) throw error;
      
      res.sendStatus(200);
      
    });
    console.log("Datos insertados correctamente");
  } catch (error) {
    res.send(error);
  }
});

//actualizar el estado de la persona a inactivo
router.post("/estusr/inactivar", (req, res) => {
  try {
    const objpreguntas = {
      USUARIO: req.body.USER
    };
    const sql = `CALL UPD_ESTADOUSR('${objpreguntas.USUARIO}', '3' )`;
    mysql.query(sql, (error) => {
      if (error) throw error;
      
        res.sendStatus(200);
      
    });
    console.log("Datos insertados correctamente");
  } catch (error) {
    res.send(error);
  }
});


//ACTUALIZAR CONTRASEÑA PRIMER ACCESO
router.post("/estusr/pass", (req, res) => {
  try {
    const objpreguntas = {
      USUARIO: req.body.USER,
      PASS: req.body.PASS
    };
    const sql = `CALL UPD_PASS('${objpreguntas.USUARIO}', '${objpreguntas.PASS}' )`;
    mysql.query(sql, (error,results) => {
      if (error) throw error;

      if (results.length>0) {
        res.json(results[0])
      }else{

        res.sendStatus(200);
      }
      
    });
    console.log("Datos insertados correctamente");
  } catch (error) {
    res.send(error);
  }
});
module.exports = router;
