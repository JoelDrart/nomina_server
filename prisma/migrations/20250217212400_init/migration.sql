-- CreateEnum
CREATE TYPE "EmployeeType" AS ENUM ('ASALARIADO', 'POR_HORAS');

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "EmployeeType" NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SalariedEmployee" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "salary" DOUBLE PRECISION NOT NULL,
    "monthsWorked" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "SalariedEmployee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HourlyEmployee" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "hourlyRate" DOUBLE PRECISION NOT NULL,
    "hoursWorked" INTEGER NOT NULL,

    CONSTRAINT "HourlyEmployee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SalariedEmployee_employeeId_key" ON "SalariedEmployee"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "HourlyEmployee_employeeId_key" ON "HourlyEmployee"("employeeId");

-- AddForeignKey
ALTER TABLE "SalariedEmployee" ADD CONSTRAINT "SalariedEmployee_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HourlyEmployee" ADD CONSTRAINT "HourlyEmployee_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
