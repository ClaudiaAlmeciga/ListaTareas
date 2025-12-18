import usuarioService from "../Services/usuarioService.js";

const obtenerUsuarios = async (req, res) => {
  const datos = await usuarioService.obtenerUsuarios();
  res.json(datos);
};

const crearUsuario = async (req, res) => {
  const body = req.body;
  const datos = await usuarioService.crearUsuario(body);
  res.json(datos);
};

const actualizarUsuario = async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const datos = await usuarioService.actualizarUsuario(id, body);
  res.json(datos);
};

const eliminarUsuario = async (req, res) => {
  const id = req.params.id;
  const datos = await usuarioService.eliminarUsuario(id);
  res.json(datos);
};

const login = async (req, res) => {
  const body = req.body;
  const datos = await usuarioService.login(body);
  res.json(datos);
};

export default {
  obtenerUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  login,
};
