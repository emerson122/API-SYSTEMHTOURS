const express = require('express');
const mysql = require('../db');
const router=express.Router();
const jwt = require('jsonwebtoken');
require("dotenv").config();

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

 // LEER TODA LA TABLA
// router.get('/periodo',ensureToken,(req,res)=>{
//     try {  
//     jwt.verify(req.token,process.env.JWT,(err,data)=>{
//         if(err){
//             res.sendStatus(403);
//         }else{
//             const sql = `CALL PRC_PERIODOS('', '', '', '', '', 4, '')`;
//             mysql.query(sql,(error,results)=>{
//                 if(error) throw error;
//                 if (results.length>0) {
//                     res.json(results[0]);
//                 }else{
//                     res.send('No se pudieron Obtener los datos')
//                 }
//             });
//         }
//     })
//     console.log('Datos Leidos Correctamente');
// } catch (error) {
//     res.send(error);  
// }
// });


//BUSCAR POR ID
// router.get('/periodo/:cod',ensureToken,(req,res)=>{
//     try {
//         jwt.verify(req.token,process.env.JWT,(err,data)=>{
//             if(err){
//                 res.sendStatus(403);
//             }else{   
    
//     const {cod} = req.params;
//     const sql = `CALL PRC_PERIODOS('', '', '', '', '', 5, ${cod})`;
//     mysql.query(sql,(error,results)=>{
//         if(error) throw error;
//         if (results.length>0) {
//             res.json(results[0]);
//         }else{
//             res.send('No se pudieron Obtener los datos')
//         }
//     })
//     console.log('Datos Leidos Correctamente');


// }
// })

// } catch (error) {
//         res.send(error)
// }
// });

// INSERTAR 
router.post('/balance/insertar',(req,res)=>{
    try {
        
        jwt.verify(req.token,process.env.JWT,(err,data)=>{
            if(err){
                res.sendStatus(403);
            }else{  

    const objbalance = {
        COD_PERIODO: req.body.COD_PERIODO
        
    }
    const sql = `call PRC_BAL_GENERAL(${objbalance.COD_PERIODO}, 1)`;
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

router.get('/balance',(req,res)=>{
    try {
        
         jwt.verify(req.token,process.env.JWT,(err,data)=>{
             if(err){
                 res.sendStatus(403);
             }else{  

    
    const sql = `call PRC_BAL_GENERAL('', 2)`;
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

// // ACTUALIZAR
// router.put('/periodo/actualizar/:cod',ensureToken,(req,res)=>{
//     try {
        
//         jwt.verify(req.token,process.env.JWT,(err,data)=>{
//             if(err){
//                 res.sendStatus(403);
//             }else{  

//     const {cod} = req.params;
//     const objperiodos = {
//         COD_USUARIO: req.body.COD_USUARIO,
//         NOM_PERIODO: req.body.NOM_PERIODO,
//         FEC_INI: req.body.FEC_INI,
//         FEC_FIN: req.body.FEC_FIN,
//         ESTADO: req.body.ESTADO
//     }
//     const sql = `CALL PRC_PERIODOS(${objperiodos.COD_USUARIO}, '${objperiodos.NOM_PERIODO}','${objperiodos.FEC_INI} ', '${objperiodos.FEC_FIN}', '${objperiodos.ESTADO}', 2, ${cod})`;
//     mysql.query(sql,(error,results)=>{
//         if(error) throw error;
//         res.send("Datos Actualizados")
        
//     })
   
//     console.log('Datos Actualizados Correctamente');

// }
// })
// } catch (error) {
//     res.send(error)
// }
// });

// // ELIMINAR 
// router.delete('/periodo/eliminar/:cod',ensureToken,(req,res)=>{
//     try {
        
//         jwt.verify(req.token,process.env.JWT,(err,data)=>{
//             if(err){
//                 res.sendStatus(403);
//             }else{  

//     const {cod} = req.params;
//     const sql = `CALL PRC_PERIODOS('', '', '', '', '', 3, ${cod})`;
//     mysql.query(sql,(error,results)=>{
//         if(error) throw error;
//         res.send("Datos Eliminados")
        
//     })
   
//     console.log('Datos Eliminados Correctamente');
// }
// })
// } catch (error) {
//     res.send(error)
// }
// });
module.exports = router;