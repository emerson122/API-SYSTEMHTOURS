const express = require('express');
const mysql = require('../db');
const router = express.Router();
const jwt = require('jsonwebtoken');






// leer FUNCIONAL
router.get(["/cuentas"],(req, res)=>{
    const sql = `Call PRC_CUENTAS('?', '?', '?', 4,'');`
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
router.get('/cuentas/:cod',(req,res)=>{
    const {cod} = req.params;
    const sql = `CALL PRC_CUENTAS('?', '?', '?', 5, ${cod})`;
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
router.post('/cuentas/insertar',(req,res)=>{
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
    
    const {cod} = req.params;
    const objcuentas = { 
            CLASIFICACION: req.body.CLASIFICACION,
            NOMBRE: req.body.NOMBRE,
            NUM: req.body.NUM
        }

    const sql = `call PRC_CUENTAS(${objcuentas.CLASIFICACION}, '${objcuentas.NOMBRE}', '${objcuentas.NUM}', 2, ${cod})`;
    mysql.query(sql,(error,results)=>{
        if(error) throw error;
        res.send("Datos actualizados")
    })
    console.log('Datos insertados Correctamente');
});


// ELIMINAR 
router.delete("/cuentas/eliminar/:cod ",(req, res)=>{
    const {cod} = req.params;
    const sql = `Call PRC_CUENTAS('?', '?', '?', 3,'');`
    mysql.query(sql,(error,results)=>{
        if(error) throw error;
        if(results.length>0){
            res.json(results[0]);
        }else{
            res.send('No se pudo eliminar los datos')
        }
    });  
    console.log('Datos eliminados correctamente');
});
module.exports = router;