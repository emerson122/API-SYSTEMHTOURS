const express = require('express');
const mysql = require('../db');
const router=express.Router();
const jwt = require('jsonwebtoken');
require("dotenv").config();
// Autor:Zoila Margarita Licona 
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
// INSERTAR 
router.post("/balance/insertar", ensureToken,(req, res) => {
  try {
    jwt.verify(req.token, process.env.JWT, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const objbalance = {
          COD_PERIODO: req.body.COD_PERIODO,
        };
        const sql = `call PRC_BAL_GENERAL(${objbalance.COD_PERIODO}, 1)`;
        mysql.query(sql, (error, results) => {
          if (error) throw error;
          if (results.length > 0) {
            res.json(results[0]);
          } else {
            res.send("no se pudieron obtener los datos");
          }
        });
        console.log("Datos insertados Correctamente");
      }
    });
  } catch (error) {
    res.send(error);
  }
});





router.get('/balance',ensureToken,(req,res)=>{
    try {
        
         jwt.verify(req.token,process.env.JWT,(err,data)=>{
             if(err){
                 res.sendStatus(403);
             }else{  

    
    const sql = `call PRC_BAL_GENERAL('', 2)`;
    mysql.query(sql,(error,results)=>{
        if(error) throw error;
    if (results.length>0) {
        res.json(results[0])
    } else {
       res.send('no se pudieron obtener los datos') 
    }
    })
    console.log('Datos insertados Correctamente');
 
    
}
})

} catch (error) {
        res.send(error)
}
});



/**
 * Search Data
 */
 router.post("/balance/activos_c", ensureToken,(req, res) => {
  try {
    jwt.verify(req.token, process.env.JWT, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const objbalance = {
          COD_PERIODO: req.body.COD_PERIODO,
        };
        const sql = `call SEL_DATA_BAL(${objbalance.COD_PERIODO}, '1')`;
        mysql.query(sql, (error, results) => {
          if (error) throw error;
          if (results.length > 0) {
            res.json(results[0]);
          } else {
            res.send("no se pudieron obtener los datos");
          }
        });
        console.log("Datos insertados Correctamente");
      }
    });
  } catch (error) {
    res.send(error);
  }
});
/**
 * activos no corrientes
 */
 router.post("/balance/activos_n", ensureToken,(req, res) => {
  try {
    jwt.verify(req.token, process.env.JWT, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const objbalance = {
          COD_PERIODO: req.body.COD_PERIODO,
        };
        const sql = `call SEL_DATA_BAL(${objbalance.COD_PERIODO}, '2')`;
        mysql.query(sql, (error, results) => {
          if (error) throw error;
          if (results.length > 0) {
            res.json(results[0]);
          } else {
            res.send("no se pudieron obtener los datos");
          }
        });
        console.log("Datos insertados Correctamente");
      }
    });
  } catch (error) {
    res.send(error);
  }
});

/**
 * pasivos  corrientes
 */
router.post("/balance/pasivos_c", ensureToken,(req, res) => {
 try {
   jwt.verify(req.token, process.env.JWT, (err, data) => {
     if (err) {
       res.sendStatus(403);
     } else {
       const objbalance = {
         COD_PERIODO: req.body.COD_PERIODO,
       };
       const sql = `call SEL_DATA_BAL(${objbalance.COD_PERIODO}, '3')`;
       mysql.query(sql, (error, results) => {
         if (error) throw error;
         if (results.length > 0) {
           res.json(results[0]);
         } else {
           res.send("no se pudieron obtener los datos");
         }
       });
       console.log("Datos insertados Correctamente");
     }
   });
 } catch (error) {
   res.send(error);
 }
});
/**
 * pasivos no  corrientes
 */

router.post("/balance/pasivos_n", ensureToken,(req, res) => {
 try {
   jwt.verify(req.token, process.env.JWT, (err, data) => {
     if (err) {
       res.sendStatus(403);
     } else {
       const objbalance = {
         COD_PERIODO: req.body.COD_PERIODO,
       };
       const sql = `call SEL_DATA_BAL(${objbalance.COD_PERIODO}, '4')`;
       mysql.query(sql, (error, results) => {
         if (error) throw error;
         if (results.length > 0) {
           res.json(results[0]);
         } else {
           res.send("no se pudieron obtener los datos");
         }
       });
       console.log("Datos insertados Correctamente");
     }
   });
 } catch (error) {
   res.send(error);
 }
});

/**
 * Patrimonio
 */
router.post("/balance/patrimonio", ensureToken,(req, res) => {
  try {
    jwt.verify(req.token, process.env.JWT, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const objbalance = {
          COD_PERIODO: req.body.COD_PERIODO,
        };
        const sql = `call SEL_DATA_BAL(${objbalance.COD_PERIODO}, '5')`;
        mysql.query(sql, (error, results) => {
          if (error) throw error;
          if (results.length > 0) {
            res.json(results[0]);
          } else {
            res.send("no se pudieron obtener los datos");
          }
        });
        console.log("Datos insertados Correctamente");
      }
    });
  } catch (error) {
    res.send(error);
  }
 });

module.exports = router;