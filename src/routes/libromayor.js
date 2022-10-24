const express = require('express');
const mysql = require('../db');
const router = express.Router();

// leer FUNCIONAL
router.get(["/libromayor"],(req, res)=>{
    const sql = `Call PRC_LIBROS_MAYORES('?','?','?', '?', 4, '');`
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

//BUSCAR POR ID FUNCIONAL
router.get('/libromayor/:cod',(req,res)=>{
    const {cod} = req.params;
    const sql = `CALL PRC_LIBROS_MAYORES('?', '?', '?', '?', 5, ${cod})`
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




// INSERTAR  FUNCIONAL
router.post('/libromayor/insertar',(req,res)=>{
    const objlibromayor = {
      
        COD_PERIODO: req.body.COD_PERIODO,
        NOM_CUENTA: req.body.NOM_CUENTA,
        SAL_DEBE: req.body.SAL_DEBE,
        SAL_HABER: req.body.SAL_HABER,
        
 
    }
    const sql = `CALL PRC_LIBROS_MAYORES(${objlibromayor.COD_PERIODO} ,'${objlibromayor.NOM_CUENTA}',${objlibromayor.SAL_DEBE},${objlibromayor.SAL_HABER}, 6, '?')`;
    mysql.query(sql,(error,results)=>{
        if(error) throw error;
        res.send("Datos insertados")
    })
    console.log('Datos insertados Correctamente');
});


// ACTUALIZAR FUNCIONAL
router.put('/libromayor/actualizar/:cod',(req,res)=>{
    const {cod} = req.params;
    const objlibromayor ={


        COD_PERIODO: req.body.COD_PERIODO,
        NOM_CUENTA: req.body.NOM_CUENTA,
        SAL_DEBE: req.body.SAL_DEBE,
        SAL_HABER: req.body.SAL_HABER,
 
    }
    const sql = `CALL PRC_LIBROS_MAYORES(${objlibromayor.COD_PERIODO} ,'${objlibromayor.NOM_CUENTA}',${objlibromayor.SAL_DEBE},${objlibromayor.SAL_HABER},2,${cod})`
    mysql.query(sql,(error,results)=>{
        if(error) throw error;
        res.send("Datos Actualizados")
        
    })
   
    console.log('Datos Actualizados Correctamente');
});


// ELIMINAR FUNCIONAL 
router.delete('/libromayor/eliminar/:cod',(req,res)=>{
    const {cod} = req.params;
    const sql = `CALL PRC_LIBROS_MAYORES('?', '?', '?', '?', 3, ${cod})`
    mysql.query(sql,(error,results)=>{
        if(error) throw error;
        res.send("Datos Eliminados")
        
    })
   
    console.log('Datos Eliminados Correctamente');
});



module.exports = router;