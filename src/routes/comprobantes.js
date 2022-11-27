const express = require('express');
const mysql = require('../db');
const router = express.Router();
const jwt = require('jsonwebtoken');
require("dotenv").config();
// Autor: Emerson Ramos

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


// INSERTAR COMPROBANTE
router.post("/comprobantes/insertar", ensureToken,(req, res) => {
    try {
      jwt.verify(req.token, process.env.JWT, (err, data) => {
        if (err) {
          res.sendStatus(403);
        } else {
            const objcomprobante = {
                PV_LIBRODIARIO: req.body.LIBRODIARIO,
                PV_NOMBRECOMPROBANTE: req.body.NOMBRE
            }
  
          const sql = `call PRC_COMPROBANTES('', '${objcomprobante.PV_NOMBRECOMPROBANTE}', '1', '')`;
          mysql.query(sql, (error, results) => {
            if (error) throw error;
            res.send("Datos insertados");
          });
          console.log("Datos insertados Correctamente");
        }
      });
    } catch (error) {
      res.send(error);
    }
  });
  



module.exports = router;
