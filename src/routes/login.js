const express = require('express');
const mysql = require('../db');
const jwt = require('jsonwebtoken');
const { json } = require('body-parser');

const router = express.Router();
const {config} = require('dotenv').config();




const clavesecreta= 'ZAKESTHtw1243rtewgds08523765432379';
// insertar 
router.post('/login',(req,res)=>{
    const objlogin ={
        usuario: req.body.user,
        passwd : req.body.pass,
    }
    const sql = `Call SEL_USERANDPASS('${objlogin.usuario}','${objlogin.passwd}')`;
    mysql.query(sql, (error,results)=>{
    if(error) throw error;

    var validador
    var myjson = JSON.stringify(results[0]) //pasar json a texto
    for(x=6;x<myjson.length-2;x++){
       validador = myjson[x]
    }
    if (validador==1){

        const user = results[0].user //de los resultados que me traiga el procedimiento lo meto en una constante
        // const cookiesOptions = {
        //     expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES * 24 * 60 *60 * 1000),
        //     httpOnly: true
        // }
        jwt.sign({user: user },clavesecreta ,{expiresIn: '5m'}, (err,token)=>{
            res.json({
                token: token
            })
        })

    }else{
        res.send('No se pudo obtener resultado')
    }      
     
    })
    // console.log('Datos leidos correctamente');
});

router.post('/check',(req,res)=>{ 
    jwt.verify(req.body.token,clavesecreta, (error,authData)=>{
        if(error){
            res.send('error-parse'); //acceso prohibido
        }else{
            res.json({
                mensaje: "Autorizado",
                authData: authData
            })
        }
    })
});



//ruta protegida
router.get('/api/',ensureToken,(req,res)=>{

    jwt.verify(req.token,clavesecreta,(err,data)=>{
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                test: 'protegido papa',
                data
            })
        }
    })
   
});



//Refrescar Token




//funcion para almacenar el token
function verificarToken(req,res,next) {
    if(typeof bearerHeader !== 'undefined'){ //si es diferente de undefined significa diferente de vacio
       const bearetoken = bearerHeader.split(' ')[1] //el token esta en la posicion 1
       req.token = bearetoken;
       next();
    }else{
        res.sendStatus(403); //acceso prohibido
    }
};


//middleware para asegurarse de que el token pertence a htours
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


module.exports=router;