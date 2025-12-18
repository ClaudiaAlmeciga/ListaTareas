-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "agenda";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "usuario";

-- CreateTable
CREATE TABLE "usuario"."usuario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contrasena" VARCHAR(10) NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_modificacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario"."perfil" (
    "id" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "nombre" VARCHAR(255),
    "foto_perfil" VARCHAR(255),
    "fecha_nacimiento" TIMESTAMP(3),
    "telefono" VARCHAR(20),
    "direccion" VARCHAR(255),
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_modificacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "perfil_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agenda"."estado" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_modificacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "estado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agenda"."nota" (
    "id" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "titulo" VARCHAR(100) NOT NULL,
    "descripcion" VARCHAR(100) NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_modificacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_alerta" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_estado" INTEGER NOT NULL,

    CONSTRAINT "nota_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agenda"."etiqueta" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_modificacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "etiqueta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agenda"."nota_etiqueta" (
    "id_nota" INTEGER NOT NULL,
    "id_etiqueta" INTEGER NOT NULL,

    CONSTRAINT "nota_etiqueta_pkey" PRIMARY KEY ("id_nota","id_etiqueta")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"."usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "perfil_id_usuario_key" ON "usuario"."perfil"("id_usuario");

-- CreateIndex
CREATE UNIQUE INDEX "estado_nombre_key" ON "agenda"."estado"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "etiqueta_nombre_key" ON "agenda"."etiqueta"("nombre");

-- AddForeignKey
ALTER TABLE "usuario"."perfil" ADD CONSTRAINT "perfil_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"."usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agenda"."nota" ADD CONSTRAINT "nota_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"."usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agenda"."nota" ADD CONSTRAINT "nota_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "agenda"."estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agenda"."nota_etiqueta" ADD CONSTRAINT "nota_etiqueta_id_nota_fkey" FOREIGN KEY ("id_nota") REFERENCES "agenda"."nota"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agenda"."nota_etiqueta" ADD CONSTRAINT "nota_etiqueta_id_etiqueta_fkey" FOREIGN KEY ("id_etiqueta") REFERENCES "agenda"."etiqueta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
