const express = require('express');
const mysql = require('../db');
const router = express.Router();

// insertar 
router.get('/periodo',(req,res)=>{
    res.sendStatus(200)
});

module.exports = router;