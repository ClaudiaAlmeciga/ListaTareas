import dotenv from "dotenv";
dotenv.config();
import { defineConfig, env } from "prisma/config";

console.log("DEBUG RESOLVED URL:", env("DATABASE_URL"));

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "node ./prisma/seed.js",
  },
  datasource: {
    url: env("DATABASE_URL")
  },
});
