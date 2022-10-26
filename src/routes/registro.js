const express = require("express");
const mysql = require("../db");
const router = express.Router();

// leer
router.get(["/usuarios", "/Leer"], (req, res) => {
  try {
    const sql = `Call PROC_USUARIOS('', '', '', 4, '');`;
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
      usuario: req.body.user,
      name: req.body.nombre,
      passwd: req.body.pass,
    };
    const sql = `Call PROC_USUARIOS(${objUsuarios.usuario},${objUsuarios.name},${objUsuarios.passwd},1,'')`;
    mysql.query(sql, (error) => {
      if (error) throw error;
      res.send("Los datos se insertaron correctamente");
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
    const sql = `CALL PRC_USERPREG('${objpreguntas.usuario}','${objpreguntas.pregunta}','${objpreguntas.respuesta}','P')`;
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

module.exports = router;
