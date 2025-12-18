import { Router } from "express";
import usuarioController from "../../Controllers/usuarioController.js";
import validarToken from "../../Midleware/validarToken.js";

const router = new Router();

router.get("/", validarToken, usuarioController.obtenerUsuarios);
router.post("/", validarToken, usuarioController.crearUsuario);
router.put("/:id", validarToken, usuarioController.actualizarUsuario);
router.delete("/:id", validarToken, usuarioController.eliminarUsuario);

router.post("/login", usuarioController.login);

export default router;
