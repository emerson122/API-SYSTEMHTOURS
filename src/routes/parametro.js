const express = require('express');
const mysql = require('../db');
const router = express.Router();
const jwt = require('jsonwebtoken');
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
router.get('/parametros',ensureToken,(req,res)=>{
    try {
        jwt.verify(req.token, process.env.JWT, (err, data) => {
          if (err) {
            res.sendStatus(403);
          } else {
            const sql = `CALL PRC_MS_PARAMETROS('', '', '', '', 4, '')`;
            mysql.query(sql,(error,results)=>{
                if(error) throw error;
                if (results.length>0) {
                    res.json(results[0]);
                }else{
                    res.send('No se pudieron Obtener los datos')
                }
            });
            console.log('Datos Leidos Correctamente');
        }
    })
} catch (error) {
    res.send(error);
  }
});


//BUSCAR POR ID
router.get("/parametros/:cod", ensureToken,(req, res) => {
  try {
    jwt.verify(req.token, process.env.JWT, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const { cod } = req.params;
        const sql = `CALL PRC_MS_PARAMETROS('', '', '','', 5, ${cod})`;
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

//BUSCAR UN SOLO PARAMETRO
router.post('/parametros/buscar',ensureToken,(req,res)=>{
    try {
            jwt.verify(req.token, process.env.JWT, (err, data) => {
              if (err) {
                res.sendStatus(403);
              } else {
   
    const objparametros = { 
        PARAMETRO: req.body.PARAMETRO,
    }
    const sql = `CALL PRC_MS_PARAMETROS( '${objparametros.PARAMETRO}','' , '', '', 6, '?')`;
    mysql.query(sql,(error,results)=>{
        if(error) throw error;
        if (results.length > 0) {
            res.json(results[0])
        }else{
            res.send("No se obtuvieron datos")
        }
    })
    console.log('Datos insertados Correctamente');
}
});
} catch (error) {
    res.send(error)    
}
});

// INSERTAR 
router.post('/parametros/insertar',ensureToken,(req,res)=>{
    try {
        
            jwt.verify(req.token, process.env.JWT, (err, data) => {
              if (err) {
                res.sendStatus(403);
              } else {
   
    const objparametros = {
        
        PARAMETRO: req.body.PARAMETRO,
        VALOR: req.body.VALOR,
        COD_USR: req.body.COD_USR,
        FEC_MODIFICACION: req.body.FEC_MODIFICACION
    }
    const sql = `CALL PRC_MS_PARAMETROS( '${objparametros.PARAMETRO}','${objparametros.VALOR}' , ${objparametros.COD_USR}, now(), 1, '?')`;
    mysql.query(sql,(error,results)=>{
        if(error) throw error;
        res.send("Datos insertados")
    })
    console.log('Datos insertados Correctamente');
}
});
} catch (error) {
    res.send(error)    
}
});


// ACTUALIZAR
router.put('/parametros/actualizar/:cod',ensureToken,(req,res)=>{
    try {
       
        jwt.verify(req.token, process.env.JWT, (err, data) => {
          if (err) {
            res.sendStatus(403);
          } else {
            const { cod } = req.params;
            const objparametros = {
              PARAMETRO: req.body.PARAMETRO,
              VALOR: req.body.VALOR,
              COD_USR: req.body.COD_USR,
              FEC_CREACION: req.body.FEC_CREACION,
            };
            const sql = `CALL PRC_MS_PARAMETROS( '${objparametros.PARAMETRO}','${objparametros.VALOR}' , ${objparametros.COD_USR}, '${objparametros.FEC_CREACION}', 2, ${cod})`;
            mysql.query(sql, (error, results) => {
              if (error) throw error;
              res.send("Datos Actualizados");
            });
            console.log('Datos Actualizados Correctamente');
}
});
} catch (error) {
    res.send(error)    
}

});

// ELIMINAR 
router.delete("/parametros/eliminar/:cod", ensureToken,(req, res) => {
  try {
    jwt.verify(req.token, process.env.JWT, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const { cod } = req.params;
        const sql = `CALL PRC_MS_PARAMETROS('', '', '', '', 3, ${cod})`;
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