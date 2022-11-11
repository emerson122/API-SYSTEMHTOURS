const express = require('express');
const mysql = require('../db');
const router = express.Router();
const jwt = require('jsonwebtoken');

//Autor Scarleth Canales 

//MIDDLEWARE
//middleware para asegurarse de que el token pertence a htours
function ensureToken(req,res,next) {
    const bearerHeader = req.headers['authorization']; 
    console.log(bearerHeader);
    if(typeof bearerHeader !== 'undefined'){
     const bearer = bearerHeader.split(' ');
     const bearetoken = bearer[1];
     req.token = bearetoken;
     next();
  }else{
      res.sendStatus(403); //acceso prohibido
  }
 }
// LEER TODA LA TABLA
router.get("/objetos", ensureToken, (req, res) => {
  try {
    jwt.verify(req.token, process.env.JWT, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const sql = `CALL PRC_OBJETOS('', '', '',  4, '')`;
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


//BUSCAR POR ID
router.get("/objetos/:cod", ensureToken, (req, res) => {
  try {
    jwt.verify(req.token, process.env.JWT, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const { cod } = req.params;
        const sql = `CALL PRC_OBJETOS('', '', '', 5, ${cod})`;
        mysql.query(sql, (error, results) => {
          if (error) throw error;
          if (results.length > 0) {
            res.json(results[0]);
          } else {
            res.send("No se pudieron Obtener los datos");
          }
        });
        console.log("Datos Leidos Correctamente");
      }
    });
  } catch (error) {
    res.send(error);
  }
});

// INSERTAR 
router.post("/objetos/insertar", ensureToken, (req, res) => {
  try {
    jwt.verify(req.token, process.env.JWT, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const objobjetos = {
          OBJETO: req.body.OBJETO,
          DES_OBJETO: req.body.DES_OBJETO,
          TIP_OBJETO: req.body.TIP_OBJETO,
        };
        const sql = `CALL PRC_OBJETOS( '${objobjetos.OBJETO}','${objobjetos.DES_OBJETO}' , '${objobjetos.TIP_OBJETO}',  1, '?')`;
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
router.put("/objetos/actualizar/:cod", ensureToken, (req, res) => {
  try {
    jwt.verify(req.token, process.env.JWT, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const { cod } = req.params;
        const objobjetos = {
          COD_OBJETO: req.body.COD_OBJETO,
          OBJETO: req.body.OBJETO,
          DES_OBJETO: req.body.DES_OBJETO,
          TIP_OBJETO: req.body.TIP_OBJETO,
        };
        const sql = `CALL PRC_OBJETOS('${objobjetos.OBJETO}','${objobjetos.DES_OBJETO}' , '${objobjetos.TIP_OBJETO}', 2, ${cod})`;
        mysql.query(sql, (error, results) => {
          if (error) throw error;
          res.send("Datos Actualizados");
        });

        console.log("Datos Actualizados Correctamente");
      }
    });
  } catch (error) {
    res.send(error);
  }
});

// ELIMINAR 
router.delete("/objetoS/eliminar/:cod", ensureToken, (req, res) => {
  try {
    jwt.verify(req.token, process.env.JWT, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const { cod } = req.params;
        const sql = `CALL PRC_OBJETOS('', '', '',  3, ${cod})`;
        mysql.query(sql, (error, results) => {
          if (error) throw error;
          res.send("Datos Eliminados");
        });

        console.log("Datos Eliminados Correctamente");
      }
    });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;