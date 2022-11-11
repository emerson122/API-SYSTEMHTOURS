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
  res.send("<h1> API SystemHtors by TecnoBot </h1>");
});

//rutas seguridad
app.use("/seguridad", require("./routes/registro"));
app.use("/seguridad", require("./routes/login"));
app.use("/seguridad", require("./routes/bitacora"));
app.use("/personas", require("./routes/personas"));
app.use("/roles", require("./routes/roles"));
app.use("/permisos", require("./routes/permisos"));
app.use(require("./routes/objeto"));
app.use(require("./routes/parametro"));
app.use(require("./routes/usuarios"));
//rutas contables
app.use(require("./routes/periodo"));
app.use(require("./routes/balance"));
app.use(require("./routes/resultado"));
app.use(require("./routes/librodiario"));
app.use(require("./routes/libromayor"));
app.use(require("./routes/clasificacion"));
app.use(require("./routes/cuentas"));
app.use(require("./routes/grupos"));
app.use(require("./routes/subcuentas"));

app.get("*", function (req, res) {
  res.status(404).send("Error 404 - Recurso no encontrado :(");
});
// iniciar servidor

app.listen(app.get("port"), () => {
  console.log(
    `servidor ejecutado en la siguiente direccion http://localhost:${app.get("port")}`
  );
});
