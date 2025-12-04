// prisma/seed.js

// Carga variables de entorno
import "dotenv/config";

// Cliente generado por Prisma (clásico, en node_modules/@prisma/client)
import pkg from "@prisma/client";
const { PrismaClient } = pkg;

// Driver y adapter para PostgreSQL (Prisma 7)
import pg from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const { Pool } = pg;

// Validamos que exista la cadena de conexión
const connectionString = process.env.DATABASE_URL;
if (!connectionString || connectionString.trim().length === 0) {
  throw new Error("DATABASE_URL no está definida. Revisa tu archivo .env.");
}

// Pool de Postgres (con SSL si usas Render / cloud)
const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Adapter Prisma 7 + pg
const adapter = new PrismaPg(pool);

// PrismaClient ahora DEBE recibir options con adapter
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("📌 Iniciando seed...");

  // === INSERT ESTADOS ===
  await prisma.estado.createMany({
    data: [
      { nombre: "Pendiente" },
      { nombre: "En Progreso" },
      { nombre: "Completado" },
      { nombre: "Archivado" },
    ],
    skipDuplicates: true,
  });

  // === INSERT ETIQUETAS ===
  await prisma.etiqueta.createMany({
    data: [
      { nombre: "Trabajo" },
      { nombre: "Personal" },
      { nombre: "Estudios" },
      { nombre: "Salud" },
      { nombre: "Viajes" },
    ],
    skipDuplicates: true,
  });

  // === INSERT USUARIOS ===
  await prisma.usuario.createMany({
    data: [
      {
        nombre: "Juan",
        apellido: "Perez",
        email: "juan@ejemplo.com",
        contrasena: "pass1",
      },
      {
        nombre: "Maria",
        apellido: "Gomez",
        email: "maria@ejemplo.com",
        contrasena: "pass2",
      },
      {
        nombre: "Carlos",
        apellido: "Lopez",
        email: "carlos@ejemplo.com",
        contrasena: "pass3",
      },
      {
        nombre: "Ana",
        apellido: "Martinez",
        email: "ana@ejemplo.com",
        contrasena: "pass4",
      },
      {
        nombre: "Pedro",
        apellido: "Garcia",
        email: "pedro@ejemplo.com",
        contrasena: "pass5",
      },
      {
        nombre: "Laura",
        apellido: "Rodriguez",
        email: "laura@ejemplo.com",
        contrasena: "pass6",
      },
    ],
    skipDuplicates: true,
  });

  // === INSERT NOTAS ===
  await prisma.nota.createMany({
    data: [
      {
        idUsuario: 1,
        titulo: "Comprar pan",
        descripcion: "Ir a la tienda",
        idEstado: 1,
      },
      {
        idUsuario: 1,
        titulo: "Pagar recibo",
        descripcion: "Servicios públicos",
        idEstado: 1,
      },
      {
        idUsuario: 2,
        titulo: "Estudiar JS",
        descripcion: "2 horas mínimo",
        idEstado: 2,
      },
    ],
  });

  // === RELACIONES N:N ===
  await prisma.notaEtiqueta.createMany({
    data: [
      { idNota: 1, idEtiqueta: 1 },
      { idNota: 1, idEtiqueta: 2 },
      { idNota: 2, idEtiqueta: 1 },
    ],
  });

  console.log("🌱 Seed ejecutado correctamente");
}

main()
  .catch((e) => {
    console.error("❌ Error ejecutando seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    // Cerramos conexiones
    await prisma.$disconnect();
    await pool.end();
  });
