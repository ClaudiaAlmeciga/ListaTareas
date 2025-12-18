import prisma from "../db.js";

const obtenerNotas = async () => {
  const notas = await prisma.nota.findMany();
  return notas;
};

const crearNota = async (nota) => {
  const nuevaNota = await prisma.nota.create({ data: nota });
  return nuevaNota;
};

const actualizarNota = async (id, nota) => {
  const notaActualizada = await prisma.nota.update({
    where: { id },
    data: nota,
  });
  return notaActualizada;
};

const eliminarNota = async (id) => {
  const notaEliminada = await prisma.nota.delete({ where: { id } });
  return notaEliminada;
};

export default {
  obtenerNotas,
  crearNota,
  actualizarNota,
  eliminarNota,
};
