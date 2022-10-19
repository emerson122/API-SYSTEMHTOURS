const express = require('express');
const mysql = require('../db');
const router = express.Router();


// LEER TODA LA TABLA
router.get('/',(req,res)=>{
    const sql = `call PRC_PERSONAS('', '', '', '', '', '', '', '', '', 4, '');`;
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


router.get('/:cod',(req,res)=>{
    const {cod} = req.params;
    const sql = `call PRC_PERSONAS('', '', '', '', '', '', '', '', '', 5, ${cod});`;
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
router.post('/insertar',(req,res)=>{
    const objpersonas = {
        NOM_PERSONA: req.body.NOM_PERSONA,
        SEX_PERSONA: req.body.SEX_PERSONA,
        EDA_PERSONAL: req.body.EDA_PERSONAL,
        TIP_PERSONA: req.body.TIP_PERSONA,
        Num_Identidad: req.body.Num_Identidad,
        IND_CIVIL: req.body.IND_CIVIL,
        IND_PERSONA: req.body.IND_PERSONA,
        TELEFONO: req.body.TELEFONO,
        TIP_TELEFONO: req.body.TIP_TELEFONO

    }
    const sql = `CALL PRC_PERSONAS('${objpersonas.NOM_PERSONA}', '${objpersonas.SEX_PERSONA}',${objpersonas.EDA_PERSONAL} , '${objpersonas.TIP_PERSONA}', '${objpersonas.Num_Identidad}','${objpersonas.IND_CIVIL}','${objpersonas.IND_PERSONA}',${objpersonas.TELEFONO},'${objpersonas.TIP_TELEFONO}',1, '?')`;
    mysql.query(sql,(error,results)=>{
        if(error) throw error;
        res.send("Datos insertados")
    })
    console.log('Datos insertados Correctamente');
});


module.exports = router;