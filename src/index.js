const express = require('express');


const app = express();
const bodyparser = require('body-parser');


//ajuste del puerto

app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(express.json());
app.use(bodyparser.json());


//inicio
app.get('/',(req,res)=>{
    res.send('<html><body><center><b>Bienvenidos sean a la API de Htours</B></center></body></html>')
});

//rutas mertodo1
app.use('/seguridad',require("./routes/registro"));
app.use('/seguridad',require("./routes/login"));
//rutas metodo2
app.use(require("./routes/periodo"));



app.get('*',function (req,res) {
    res.status(404).send('Error 404 - Recurso no encontrado :(')
});
// iniciar servidor 

app.listen(app.get("port"), () => {
    console.log(`servidor ejecutado en la siguiente direccion http://localhost:${app.get("port")}`);
});
