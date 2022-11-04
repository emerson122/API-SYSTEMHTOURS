const express = require('express');
const mysql = require('../db');
const router = express.Router();
const jwt = require('jsonwebtoken');



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
 const clavesecreta= 'ZAKESTHtw1243rtewgds08523765432379';
// LEER TODA LA TABLA
router.get('/parametro',ensureToken,(req,res)=>{
    jwt.verify(req.token,clavesecreta,(err,data)=>{
        if(err){
            res.sendStatus(403);
        }else{
            const sql = `CALL PRC_PARAMETROS('', '', '', '', '', 4, '')`;
            mysql.query(sql,(error,results)=>{
                if(error) throw error;
                if (results.length>0) {
                    res.json(results[0]);
                }else{
                    res.send('No se pudieron Obtener los datos')
                }
            });
        }
    })
    console.log('Datos Leidos Correctamente');
});


//BUSCAR POR ID
router.get('/parametro/:cod',(req,res)=>{
    const {cod} = req.params;
    const sql = `CALL PRC_PARAMETROS('', '', '', '', '', 5, ${cod})`;
    mysql.query(sql,(error,results)=>{
        if(error) throw error;
        if (results.length>0) {
            res.json(results[0]);
        }else{
            res.send('No se pudieron Obtener los datos')
        }
    })
    console.log('Datos Leidos Correctamente');
});

// INSERTAR 
router.post('/parametro/insertar',(req,res)=>{
    const objparametros = {
        COD_PARAMETRO: req.body.COD_PARAMETRO,
        PARAMETRO: req.body.PARAMETRO,
        VALOR: req.body.VALOR,
        COD_USR: req.body.COD_USR,
        FEC_CREACION: req.body.FEC_CREACION,
        FEC_MODIFICACION: req.body.FEC_MODIFICACION
    }
    const sql = `CALL PRC_PARAMETROS(${objparametros.COD_PARAMETRO}, ${objparametros.PARAMETRO},${objparametro.VALOR} , ${objparametro.COD_USR}, ${objparametro.FEC_CREACION}, ${objparametro.FEC_MODIFICACION}, 1, '?')`;
    mysql.query(sql,(error,results)=>{
        if(error) throw error;
        res.send("Datos insertados")
    })
    console.log('Datos insertados Correctamente');
});


// ACTUALIZAR
router.put('/parametro/actualizar/:cod',(req,res)=>{
    const {cod} = req.params;
    const objparametros = {
        COD_PARAMETRO: req.body.COD_PARAMETRO,
        PARAMETRO: req.body.PARAMETRO,
        VALOR: req.body.VALOR,
        COD_USR: req.body.COD_USR,
        FEC_CREACION: req.body.FEC_CREACION,
        FEC_MODIFICACION: req.body.FEC_MODIFICACION
    }
    const sql = `CALL PRC_PARAMETROS(${objparametros.COD_PARAMETRO}, ${objparametros.PARAMETRO},${objparametro.VALOR} , ${objparametro.COD_USR}, ${objparametro.FEC_CREACION}, ${objparametro.FEC_MODIFICACION}, 2, ${cod})`;
    mysql.query(sql,(error,results)=>{
        if(error) throw error;
        res.send("Datos Actualizados")
        
    })
   
    console.log('Datos Actualizados Correctamente');
});

// ELIMINAR 
router.delete('/parametro/eliminar/:cod',(req,res)=>{
    const {cod} = req.params;
    const sql = `CALL PRC_PARAMETROS('', '', '', '', '', 3, ${cod})`;
    mysql.query(sql,(error,results)=>{
        if(error) throw error;
        res.send("Datos Eliminados")
        
    })
   
    console.log('Datos Eliminados Correctamente');
});
module.exports = router;