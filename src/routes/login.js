const express = require("express");
const mysql = require("../db");
const jwt = require("jsonwebtoken");
const { json } = require("body-parser");

const router = express.Router();
require("dotenv").config();
//Autor: Emerson Ramos

// Login logeo
router.post("/login", (req, res) => {
  try {
    const objlogin = {
      usuario: req.body.user,
      passwd: req.body.pass,
    };
    const sql = `Call SEL_USERANDPASS('${objlogin.usuario}','${objlogin.passwd}')`;
    mysql.query(sql, (error, results) => {
      if (error) throw error;

      var validador;
      var myjson = JSON.stringify(results[0]); //pasar json a texto
      for (x = 6; x < myjson.length - 2; x++) {
        validador = myjson[x];
      }
      if (validador == 1) {
        const user = results[0].user; //de los resultados que me traiga el procedimiento lo meto en una constante
        // const cookiesOptions = {
        //     expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES * 24 * 60 *60 * 1000),
        //     httpOnly: true
        // }
        jwt.sign(
          { user: user },
          process.env.JWT,
          { expiresIn: process.env.JWT_TIEMPO_EXPIRA },
          (err, token) => {
            res.json({
              token: token,
            });
          }
        );
      } else {
        res.send("No se pudo obtener resultado");
      }
    });
    console.log("Token generado correctamente"); //eliminar confirmacion
  } catch (error) {
    res.send(error);
  }
});

//Generar Token para recuperar acceso por correo
router.post("/recuperarlogin", (req, res) => {
  try {
    const metod = "correo"; //de los resultados que me traiga el procedimiento lo meto en una constante
    const objresultados = {
      USER: req.body.user,
      PARAMETRO:req.body.PARAMETRO
    }
    jwt.sign(
      { metod: metod },
      process.env.JWT_CORREO,
      { expiresIn: objresultados.PARAMETRO},(err, token) => {
        res.json({
          token: token,
        });
      }
    );
  } catch (error) {
    res.send(error);
  }
  console.log("Datos leidos correctamente"); //Eliminar confirmacion en consola
});

//middleware de autenticacion de seguridad
router.post("/check", (req, res) => {
  try {
    jwt.verify(req.body.token, process.env.JWT, (error, authData) => {
      if (error) {
        res.send("error-parse"); //acceso prohibido
      } else {
        console.log('Chekado Correctamente');
        res.json({
          mensaje: "Autorizado",
          authData: authData,
        });
      }
    });
  } catch (error) {
    res.send(error);
  }
});
//verificacion de token de correo
router.post("/correocheck", (req, res) => {
  try {
    jwt.verify(req.body.token, process.env.JWT_CORREO, (error, authData) => {
      if (error) {
        res.send("error-parse"); //acceso prohibido
      } else {
        res.json({
          mensaje: "Autorizado",
          authData: authData,
        });
      }
    });
  } catch (error) {
    res.send(error);
  }
});

//parametro externo de intentos invalidos
router.post('/parametros/intentos',(req,res)=>{
  try {
         
 
  const objparametros = { 
      PARAMETRO: "ADMIN_INTENTOS_INVALIDOS"
  }
  const sql = `CALL PRC_MS_PARAMETROS( '${objparametros.PARAMETRO}','' , '', '', 6, '?')`;
  mysql.query(sql,(error,results)=>{
      if(error) throw error;
      if (results.length > 0) {
          res.json(results[0])
      }else{
          res.send("No se obtuvieron datos")
      }
  })
  console.log('Datos insertados Correctamente');

} catch (error) {
  res.send(error)    
}
});

//Parametro Externo de cantidad de preguntas
router.post('/parametros/cant_preg',(req,res)=>{
  try {
  const objparametros = { 
      PARAMETRO: "ADMIN_PREGUNTAS"
  }
  const sql = `CALL PRC_MS_PARAMETROS( '${objparametros.PARAMETRO}','' , '', '', 6, '?')`;
  mysql.query(sql,(error,results)=>{
      if(error) throw error;
      if (results.length > 0) {
          res.json(results[0])
      }else{
          res.send("No se obtuvieron datos")
      }
  })
  console.log('Datos insertados Correctamente');

} catch (error) {
  res.send(error)    
}
});


//Parametro Externo de vigencia de correo
router.post('/parametros/correo_time',(req,res)=>{
  try {
  const objparametros = { 
      PARAMETRO: "ADMIN_VIG_RECUPERACION"
  }
  const sql = `CALL PRC_MS_PARAMETROS( '${objparametros.PARAMETRO}','' , '', '', 6, '?')`;
  mysql.query(sql,(error,results)=>{
      if(error) throw error;
      if (results.length > 0) {
          res.json(results[0])
      }else{
          res.send("No se obtuvieron datos")
      }
  })
  console.log('Datos insertados Correctamente');

} catch (error) {
  res.send(error)    
}
});


//ruta protegida
router.get("/api/", ensureToken, (req, res) => {
  try {
    jwt.verify(req.token, process.env.JWT, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        res.json({
          test: "protegido papa",
          data,
        });
      }
    });
  } catch (error) {
    res.send(error);
  }
});


//Refrescar Token
router.post("/refresh", (req, res) => {
  try {
    jwt.verify(req.body.token, process.env.JWT, (error, authData) => {
      if (error) {
        res.send("error-parse"); //acceso prohibido
      } else {
        jwt.sign(
          { user: req.body.user },
          process.env.JWT,
          { expiresIn: process.env.JWT_TIEMPO_EXPIRA },
          (err, token) => {
            res.json({
              token: token,
            });
          }
        );
      }
    });
  } catch (error) {
    res.send(error);
  }
});


//Devolver Objeto Login
router.post("/objetos/login", (req, res) => {
  try {
    // jwt.verify(req.token, process.env.JWT, (err, data) => {
    //   if (err) {
    //     res.sendStatus(403);
      // } else { 
        const objobjetos = {
          OBJETO: 'LOGIN'
        };
        const sql = `CALL PRC_OBJETOS( '${objobjetos.OBJETO}','' , '',  6, '?')`;
        mysql.query(sql, (error, results) => {
          if (error) throw error;
          if(results.length>0){
            res.json(results[0])
          }else{
            res.send("No se pudo encontrar el dato");
          }
        });
        console.log("Datos insertados Correctamente");
      // } 
    // });
  } catch (error) {
    res.send(error);
  }
});



//funcion para almacenar el token
function verificarToken(req, res, next) {
  if (typeof bearerHeader !== "undefined") {
    //si es diferente de undefined significa diferente de vacio
    const bearetoken = bearerHeader.split(" ")[1]; //el token esta en la posicion 1
    req.token = bearetoken;
    next();
  } else {
    res.sendStatus(403); //acceso prohibido
  }
}

//middleware para asegurarse de que el token pertence a htours
function ensureToken(req, res, next) {
  try {
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
  } catch (error) {
    res.send(error);
  }
}

module.exports = router;
