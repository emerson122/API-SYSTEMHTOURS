const express = require('express');
const mysql = require('../db');
const router = express.Router();

// leer 
router.get(["/librodiario"],(req, res)=>{
    const sql = `Call PRC_LIBDIARIO('?','?','?', '?', '?', 5, '');`
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
router.get('/librodiario/:cod',(req,res)=>{
    const {cod} = req.params;
    const sql = `CALL PRC_LIBDIARIO('?', '?', '?', '?', '?', 6, ${cod})`
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





// insertar 
router.post('/librodiario/insertar',(req,res)=>{
    const objlibrodiario ={

        COD_PERIODO: req.body.COD_PERIODO,
        NUM_SUBCUENTA: req.body.NUM_SUBCUENTA,
        NOM_CUENTA: req.body.NOM_CUENTA,
        NOM_SUBCUENTA : req.body.NOM_SUBCUENTA,
        SAL_DEBE: req.body.SAL_DEBE,
        SAL_HABER: req.body.SAL_HABER,
        OPERACION: req.body.OPERACION,
        FILA: req.body.FILA
    }
    const sql = `CALL PRC_LIBDIARIO(${objlibrodiario.COD_PERIODO},${objlibrodiario.NUM_SUBCUENTA},${objlibrodiario.NOM_CUENTA},${objlibrodiario.NOM_SUBCUENTA},${objlibrodiario.SAL_DEBE},${objlibrodiario.SAL_HABER},1,'?')`
    mysql.query(sql, error=>{
        if(error) throw error;
        res.send('Los datos se insertaron correctamente')
    })
    console.log('Datos insertados correctamente');
});







module.exports = router;
