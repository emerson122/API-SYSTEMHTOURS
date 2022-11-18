const express = require('express');
const mysql = require('../db');
const router = express.Router();
const jwt = require('jsonwebtoken');
require("dotenv").config();
//Autor Jeyson Moran


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

router.get(["/sel_usr"],ensureToken, (req, res) => {
  try {
    jwt.verify(req.token,process.env.JWT, (err, data) => {
      if (err) {
        res.sendStatus(403);
        console.log(err);
      } else {
    const sql = `CALL PROC_MS_USR_SELECCIONAR()`;
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

router.post('/ins_usr',ensureToken,(req,res)=>{

  jwt.verify(req.token,process.env.JWT, (err, data) => {
    if (err) {
      res.sendStatus(403);
      console.log(err);
    } else {

  const objusr = {
      USR: req.body.USR,
      NOM_USR: req.body.NOM_USR,
      COD_ROL: req.body.COD_ROL,
      FEC_ULT_CONN: req.body.FEC_ULT_CONN,
      PREG_RES: req.body.PREG_RES,
      PRIMER_ACC: req.body.PRIMER_ACC,
      CORREO: req.body.CORREO,
      PREGUNTA: req.body.PREGUNTA,
      RESPUESTA: req.body.RESPUESTA,
      CONTRASEGNA: req.body.CONTRASEGNA
    }

  const sql = `CALL PROC_MS_USR_INSERTAR( '${objusr.USR}' ,
                                          '${objusr.NOM_USR}',
                                          ${objusr.COD_ROL},
                                          '${objusr.FEC_ULT_CONN}',
                                          ${objusr.PREG_RES},
                                          ${objusr.PRIMER_ACC},
                                          '${objusr.CORREO}',
                                          '${objusr.PREGUNTA}',
                                          '${objusr.RESPUESTA}',
                                          '${objusr.CONTRASEGNA}'
                                          )`;
  mysql.query(sql,(error,results)=>{
      if(error) throw error;
      res.send("Datos insertados")
  })
}
});
  console.log('Datos insertados Correctamente');
});


// ACTUALIZAR MODIFICAR CONTRASEÑA
///////////////////////////////////////////////////////////////////

router.put('/mod_contra_usr',ensureToken,(req,res)=>{

  jwt.verify(req.token,process.env.JWT, (err, data) => {
    if (err) {
      res.sendStatus(403);
      console.log(err);
    } else {

  const objusr = {
      CONTRASEGNA: req.body.CONTRASEGNA,
      COD: req.body.COD,
    }

  const sql = `CALL PROC_MS_USR_MODF_CONTRA('${objusr.CONTRASEGNA}' ,
                                             ${objusr.COD}
                                             )`;
  mysql.query(sql,(error,results)=>{
      if(error) throw error;
      res.send("Datos actualizados")
  })
  }
  });
  console.log('Datos actualizados correctamente');
});


// ELIMINAR

///////////////////////////////////////////////////////////////////

router.delete('/del_usr/:cod',ensureToken,(req,res)=>{

    jwt.verify(req.token,process.env.JWT, (err, data) => {
    if (err) {
      res.sendStatus(403);
      console.log(err);
    } else {


    const {cod} = req.params;
    const sql = `CALL PROC_MS_USR_ELIMINAR(${cod})`;
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

router.put('/upd_usr',ensureToken,(req,res)=>{
  try {
    jwt.verify(req.token,process.env.JWT, (err, data) => {
      if (err) {
        res.sendStatus(403);
        console.log(err);
      } else {


        const objusr = {
          USR: req.body.USR,
          NOM_USR: req.body.NOM_USR,
          EST_USR: req.body.EST_USR,
          COD_ROL: req.body.COD_ROL,
          FEC_ULT_CONN: req.body.FEC_ULT_CONN,
          PREG_RES: req.body.PREG_RES,
          PRIMER_ACC: req.body.PRIMER_ACC,
          CORREO: req.body.CORREO,
          PREGUNTA: req.body.PREGUNTA,
          RESPUESTA: req.body.RESPUESTA,
          FILA: req.body.FILA
        }
    
      const sql = `CALL PROC_MS_USR_ACTUALIZAR('${objusr.USR}' ,
                                              '${objusr.NOM_USR}',
                                              '${objusr.EST_USR}',
                                              ${objusr.COD_ROL},
                                              '${objusr.FEC_ULT_CONN}',
                                              ${objusr.PREG_RES},
                                              ${objusr.PRIMER_ACC},
                                              '${objusr.CORREO}',
                                              '${objusr.PREGUNTA}',
                                              '${objusr.RESPUESTA}',
                                              ${objusr.FILA}
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

// PREGUNTAS

// SELECCIONAR

///////////////////////////////////////////////////////////////////

router.get(["/sel_preg"],ensureToken, (req, res) => {
  try {
    jwt.verify(req.token,process.env.JWT, (err, data) => {
        if (err) {
        res.sendStatus(403);
        console.log(err);
        } else {
        const sql = `CALL PROC_MS_PREG_SELECCIONAR()`;
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

// SELECCIONAR USUARIO PREGUNTAS
router.post(["/sel_usr_preg"],ensureToken, (req, res) => {
  try {
    jwt.verify(req.token,process.env.JWT, (err, data) => {
        if (err) {
        res.sendStatus(403);
        console.log(err);
        } else {
        const obj = {USR: req.body.USR} 
        const sql = `CALL PROC_MS_PREG_SEL_USR('${obj.USR}')`;
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




