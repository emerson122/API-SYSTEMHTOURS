const express = require("express");
const mysql = require("../db");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { route } = require("./cuentas");
require("dotenv").config();
// Autor:Emerson Ramos

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
router.get(["/grupos"], ensureToken,(req, res)=>{
    try {
        jwt.verify(req.token, process.env.JWT, (err, data) => {
          if (err) {
            res.sendStatus(403);
          } else {
    const sql = `CALL PRC_GRUPOS('', '', '', 4, '')`
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
router.post(["/grupos/unidades"], ensureToken,(req, res)=>{
    try {
        jwt.verify(req.token, process.env.JWT, (err, data) => {
          if (err) {
            res.sendStatus(403);
          } else {
            const objgrupo = {
              NATURALEZA: req.body.NATURALEZA
            }
    const sql = `CALL SEL_GRUPOS_UNIDAD('${objgrupo.NATURALEZA}')`;
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

// INSERTAR 
router.post("/grupos/insertar", ensureToken, (req, res) => {
  try {
    jwt.verify(req.token, process.env.JWT, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const objgrupo = {
          PV_CLASIFICACION: req.body.PV_CLASIFICACION,
          PV_NUM_GRUPO: req.body.PV_NUM_GRUPO,
          PV_NOM_GRUPO: req.body.PV_NOM_GRUPO,
        };
        const sql = `CALL PRC_GRUPOS('${objgrupo.PV_CLASIFICACION}', '${objgrupo.PV_NUM_GRUPO}', '${objgrupo.PV_NOM_GRUPO}', 1, '')`;
        mysql.query(sql, (error, results) => {
          if (error) throw error;
          if (results.length>0) {
            res.send(results[0])
          }else{
            res.send('Datos insertados')
          }
    
        });
        console.log("Datos insertados Correctamente");
      }
    });
  } catch (error) {
    res.send(error);
  }
});


//actualizar
router.put("/grupos/actualizar/:cod", ensureToken, (req, res) => {
    try {
      jwt.verify(req.token, process.env.JWT, (err, data) => {
        if (err) {
          res.sendStatus(403);
        } else {
          const objgrupo = {
            PV_CLASIFICACION: req.body.PV_CLASIFICACION,
            PV_NUM_GRUPO: req.body.PV_NUM_GRUPO,
            PV_NOM_GRUPO: req.body.PV_NOM_GRUPO,
          };
          const {cod} = req.params ;
          const sql = `CALL PRC_GRUPOS('${objgrupo.PV_CLASIFICACION}', '${objgrupo.PV_NUM_GRUPO}', '${objgrupo.PV_NOM_GRUPO}', 2, ${cod})`;
          mysql.query(sql, (error, results) => {
            if (error) throw error;
  
            res.send("Datos actualizados");
          });
          console.log("Datos actualizados Correctamente");
        }
      });
    } catch (error) {
      res.send(error);
    }
  });
  
  router.delete(["/grupos/eliminar/:cod"], ensureToken, (req, res) => {
    try {
      jwt.verify(req.token, process.env.JWT, (err, data) => {
        if (err) {
          res.sendStatus(403);
        } else {
          const { cod } = req.params;
          const sql = `CALL PRC_GRUPOS('', '', '', 3, ${cod})`;
          mysql.query(sql, (error, results) => {
            if (error) throw error;
            if(results.length >0){
            res.json(results[0])
            }else{

              res.send("Datos Eliminados");
            }
          });
        }
      });
      console.log("Datos eliminados correctamente");
    } catch (error) {
      res.send(error);
    }
  });


module.exports = router;
