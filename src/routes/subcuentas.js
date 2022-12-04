const express = require("express");
const mysql = require("../db");
const router = express.Router();
const jwt = require("jsonwebtoken");
//Autor Alexandra Moya

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

// leer FUNCIONAL
router.get(["/subcuentas"], ensureToken, (req, res) => {
  try {
    jwt.verify(req.token, process.env.JWT, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const sql = `CALL PRC_SUBCUENTAS('', '', '', 4,'' );`;
        mysql.query(sql, (error, results) => {
          if (error) throw error;
          if (results.length > 0) {
            res.json(results[0]);
          } else {
            res.send("No se pudo obtener resultados");
          }
        });
        console.log("Datos leidos correctamente");
      }
    });
  } catch (error) {
    res.send(error);
  }
});

//BUSCAR POR ID
router.get("/subcuentas/:cod", ensureToken, (req, res) => {
  try {
    jwt.verify(req.token, process.env.JWT, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const { cod } = req.params;
        const sql = `CALL PRC_SUBCUENTAS('', '', '', '', 5, ${cod})`;
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

// INSERTAR
router.post("/subcuentas/insertar", ensureToken, (req, res) => {
  try {
    jwt.verify(req.token, process.env.JWT, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const objsubcuentas = {
          NUM_SUBCUENTA: req.body.NUM_SUBCUENTA,
          NOM_SUBCUENTA: req.body.NOM_SUBCUENTA,
          NOM_CUENTA: req.body.NOM_CUENTA,
          CUENTAS: req.body.CORRELATIVO,
          CORRELATIVO: req.body.GRUPO,
        };

        const sql = `CALL PRC_SUBCUENTAS('${objsubcuentas.NUM_SUBCUENTA}', '${objsubcuentas.NOM_SUBCUENTA}', '${objsubcuentas.NOM_CUENTA}', 1,'' );`;
        mysql.query(sql, (error, results) => {
          if (error) throw error;
          if (results.length > 0) {
            res.json(results[0]);
          } else {
            res.send("Datos insertados");
          }
        });
        console.log("Datos insertados Correctamente");
      }
    });
  } catch (error) {
    res.send(error);
  }
});

//actualizar
router.put("/subcuentas/actualizar/:cod", ensureToken, (req, res) => {
  try {
    jwt.verify(req.token, process.env.JWT, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const { cod } = req.params;
        const objsubcuentas = {
          NUM_SUBCUENTA: req.body.NUM_SUBCUENTA,
          NOM_SUBCUENTA: req.body.NOM_SUBCUENTA,
          NOM_CUENTA: req.body.NOM_CUENTA,
        };

        const sql = `CALL PRC_SUBCUENTAS( '${objsubcuentas.NUM_SUBCUENTA}', '${objsubcuentas.NOM_SUBCUENTA}', '${objsubcuentas.NOM_CUENTA}', 2,${cod})`;
        mysql.query(sql, (error, results) => {
          if (error) throw error;
          res.send("Datos actualizados");
        });
        console.log("Datos actualizados Correctamente");
      }
    });
  } catch (error) {
    res.send(error);
  }
});

// ELIMINAR
router.delete("/subcuentas/eliminar/:cod", ensureToken, (req, res) => {
  try {
    jwt.verify(req.token, process.env.JWT, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const { cod } = req.params;
        const sql = `CALL PRC_SUBCUENTAS('', '', '', 3, ${cod})`;
        mysql.query(sql, (error, results) => {
          if (error) throw error;
          if (results.length > 0) {
            res.json(results[0]);
          } else {
            res.send("Datos eliminados");
          }
        });
        console.log("Datos eliminados correctamente");
      }
    });
  } catch (error) {
    res.send(error);
  }
});

router.post(["/subcuentas/unidades"], ensureToken, (req, res) => {
  try {
    jwt.verify(req.token, process.env.JWT, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const objgrupo = {
          CUENTA: req.body.CUENTA,
          NATURALEZA: req.body.NATURALEZA,
        };
        const sql = `CALL SEL_SUBCUENTAS_UNIDAD('${objgrupo.CUENTA}','${objgrupo.NATURALEZA}')`;
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

// leer FUNCIONAL
router.get(["/catalago/subcuentas"], ensureToken,(req, res)=>{
  try {
      jwt.verify(req.token, process.env.JWT, (err, data) => {
        if (err) {
          res.sendStatus(403);
        } else {
  const sql = `Call SEL_CATALAGO_SUBCUENTAS();`
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
