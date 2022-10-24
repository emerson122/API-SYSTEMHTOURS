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
router.get('/objeto',ensureToken,(req,res)=>{
    jwt.verify(req.token,clavesecreta,(err,data)=>{
        if(err){
            res.sendStatus(403);
        }else{
            const sql = `CALL PRC_OBJETOS('', '', '', '', '', 4, '')`;
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
router.get('/objeto/:cod',(req,res)=>{
    const {cod} = req.params;
    const sql = `CALL PRC_OBJETOS('', '', '', '', '', 5, ${cod})`;
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
router.post('/objeto/insertar',(req,res)=>{
    const objobjetos = {
        COD_OBJETO: req.body.COD_OBJETO,
        OBJETO: req.body.OBJETO,
        DES_OBJETO: req.body.DES_OBJETO,
        TIP_OBJETO: req.body.TIP_OBJETO
        
    }
    const sql = `CALL PRC_OBJETOS(${objobjetos.COD_OBJETO}, ${objobjetos.OBJETO},${objobjetos.DES_OBJETO} , ${objobjetos.TIP_OBJETO},  1, '?')`;
    mysql.query(sql,(error,results)=>{
        if(error) throw error;
        res.send("Datos insertados")
    })
    console.log('Datos insertados Correctamente');
});


// ACTUALIZAR
router.put('/objeto/actualizar/:cod',(req,res)=>{
    const {cod} = req.params;
    const objobjetos = {
        COD_OBJETO: req.body.COD_OBJETO,
        OBJETO: req.body.OBJETO,
        DES_OBJETO: req.body.DES_OBJETO,
        TIP_OBJETO: req.body.TIP_OBJETO
    }
    const sql = `CALL PRC_OBJETOS(${objobjetos.COD_OBJETO}, ${objobjetos.OBJETO},${objobjetos.DES_OBJETO} , ${objobjetos.TIP_OBJETO}, 2, ${cod})`;
    mysql.query(sql,(error,results)=>{
        if(error) throw error;
        res.send("Datos Actualizados")
        
    })
   
    console.log('Datos Actualizados Correctamente');
});

// ELIMINAR 
router.delete('/objeto/eliminar/:cod',(req,res)=>{
    const {cod} = req.params;
    const sql = `CALL PRC_OBJETOS('', '', '', '', '', 3, ${cod})`;
    mysql.query(sql,(error,results)=>{
        if(error) throw error;
        res.send("Datos Eliminados")
        
    })
   
    console.log('Datos Eliminados Correctamente');
});
module.exports = router;