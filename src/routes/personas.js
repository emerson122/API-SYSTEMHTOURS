const express = require("express");
const mysql = require("../db");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

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

// LEER TODA LA TABLA
router.get("/", (req, res) => {
  try {
    const sql = `Call PRC_PERSONAS('', '', '', '', '', '', '', '', 4, '')`;
    mysql.query(sql, (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.send("No se pudieron Obtener los datos");
      }
    });
    console.log("Datos Leidos Correctamente"); //confirmacion en Consola posteriormente se debe eliminar en produccion
  } catch (error) {
    res.send(error);
  }
});

router.get("/:cod", (req, res) => {
  try {
    const { cod } = req.params;
    const sql = `Call PRC_PERSONAS('', '', '', '', '', '', '', '', 5, ${cod});`;
    mysql.query(sql, (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.send("No se pudieron Obtener los datos");
      }
    });
    console.log("Datos Leidos Correctamente"); //confirmacion en Consola posteriormente se debe eliminar en produccion
  } catch (error) {
    res.send(error);
  }
});
// buscar personas por usuario 
router.post("/usuarios", (req, res) => {
  try {
    const objuserper={
      USUARIO: req.body.USER
    }
    const sql = `Call PRC_PERSONAS('${objuserper.USUARIO}', '', '', '', '', '', '', '', 6, '');`;
    mysql.query(sql, (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.send("No se pudieron Obtener los datos");
      }
    });
    console.log("Datos Leidos Correctamente"); //confirmacion en Consola posteriormente se debe eliminar en produccion
  } catch (error) {
    res.send(error);
  }
});

// INSERTAR
router.post("/insertar", ensureToken, (req, res) => {
  try {
    jwt.verify(req.token, process.env.JWT, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const objpersonas = {
          USUARIO: req.body.USUARIO,
          SEX_PERSONA: req.body.SEX_PERSONA,
          EDA_PERSONAL: req.body.EDA_PERSONAL,
          TIP_PERSONA: req.body.TIP_PERSONA,
          Num_Identidad: req.body.Num_Identidad,
          IND_CIVIL: req.body.IND_CIVIL,
          TELEFONO: req.body.TELEFONO,
          TIP_TELEFONO: req.body.TIP_TELEFONO,
        };
        const sql = `CALL PRC_PERSONAS('${objpersonas.USUARIO}','${objpersonas.SEX_PERSONA}',${objpersonas.EDA_PERSONAL} , '${objpersonas.TIP_PERSONA}', '${objpersonas.Num_Identidad}','${objpersonas.IND_CIVIL}',${objpersonas.TELEFONO},'${objpersonas.TIP_TELEFONO}',1, '?')`;
        mysql.query(sql, (error, results) => {
          if (error) throw error;
          res.send("Datos insertados");
        });
      }
    });
    console.log("Datos insertados Correctamente"); //confirmacion en Consola posteriormente se debe eliminar en produccion
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
