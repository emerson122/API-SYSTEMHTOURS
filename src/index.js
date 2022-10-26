const express = require("express");
const app = express();
const bodyparser = require("body-parser");

//ajuste del puerto

app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(express.json());
app.use(bodyparser.json());

//inicio
app.get("/", (req, res) => {
  res.send("<h1>h1 API Htour</h1>");
});

//rutas mertodo1
app.use("/seguridad", require("./routes/registro"));
app.use("/seguridad", require("./routes/login"));

app.use("/personas", require("./routes/personas"));
//añadir las rutas
app.use(require("./routes/periodo"));
app.use(require("./routes/librodiario"));
app.use(require("./routes/libromayor"));
app.use(require("./routes/clasificacion"));
app.use(require("./routes/objeto"));
app.use(require("./routes/parametro"));

app.get("*", function (req, res) {
  res.status(404).send("Error 404 - Recurso no encontrado :(");
});
// iniciar servidor

app.listen(app.get("port"), () => {
  console.log(
    `servidor ejecutado en la siguiente direccion http://localhost:${app.get("port")}`
  );
});
