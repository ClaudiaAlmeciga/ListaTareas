import notaService from "../Services/notaService.js";

const obtenerNotas = async (req, res) => {
  const datos = await notaService.obtenerNotas();
  res.json(datos);
};

const crearNota = async (req, res) => {
  const datos = await notaService.crearNota(req.body);
  res.json(datos);
};

const actualizarNota = async (req, res) => {
  const datos = await notaService.actualizarNota(req.params.id, req.body);
  res.json(datos);
};

const eliminarNota = async (req, res) => {
  const datos = await notaService.eliminarNota(req.params.id);
  res.json(datos);
};

export default {
  obtenerNotas,
  crearNota,
  actualizarNota,
  eliminarNota,
};
