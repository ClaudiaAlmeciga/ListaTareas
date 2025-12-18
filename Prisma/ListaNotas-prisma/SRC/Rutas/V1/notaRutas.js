import { Router } from "express";
import notaController from "../../Controllers/notaController.js";
import validarToken from "../../Midleware/validarToken.js";

const router = new Router(); //proteger las rutas token

router.use(validarToken);

router.get("/", notaController.obtenerNotas);
router.post("/", notaController.crearNota);
router.put("/:id", notaController.actualizarNota);
router.delete("/:id", notaController.eliminarNota);

export default router;
