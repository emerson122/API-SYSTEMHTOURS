const express = require('express');
const mysql = require('../db');
const router = express.Router();

// Leer 
router.get('/periodo',(req,res)=>{
    const sql = `CALL PRC_PERIODOS('', '', '', '', '', 4, '')`;
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

// Leer solo un dato
router.get(["/periodo/:cod"],(req, res)=>{
    const {cod}= req.params;
    const sql=`CALL PRC_PERIODOS('', '', '', '', '', 5, ${cod})`;
    mysql.query(sql,(error,results)=>{
        if(error) throw error;
        if(results.length>0){
            res.json(results[0]); //SE LE AGREGA UN 0
        }else{
            res.send('No se pudo obtener resultados')
        }
    });
    console.log('Datos leidos correctamente con el id');
});





//insertar datos 
router.post('/periodo/insertar',(req,res)=>{
    const objperiodo ={
        COD_USUARIO : req.body.COD_USUARIO,
        FEC_PERIODO: req.body.FEC_PERIODO,
        NOM_PERIODO: req.body.NOM_PERIODO,
        FEC_INI: req.body.FEC_INI,
        FEC_FIN: req.body.FEC_FIN ,
        ESTADO: req.body.ESTADO,
        OPERACION: req.body.OPERACION,
        FILA: req.body.FILA
    }
    const sql = `CALL PRC_PERIODOS(${objperiodo.COD_USUARIO}, ${objperiodo.NOM_PERIODO}, ${objperiodo.FEC_INI}, ${objperiodo.FEC_FIN}, ${objperiodo.ESTADO}, 1, '');`
    mysql.query(sql, error=>{
        if(error) throw error;
        res.send('Los datos se insertaron correctamente')
    })
    console.log('Datos insertados correctamente');
});

//Actualizar datos 
router.put('/periodo/actualizar/:cod',(req,res)=>{
    const {cod} = req.params;
    const objperiodo ={
        COD_USUARIO : req.body.COD_USUARIO,
        FEC_PERIODO: req.body.FEC_PERIODO,
        NOM_PERIODO: req.body.NOM_PERIODO,
        FEC_INI: req.body.FEC_INI,
        FEC_FIN: req.body.FEC_FIN ,
        ESTADO: req.body.ESTADO,
        OPERACION: req.body.OPERACION,
        FILA: req.body.FILA
    }
    const sql = `CALL PRC_PERIODOS(${objperiodo.COD_USUARIO}, ${objperiodo.NOM_PERIODO}, ${objperiodo.FEC_INI}, ${objperiodo.FEC_FIN}, ${objperiodo.ESTADO}, 2, ${cod});`
    mysql.query(sql, error=>{
        if(error) throw error;
        res.send('Los datos se actualizaron correctamente')
    })
    console.log('Datos actualizaron correctamente');
});
module.exports = router;