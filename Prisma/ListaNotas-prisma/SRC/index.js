import dotenv from "dotenv";
dotenv.config();

import express from "express";
import usuarioRutas from "./Rutas/V1/usuarioRutas.js";
import notaRutas from "./Rutas/V1/notaRutas.js";

const app = express();

//Middleware, que nos permite que el servidor entienda JSON
app.use(express.json());

app.use("/api/v1/usuario", usuarioRutas);
app.use("/api/v1/nota", notaRutas);

app.use((req, res) => {
  console.log("Petición recibida");
  res.status(200).json({
    message: "Petición recibida",
  });
});

const PORT = process.env.PUERTO || 3000;
//Middleware, que nos permite que el servidor escuche peticiones
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
