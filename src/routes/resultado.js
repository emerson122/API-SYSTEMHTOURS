const express = require('express');
const mysql = require('../db');
const router=express.Router();
const jwt = require('jsonwebtoken');
require("dotenv").config();
//Autor Zoila Margarita Licona

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
 router.post('/resultado',ensureToken,(req,res)=>{
    try {
    
         jwt.verify(req.token,process.env.JWT,(err,data)=>{
             if(err){
                 res.sendStatus(403);
             }else{  
const objresultado={
    COD_PERIODO:req.body.PERIODO
}
    
    const sql = `call PRC_ESTADOS_RESULTADOS(${objresultado.COD_PERIODO})`;
    mysql.query(sql,(error,results)=>{
        if(error) throw error;
    if (results.length>0) {
        res.json(results[0])
    } else {
       res.send('no se pudieron obtener los datos') 
    }
    })
    console.log('Datos insertados Correctamente');
 
    
}
})

} catch (error) {
        res.send(error)
}
});

 module.exports=router;