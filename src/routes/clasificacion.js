const express = require("express");
const mysql = require("../db");
const router = express.Router();
const jwt = require("jsonwebtoken");

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

const clavesecreta = "ZAKESTHtw1243rtewgds08523765432379";
// LEER TODA LA TABLA
router.get("/clasificacion", ensureToken, (req, res) => {
  jwt.verify(req.token, clavesecreta, (err, data) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const sql = `CALL PRC_CLASIFICACIONES('', '', '', '', '', 4, '')`;
      mysql.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
          res.json(results[0]);
        } else {
          res.send("No se pudieron Obtener los datos");
        }
      });
    }
  });
  console.log("Datos Leidos Correctamente");
});

//BUSCAR POR ID
router.get("/clasificacion/:cod", (req, res) => {
  const { cod } = req.params;
  const sql = `CALL PRC_CLASIFICACIONES('', '', '', '', '', 5, ${cod})`;
  mysql.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.send("No se pudieron Obtener los datos");
    }
  });
  console.log("Datos Leidos Correctamente");
});

// INSERTAR
router.post("/clasificacion/insertar", (req, res) => {
  const objclasificacion = {
    COD_CLASIFICACION: req.body.COD_CLASIFICACION,
    NATURALEZA: req.body.NATURALEZA,
  };
  const sql = `CALL PRC_CLASIFICACIONES(${objclasificacion.COD_CLASIFICACION}, '${objclasificacion.NATURALEZA}', 1, '?')`;
  mysql.query(sql, (error, results) => {
    if (error) throw error;
    res.send("Datos insertados");
  });
  console.log("Datos insertados Correctamente");
});

// ACTUALIZAR
router.put("/clasificacion/actualizar/:cod", (req, res) => {
  const { cod } = req.params;
  const objclasificacion = {
    COD_CLASIFICACION: req.body.COD_CLASIFICACION,
    NATURALEZA: req.body.NATURALEZA,
  };
  const sql = `CALL PRC_CLASIFICACIONES(${objclasificacion.COD_CLASIFICACION}, '${objclasificacion.NATURALEZA}', 2, ${cod})`;
  mysql.query(sql, (error, results) => {
    if (error) throw error;
    res.send("Datos Actualizados");
  });

  console.log("Datos Actualizados Correctamente");
});

// ELIMINAR
router.delete("/clasificacion/eliminar/:cod", (req, res) => {
  const { cod } = req.params;
  const sql = `CALL PRC_CLASIFICACIONES('', '', '', '', '', 3, ${cod})`;
  mysql.query(sql, (error, results) => {
    if (error) throw error;
    res.send("Datos Eliminados");
  });

  console.log("Datos Eliminados Correctamente");
});
module.exports = router;
