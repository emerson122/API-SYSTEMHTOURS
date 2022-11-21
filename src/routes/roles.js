const express = require('express');
const mysql = require('../db');
const router = express.Router();
const jwt = require('jsonwebtoken');
require("dotenv").config();
//Autor Noe Garcia

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

// SELECCIONAR POR ID

///////////////////////////////////////////////////////////////////

router.get(["/sel_rol/:cod"],ensureToken, (req, res) => {
  try {
    jwt.verify(req.token,process.env.JWT, (err, data) => {
      if (err) {
        res.sendStatus(403);
        console.log(err);
      } else {  
    const {cod} = req.params;
    const sql = `CALL PRC_MS_SEL_COD_ROLES(${cod})`;
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


// SELECCIONAR POR NOMBRE

///////////////////////////////////////////////////////////////////

router.post(["/sel_rol/buscar"],ensureToken, (req, res) => {
  try {
    jwt.verify(req.token,process.env.JWT, (err, data) => {
      if (err) {
        res.sendStatus(403);
        console.log(err);
      } else {  

    const  objrol = {
      ROL: req.body.ROL
    }
    const sql = `CALL PRC_MS_SEL_NOM_ROLES('${objrol.ROL}')`;
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



// VER EL ROL DE UN USUARIO

///////////////////////////////////////////////////////////////////

router.post(["/sel_rol/user"],ensureToken, (req, res) => {
  try {
    jwt.verify(req.token,process.env.JWT, (err, data) => {
      if (err) {
        res.sendStatus(403);
        console.log(err);
      } else {  

    const  objrol = {
      USER: req.body.USER
    }
    const sql = `CALL SEL_ROL_USR('${objrol.USER}')`;
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

router.post('/ins_rol',ensureToken,(req,res)=>{

  jwt.verify(req.token,process.env.JWT, (err, data) => {
    if (err) {
      res.sendStatus(403);
      console.log(err);
    } else {

  const objusr = {
      ROL: req.body.ROL,
      DES_ROL: req.body.DES_ROL
    }

  const sql = `CALL PRC_MS_INSERT_ROLES( '${objusr.ROL}' ,
                                         '${objusr.DES_ROL}'
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

router.delete('/del_rol/:cod',ensureToken,(req,res)=>{

    jwt.verify(req.token,process.env.JWT, (err, data) => {
    if (err) {
      res.sendStatus(403);
      console.log(err);
    } else {


    const {cod} = req.params;
    const sql = `CALL PRC_MS_DEL_ROLES(${cod})`;
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

router.put('/upd_rol',ensureToken,(req,res)=>{
  try {
    jwt.verify(req.token,process.env.JWT, (err, data) => {
      if (err) {
        res.sendStatus(403);
        console.log(err);
      } else {

        ;
        const objusr = {
          ROL: req.body.ROL,
          DES_ROL: req.body.DES_ROL,
          FILA: req.body.FILA
        }

      const sql = `CALL PRC_MS_UPD_ROLES(  
                                          '${objusr.ROL}',
                                          '${objusr.DES_ROL}',
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
