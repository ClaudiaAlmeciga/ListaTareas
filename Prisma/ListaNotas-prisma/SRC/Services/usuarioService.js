import prisma from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; //generar la firma

const obtenerUsuarios = async () => {
  const usuarios = await prisma.usuario.findMany();
  return usuarios;
};

const crearUsuario = async (usuario) => {
  const contrasenaEncriptada = await encriptarContrasena(usuario.contrasena);
  usuario.contrasena = contrasenaEncriptada;
  const nuevoUsuario = await prisma.usuario.create({
    data: usuario,
  });
  return nuevoUsuario;
};

const actualizarUsuario = async (id, usuario) => {
  const usuarioActualizado = await prisma.usuario.update({
    where: {
      id: parseInt(id),
    },
    data: usuario,
  });
  return usuarioActualizado;
};

const eliminarUsuario = async (id) => {
  const usuarioEliminado = await prisma.usuario.delete({
    where: {
      id: parseInt(id),
    },
  });
  return usuarioEliminado;
};

const login = async (usuario) => {
  const usuarioEncontrado = await prisma.usuario.findUnique({
    where: {
      email: usuario.email,
    },
  });

  if (!usuarioEncontrado) {
    throw new Error("Usuario no encontrado");
  }

  const contrasenaVerificada = await verificarContrasena(
    usuario.contrasena,
    usuarioEncontrado.contrasena
  );

  if (!contrasenaVerificada) {
    throw new Error("Contraseña incorrecta");
  }

  const token = generarToken(usuarioEncontrado);

  return { token: token };
};

const encriptarContrasena = async (contrasena) => {
  const contrasenaEncriptada = await bcrypt.hash(contrasena, 10);
  return contrasenaEncriptada;
};

const verificarContrasena = async (contrasena, contrasenaEncriptada) => {
  const contrasenaVerificada = await bcrypt.compare(
    contrasena,
    contrasenaEncriptada
  );
  return contrasenaVerificada;
};

const generarToken = (usuario) => {
  const token = jwt.sign(
    {
      id: usuario.id,
      email: usuario.email,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );
  return token;
};

export default {
  obtenerUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  login,
};
