const express = require("express");
const mysql = require("../db");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
// Autor:Noe Roberto Garcia 

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

//LEER TODA LA BITACORA
router.get(["/bitacora"], ensureToken, (req, res) => {
  try {
    jwt.verify(req.token, process.env.JWT, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const sql = `call PRC_BITACORA('','','','',2)`;
        mysql.query(sql, (error, results) => {
          if (error) throw error;
          if (results.length > 0) {
            res.json(results[0]);
          } else {
            res.send("No se pudo obtener resultados");
          }
        });
      }
    });
    console.log("Datos leidos correctamente");
  } catch (error) {
    res.send(error);
  }
});

//INSERTAR EN LA BITACORA
router.post("/bitacora/insertar", ensureToken, (req, res) => {
  try {
    jwt.verify(req.token, process.env.JWT, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const objbitacora = {
          USR: req.body.USR,
          ACCION: req.body.ACCION,
          DES: req.body.DES,
          OBJETO: req.body.OBJETO,
        };
        const sql = `call PRC_BITACORA('${objbitacora.USR}','${objbitacora.ACCION}','${objbitacora.DES}','${objbitacora.OBJETO}',1)`;
        mysql.query(sql, (error, results) => {
          if (error) throw error;

          res.send("Datos insertados");
        });
        console.log("Datos insertados Correctamente");
      }
    });
  } catch (error) {
    res.send(error);
  }
});

//LEER SOLO LOS DATOS DE UN USUARIO
router.post("/bitacora/user", ensureToken, (req, res) => {
  try {
    jwt.verify(req.token, process.env.JWT, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const objbitacora = {
          USR: req.body.USR,
        };
        const sql = `CALL PRC_BITACORA('${objbitacora.USR}','','','',3)`;
        mysql.query(sql, (error, results) => {
          if (error) throw error;
          if (results.length > 0) {
            res.json(results[0]);
          } else {
            res.send("Ocurrio un Error");
          }
        });
        console.log("Datos insertados Correctamente");
      }
    });
  } catch (error) {
    res.send(error);
  }
});

// SELECCIONAR TODO BITACORA
router.get(["/sel_bitacora"], ensureToken, (req, res) => {
  try {
    jwt.verify(req.token, process.env.JWT, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const sql = `CALL PROC_MS_BITACORA_SELECCIONAR()`;
        mysql.query(sql, (error, results) => {
          if (error) throw error;
          if (results.length > 0) {
            res.json(results[0]);
          } else {
            res.send("No se pudo obtener resultados");
          }
        });
      }
    });
    console.log("Datos leidos correctamente");
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
