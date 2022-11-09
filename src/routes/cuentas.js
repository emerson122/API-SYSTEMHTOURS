const express = require('express');
const mysql = require('../db');
const router = express.Router();
const jwt = require('jsonwebtoken');
require("dotenv").config();


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


// leer FUNCIONAL
router.get(["/cuentas"], ensureToken,(req, res)=>{
    try {
        jwt.verify(req.token, process.env.JWT, (err, data) => {
          if (err) {
            res.sendStatus(403);
          } else {
    const sql = `Call PRC_CUENTAS('?', '?', '?', 4,'');`
    mysql.query(sql,(error,results)=>{
        if(error) throw error;
        if(results.length>0){
            res.json(results[0]);
        }else{
            res.send('No se pudo obtener resultados')
        }
    });  
}
});
    console.log('Datos leidos correctamente');

} catch (error) {
    res.send(error);
  }
});


//BUSCAR POR ID
router.get("/cuentas/:cod",ensureToken, (req, res) => {
  try {
    jwt.verify(req.token, process.env.JWT, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const { cod } = req.params;
        const sql = `CALL PRC_CUENTAS('?', '?', '?', 5, ${cod})`;
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
  } catch (error) {
    res.send(error);
  }
});

// INSERTAR 
router.post("/cuentas/insertar", ensureToken,(req, res) => {
  try {
    jwt.verify(req.token, process.env.JWT, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const objcuentas = {
          CLASIFICACION: req.body.CLASIFICACION,
          NOM_CUENTA: req.body.NOMBRE,
          CUENTAS: req.body.CORRELATIVO,
          CORRELATIVO: req.body.GRUPO,
        };

        const sql = `CALL INS_CUENTAS('${objcuentas.CLASIFICACION}','${objcuentas.NOM_CUENTA}', ${objcuentas.CUENTAS},  ${objcuentas.CORRELATIVO})`;
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


// ACTUALIZAR

router.put("/cuentas/actualizar/:cod", ensureToken, (req, res) => {
  try {
    jwt.verify(req.token, process.env.JWT, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const { cod } = req.params;
        const objcuentas = {
          CLASIFICACION: req.body.CLASIFICACION,
          NOMBRE: req.body.NOMBRE,
          NUM: req.body.NUM,
        };

        const sql = `call PRC_CUENTAS(${objcuentas.CLASIFICACION}, '${objcuentas.NOMBRE}', '${objcuentas.NUM}', 2, ${cod})`;
        mysql.query(sql, (error, results) => {
          if (error) throw error;
          res.send("Datos actualizados");
        });
        console.log("Datos insertados Correctamente");
      }
    });
  } catch (error) {
    res.send(error);
  }
});


// ELIMINAR 
router.delete("/cuentas/eliminar/:cod", ensureToken, (req, res) => {
  try {
    jwt.verify(req.token, process.env.JWT, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const { cod } = req.params;
        const sql = `Call PRC_CUENTAS('?', '?', '?', 3,${cod});`;
        mysql.query(sql, (error) => {
          if (error) throw error;
          res.send("Datos eliminados");
        });
        console.log("Datos eliminados correctamente");
      }
    });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;