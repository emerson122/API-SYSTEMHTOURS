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
router.get('/periodo',ensureToken,(req,res)=>{
    jwt.verify(req.token,clavesecreta,(err,data)=>{
        if(err){
            res.sendStatus(403);
        }else{
            const sql = `CALL PRC_PERIODOS('', '', '', '', '', 4, '')`;
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
router.get('/periodo/:cod',(req,res)=>{
    const {cod} = req.params;
    const sql = `CALL PRC_PERIODOS('', '', '', '', '', 5, ${cod})`;
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
router.post('/periodo/insertar',(req,res)=>{
    const objperiodos = {
        COD_USUARIO: req.body.COD_USUARIO,
        NOM_PERIODO: req.body.NOM_PERIODO,
        FEC_INI: req.body.FEC_INI,
        FEC_FIN: req.body.FEC_FIN,
        ESTADO: req.body.ESTADO
    }
    const sql = `CALL PRC_PERIODOS(${objperiodos.COD_USUARIO}, ${objperiodos.NOM_PERIODO},${objperiodos.FEC_INI} , ${objperiodos.FEC_FIN}, ${objperiodos.ESTADO}, 1, '?')`;
    mysql.query(sql,(error,results)=>{
        if(error) throw error;
        res.send("Datos insertados")
    })
    console.log('Datos insertados Correctamente');
});


// ACTUALIZAR
router.put('/periodo/actualizar/:cod',(req,res)=>{
    const {cod} = req.params;
    const objperiodos = {
        COD_USUARIO: req.body.COD_USUARIO,
        NOM_PERIODO: req.body.NOM_PERIODO,
        FEC_INI: req.body.FEC_INI,
        FEC_FIN: req.body.FEC_FIN,
        ESTADO: req.body.ESTADO
    }
    const sql = `CALL PRC_PERIODOS(${objperiodos.COD_USUARIO}, ${objperiodos.NOM_PERIODO},${objperiodos.FEC_INI} , ${objperiodos.FEC_FIN}, ${objperiodos.ESTADO}, 2, ${cod})`;
    mysql.query(sql,(error,results)=>{
        if(error) throw error;
        res.send("Datos Actualizados")
        
    })
   
    console.log('Datos Actualizados Correctamente');
});

// ELIMINAR 
router.delete('/periodo/eliminar/:cod',(req,res)=>{
    const {cod} = req.params;
    const sql = `CALL PRC_PERIODOS('', '', '', '', '', 3, ${cod})`;
    mysql.query(sql,(error,results)=>{
        if(error) throw error;
        res.send("Datos Eliminados")
        
    })
   
    console.log('Datos Eliminados Correctamente');
});
module.exports = router;