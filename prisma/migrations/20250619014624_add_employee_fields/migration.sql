/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cedula]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cedula` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duracion_cita` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `especialidad` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `horario_fin` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `horario_inicio` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefono` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "activo" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "cedula" TEXT NOT NULL,
ADD COLUMN     "duracion_cita" INTEGER NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "especialidad" TEXT NOT NULL,
ADD COLUMN     "horario_fin" TEXT NOT NULL,
ADD COLUMN     "horario_inicio" TEXT NOT NULL,
ADD COLUMN     "telefono" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_cedula_key" ON "Employee"("cedula");
