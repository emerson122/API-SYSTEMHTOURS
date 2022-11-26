const express = require("express");
const mysql = require("../db");
const router = express.Router();
const jwt = require("jsonwebtoken");
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

router.get(["/sel_per"], ensureToken, (req, res) => {
  try {
    jwt.verify(req.token, process.env.JWT, (err, data) => {
      if (err) {
        res.sendStatus(403);
        console.log(err);
      } else {
        const sql = `CALL PRC_SEL_PERMISOS()`;
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

// SELECCIONAR PERMISOS POR ROL Y OBJETO
router.post(["/sel_per_obj"], ensureToken, (req, res) => {
  try {
    jwt.verify(req.token, process.env.JWT, (err, data) => {
      if (err) {
        res.sendStatus(403);
        console.log(err);
      } else {
        const objper = {
          PV_ROL: req.body.PV_ROL,
          PV_OBJ: req.body.PV_OBJ,
        };
        const sql = `CALL SEL_PERMISOS_ROL('${objper.PV_ROL}', '${objper.PV_OBJ}');`;
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

//SELECCIONAR TODOS LOS PERMISOS DE UN SOLO ROL
router.post(["/sel_per_rol"], ensureToken, (req, res) => {
  try {
    jwt.verify(req.token, process.env.JWT, (err, data) => {
      if (err) {
        res.sendStatus(403);
        console.log(err);
      } else {
        const objper = {
          PV_ROL: req.body.PV_ROL,
        };
        const sql = `CALL SEL_ALLPERMISOS_ROL('${objper.PV_ROL}');`;
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

//SELECCIONAR LOS ACCESOS DE UN ROL
router.post(["/sel_per_acc"], ensureToken, (req, res) => {
  try {
    jwt.verify(req.token, process.env.JWT, (err, data) => {
      if (err) {
        res.sendStatus(403);
        console.log(err);
      } else {
        const objper = {
          PV_ROL: req.body.PV_ROL,
        };
        const sql = `CALL SEL_ACCESS_ROL('${objper.PV_ROL}');`;
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

router.post("/ins_permiso", ensureToken, (req, res) => {
  jwt.verify(req.token, process.env.JWT, (err, data) => {
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
        PV_PER_CONSULTAR: req.body.PV_PER_CONSULTAR,
      };

      const sql = `CALL PRC_INSERT_PERMISOS( ${objusr.PB_COD_ROL} ,
                                          ${objusr.PB_COD_OBJETO},
                                          '${objusr.PV_PER_INSERCION}',
                                          '${objusr.PV_PER_ELIMINAR}',
                                          '${objusr.PV_PER_ACTUALIZAR}',
                                          '${objusr.PV_PER_CONSULTAR}'
                                          )`;
      mysql.query(sql, (error, results) => {
        if (error) throw error;
        res.send("Datos insertados");
      });
    }
  });
  console.log("Datos insertados Correctamente");
});

// ELIMINAR

///////////////////////////////////////////////////////////////////

router.delete("/del_permiso/:cod", ensureToken, (req, res) => {
  jwt.verify(req.token, process.env.JWT, (err, data) => {
    if (err) {
      res.sendStatus(403);
      console.log(err);
    } else {
      const { cod } = req.params;
      const sql = `CALL PRC_DEL_PERMISOS(${cod})`;
      mysql.query(sql, (error, results) => {
        if (error) throw error;
        res.send("Datos Eliminados");
      });
    }
  });
  console.log("Datos Eliminados Correctamente");
});

// ACTUALIZAR USR

///////////////////////////////////////////////////////////////////

router.put("/upd_permiso/:cod", ensureToken, (req, res) => {
  try {
    jwt.verify(req.token, process.env.JWT, (err, data) => {
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
          PV_PER_CONSULTAR: req.body.PV_PER_CONSULTAR,
        };

        const sql = `CALL PRC_UPD_PERMISOS( ${objusr.PB_COD_ROL} ,
                                                ${objusr.PB_COD_OBJETO},
                                                '${objusr.PV_PER_INSERCION}',
                                                '${objusr.PV_PER_ELIMINAR}',
                                                '${objusr.PV_PER_ACTUALIZAR}',
                                                '${objusr.PV_PER_CONSULTAR}'
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
