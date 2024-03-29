const express = require("express");
const mysql = require("../db");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
//Autor Kevin Fabricio Alvarado Buezo

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

// LEER DATOS  //FUNCIONAL
router.get("/librodiario", ensureToken, (req, res) => {
  try {
    jwt.verify(req.token, process.env.JWT, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const sql = `Call PRC_LIBDIARIO('?','?','?', '?', '?', 5, '');`;
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
//BUSCAR POR ID//FUNCIONAL
router.get("/librodiario/:cod", ensureToken, (req, res) => {
  try {
    jwt.verify(req.token, process.env.JWT, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const { cod } = req.params;
        const sql = `CALL PRC_LIBDIARIO('?', '?', '?', '?', '?', 6, ${cod})`;
        mysql.query(sql, (error, results) => {
          if (error) throw error;
          if (results.length > 0) {
            res.json(results[0]);
          } else {
            res.send("No se pudieron Obtener los datos");
          }
        });
        console.log("Datos Leidos Correctamente");
      }
    });
  } catch (error) {
    res.send(error);
  }
}); 
// INSERTAR // FUNCIONAL Cuentas y subcuentas
router.post("/librodiario/insertar", ensureToken, (req, res) => {
  try {
    jwt.verify(req.token, process.env.JWT, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const objlibrodiario = {
          COD_PERIODO: req.body.COD_PERIODO,
          NOM_CUENTA: req.body.NOM_CUENTA,
          NOM_SUBCUENTA: req.body.NOM_SUBCUENTA,
          SAL_DEBE: req.body.SAL_DEBE,
          SAL_HABER: req.body.SAL_HABER,
        };
        const sql = `CALL PRC_LIBDIARIO(${objlibrodiario.COD_PERIODO},'${objlibrodiario.NOM_CUENTA}','${objlibrodiario.NOM_SUBCUENTA}',${objlibrodiario.SAL_DEBE},${objlibrodiario.SAL_HABER},1,'?')`;
        mysql.query(sql, (error) => {
          if (error) throw error;
          res.send("Los datos se insertaron correctamente");
        });
        console.log("Datos insertados correctamente");
      }
    });
  } catch (error) {
    res.send(error);
  }
});

//INSERTAR //  SOLO CUENTAS
router.post("/librodiario/insertar_s_cuentas", ensureToken, (req, res) => {
  try {
    jwt.verify(req.token, process.env.JWT, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const objlibrodiario = {
          COD_PERIODO: req.body.COD_PERIODO,
          NOM_CUENTA: req.body.NOM_CUENTA,
          SAL_DEBE: req.body.SAL_DEBE,
          SAL_HABER: req.body.SAL_HABER,
        };
        const sql = `CALL PRC_LIBDIARIO(${objlibrodiario.COD_PERIODO},'${objlibrodiario.NOM_CUENTA}','',${objlibrodiario.SAL_DEBE},${objlibrodiario.SAL_HABER},2,'?')`;
        mysql.query(sql, (error) => {
          if (error) throw error;
          res.send("Los datos se insertaron correctamente");
        });
        console.log("Datos insertados correctamente");
      }
    });
  } catch (error) {
    res.send(error);
  }
});

// ACTUALIZAR // FUNCIONAL
router.put("/librodiario/actualizar/:cod", ensureToken, (req, res) => {
  try {
    jwt.verify(req.token, process.env.JWT, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const { cod } = req.params;
        const objlibrodiario = {
          COD_PERIODO: req.body.COD_PERIODO,
          NOM_CUENTA: req.body.NOM_CUENTA,
          NOM_SUBCUENTA: req.body.NOM_SUBCUENTA,
          SAL_DEBE: req.body.SAL_DEBE,
          SAL_HABER: req.body.SAL_HABER,
        };
        const sql = `CALL UPD_LIBDIARIO(${objlibrodiario.COD_PERIODO},'${objlibrodiario.NOM_CUENTA}','${objlibrodiario.NOM_SUBCUENTA}',${objlibrodiario.SAL_DEBE},${objlibrodiario.SAL_HABER},'?',${cod})`;
        mysql.query(sql, (error, results) => {
          if (error) throw error;
          if (results.length>0) {
            res.json(results[0]);
          }else{
            res.send("Datos Actualizados");
          }
        });
        console.log("Datos Actualizados Correctamente");
      }
    });
  } catch (error) {
    res.send(error);
  }
});
// ELIMINAR  // FUNCIONAL
router.delete("/librodiario/eliminar/:cod", ensureToken, (req, res) => {
  try {
    jwt.verify(req.token, process.env.JWT, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const { cod } = req.params;
        const sql = `CALL DEL_LIBDIARIO( ${cod})`;
        mysql.query(sql, (error, results) => {
          if (error) throw error;
          res.send("Datos Eliminados");
        });
        console.log("Datos Eliminados Correctamente");
      }
    });
  } catch (error) {
    res.send(error);
  }
});


//busqueda avanzada CUENTAS
router.post(["/libdiario/unidades/cuentas"], ensureToken,(req, res)=>{
  try {
      jwt.verify(req.token, process.env.JWT, (err, data) => {
        if (err) {
          res.sendStatus(403);
        } else {
          const objgrupo = {
            CUENTA: req.body.CUENTA
          }
  const sql = `CALL BUSQUEDAD_LIBDIARIO('%${objgrupo.CUENTA}%','1')`;
  mysql.query(sql,(error,results)=>{
      if(error) throw error;
      if(results.length>0){
          res.json(results[0]);
      }else{
          res.send('No se pudo obtener resultados')
      }
  });  
}
});
  console.log('Datos leidos correctamente');

} catch (error) {
  res.send(error);
}
});

//busqueda avanzada SUBCUENTAS
router.post(["/libdiario/unidades/subcuentas"], ensureToken,(req, res)=>{
  try {
      jwt.verify(req.token, process.env.JWT, (err, data) => {
        if (err) {
          res.sendStatus(403);
        } else {
          const objgrupo = {
            CUENTA: req.body.CUENTA
          }
  const sql = `CALL BUSQUEDAD_LIBDIARIO('%${objgrupo.CUENTA}%','2')`;
  mysql.query(sql,(error,results)=>{
      if(error) throw error;
      if(results.length>0){
          res.json(results[0]);
      }else{
          res.send('No se pudo obtener resultados')
      }
  });  
}
});
  console.log('Datos leidos correctamente');

} catch (error) {
  res.send(error);
}
});

module.exports = router;