const express = require('express');
const mysql = require('../db');
const router = express.Router();
const jwt = require('jsonwebtoken');






// leer FUNCIONAL
router.get(["/subcuentas"],(req, res)=>{
    const sql = `Call PRC_SUBCUENTAS('?','?', '?', '?', 4,'');` 
    mysql.query(sql,(error,results)=>{
        if(error) throw error;
        if(results.length>0){
            res.json(results[0]);
        }else{
            res.send('No se pudo obtener resultados')
        }
    });  
    console.log('Datos leidos correctamente');
});
//BUSCAR POR ID
router.get('/subcuentas/:cod',(req,res)=>{
    const {cod} = req.params;
    const sql = `CALL PRC_SUBCUENTAS('?', '?', '?', 5, ${cod})`;
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
router.post('/subcuentas/insertar',(req,res)=>{
    const objcuentas ={
        CLASIFICACION: req.body.CLASIFICACION,
        NOM_CUENTA: req.body.NOMBRE,
        CUENTAS: req.body.CORRELATIVO,
        CORRELATIVO: req.body.GRUPO
        }

    const sql = `CALL INS_CUENTAS('${objcuentas.CLASIFICACION}','${objcuentas.NOM_CUENTA}', ${objcuentas.CUENTAS},  ${objcuentas.CORRELATIVO})`;
    mysql.query(sql,(error,results)=>{
        if(error) throw error;
        res.send("Datos insertados")
    })
    console.log('Datos insertados Correctamente');
});


// ACTUALIZAR

router.put('/cuentas/actualizar/:cod',(req,res)=>{
    const objcuentas ={
        CLASIFICACION: req.body.CLASIFICACION,
        NOM_CUENTA: req.body.NOMBRE,
        CUENTAS: req.body.CORRELATIVO,
        CORRELATIVO: req.body.GRUPO
        }

    const sql = `CALL PRC_CUENTAS('${objcuentas.CLASIFICACION}','${objcuentas.NOM_CUENTA}', ${objcuentas.CUENTAS},  ${objcuentas.CORRELATIVO})`;
    mysql.query(sql,(error,results)=>{
        if(error) throw error;
        res.send("Datos insertados")
    })
    console.log('Datos insertados Correctamente');
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