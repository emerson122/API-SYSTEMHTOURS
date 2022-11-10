const express = require('express');
const mysql = require('../db');
const router = express.Router();
const jwt = require('jsonwebtoken');
require("dotenv").config();

//MIDDLEWARE
//middleware para asegurarse de que el token pertence a htours
function ensureToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  console.log(bearerHeader);
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearetoken = bearer[1];
    req.token = bearetoken;
    next();
  } else {
    res.sendStatus(403); //acceso prohibido
  }
}


// SELECCIONAR

///////////////////////////////////////////////////////////////////

router.get(["/sel_rol"],ensureToken, (req, res) => {
  try {
    jwt.verify(req.token,process.env.JWT, (err, data) => {
      if (err) {
        res.sendStatus(403);
        console.log(err);
      } else {  
    const sql = `CALL PRC_MS_SEL_ROLES()`;
    mysql.query(sql, (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.send("No se pudo obtener resultados"); 
      }
      
    });
  }
});
    console.log("Datos leidos correctamente");
  } catch (error) {
    res.send(error);
  }
});

// INSERTAR

///////////////////////////////////////////////////////////////////

router.post('/ins_permiso',ensureToken,(req,res)=>{

  jwt.verify(req.token,process.env.JWT, (err, data) => {
    if (err) {
      res.sendStatus(403);
      console.log(err);
    } else {

  const objusr = {
      PB_COD_ROL: req.body.PB_COD_ROL,
      PB_COD_OBJETO: req.body.PB_COD_OBJETO,
      PV_PER_INSERCION: req.body.PV_PER_INSERCION,
      PV_PER_ELIMINAR: req.body.PV_PER_ELIMINAR,
      PV_PER_ACTUALIZAR: req.body.PV_PER_ACTUALIZAR,
      PV_PER_CONSULTAR: req.body.PV_PER_CONSULTAR
    }

  const sql = `CALL PRC_INSERT_PERMISOS( '${objusr.PB_COD_ROL}' ,
                                          '${objusr.PB_COD_OBJETO}',
                                          '${objusr.PV_PER_INSERCION}',
                                          '${objusr.PV_PER_ELIMINAR}',
                                          '${objusr.PV_PER_ACTUALIZAR}',
                                          '${objusr.PV_PER_CONSULTAR}',
                                          )`;
  mysql.query(sql,(error,results)=>{
      if(error) throw error;
      res.send("Datos insertados")
  })
}
});
  console.log('Datos insertados Correctamente');
});



// ELIMINAR

///////////////////////////////////////////////////////////////////

router.delete('/del_permiso/:cod',ensureToken,(req,res)=>{

    jwt.verify(req.token,process.env.JWT, (err, data) => {
    if (err) {
      res.sendStatus(403);
      console.log(err);
    } else {


    const {cod} = req.params;
    const sql = `CALL PRC_DEL_PERMISOS(${cod})`;
    mysql.query(sql,(error,results)=>{
      if(error) throw error;
      res.send("Datos Eliminados")
      
  })
  }
  });
  console.log('Datos Eliminados Correctamente');
});

// ACTUALIZAR USR

///////////////////////////////////////////////////////////////////

router.put('/upd_permiso/:cod',ensureToken,(req,res)=>{
  try {
    jwt.verify(req.token,process.env.JWT, (err, data) => {
      if (err) {
        res.sendStatus(403);
        console.log(err);
      } else {

        const { cod } = req.params;
        const objusr = {
            PB_COD_ROL: req.body.PB_COD_ROL,
            PB_COD_OBJETO: req.body.PB_COD_OBJETO,
            PV_PER_INSERCION: req.body.PV_PER_INSERCION,
            PV_PER_ELIMINAR: req.body.PV_PER_ELIMINAR,
            PV_PER_ACTUALIZAR: req.body.PV_PER_ACTUALIZAR,
            PV_PER_CONSULTAR: req.body.PV_PER_CONSULTAR
          }
      
        const sql = `CALL PRC_UPD_PERMISOS( '${cod}' ,
                                                '${objusr.PB_COD_OBJETO}',
                                                '${objusr.PV_PER_INSERCION}',
                                                '${objusr.PV_PER_ELIMINAR}',
                                                '${objusr.PV_PER_ACTUALIZAR}',
                                                '${objusr.PV_PER_CONSULTAR}',
                                                )`;

       mysql.query(sql, (error, results) => {
          if (error) throw error;
          res.send("Datos actualizados");
        });
      }
    });
    console.log("Datos actualizados Correctamente"); //confirmacion en Consola posteriormente se debe eliminar en produccion
  } catch (error) {
    res.send(error);
  }

});


module.exports = router;