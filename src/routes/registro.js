const express = require('express');
const mysql = require('../db');
const router = express.Router();

// leer 
router.get(["/usuarios", "/Leer"],(req, res)=>{
    const sql = `Call PROC_USUARIOS('', '', '', 4, '');`
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


// insertar 
router.post('/usuarios/registrar',(req,res)=>{
    const objUsuarios ={

        usuario: req.body.user,
        name: req.body.nombre,
        passwd : req.body.pass,
    }
    const sql = `Call PROC_USUARIOS(${objUsuarios.usuario},${objUsuarios.name},${objUsuarios.passwd},1,'')`
    mysql.query(sql, error=>{
        if(error) throw error;
        res.send('Los datos se insertaron correctamente')
    })
    console.log('Datos insertados correctamente');
});

//Actualizar
router.put('/usuarios/actualizar/:cod',(req,res)=>{
    const {cod}= req.params;
    const objUsuarios ={
        usuario: req.body.user,
        name: req.body.nombre,
        passwd : req.body.pass,
    }
    const sql = `Call PROC_USUARIOS(${objUsuarios.usuario},${objUsuarios.name},${objUsuarios.passwd},2,${cod})`
    mysql.query(sql, error=>{
        if(error) throw error;
        res.send('Los datos se Actualizaron correctamente')
    })
    console.log('Datos Actualizaron correctamente');
});


router.delete('/usuario/borrar/:cod',(req,res)=>{
    const{cod}= req.params;
    const sql = `Call PROC_USUARIOS('', '', '', 3, ${cod});`
    mysql.query(sql, error=>{
        if(error) throw error;
        res.send('Los datos fueron borrados correctamente')
    })
    console.log('Datos borrados correctamente');
});

module.exports=router;