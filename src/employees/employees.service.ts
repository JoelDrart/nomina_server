import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmployeeType } from '@prisma/client';
import {
  generateUniqueEmail,
  generateUniqueCedula,
} from '../utils/uniqueGenerator';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}

  private async ensureUniqueValues(email: string, cedula: string) {
    let uniqueEmail = email;
    let uniqueCedula = cedula;
    let attempt = 0;

    while (true) {
      const existingEmployee = await this.prisma.employee.findFirst({
        where: {
          OR: [{ email: uniqueEmail }, { cedula: uniqueCedula }],
        },
      });

      if (!existingEmployee) break;

      attempt++;
      uniqueEmail = generateUniqueEmail(email, attempt);
      uniqueCedula = generateUniqueCedula(cedula, attempt);
    }

    return { uniqueEmail, uniqueCedula };
  }

  async createSalariedEmployee(
    id: string | undefined,
    name: string,
    salary: number,
    monthsWorked: number,
    telefono: string,
    email: string,
    especialidad: string,
    cedula: string,
    horario_inicio: string,
    horario_fin: string,
    duracion_cita: number,
    activo: boolean,
  ) {
    try {
      const { uniqueEmail, uniqueCedula } = await this.ensureUniqueValues(
        email,
        cedula,
      );

      return await this.prisma.employee.create({
        data: {
          id: id ?? undefined,
          name,
          telefono,
          email: uniqueEmail,
          especialidad,
          cedula: uniqueCedula,
          horario_inicio,
          horario_fin,
          duracion_cita,
          activo,
          type: EmployeeType.ASALARIADO,
          salaried: {
            create: { salary, monthsWorked },
          },
        },
        include: { salaried: true },
      });
    } catch (error) {
      console.error('Error creating salaried employee:', error);
      throw new Error('Could not create salaried employee');
    }
  }

  async createHourlyEmployee(
    id: string | undefined,
    name: string,
    hourlyRate: number,
    hoursWorked: number,
    telefono: string,
    email: string,
    especialidad: string,
    cedula: string,
    horario_inicio: string,
    horario_fin: string,
    duracion_cita: number,
    activo: boolean,
  ) {
    try {
      const { uniqueEmail, uniqueCedula } = await this.ensureUniqueValues(
        email,
        cedula,
      );

      return await this.prisma.employee.create({
        data: {
          id: id ?? undefined,
          name,
          telefono,
          email: uniqueEmail,
          especialidad,
          cedula: uniqueCedula,
          horario_inicio,
          horario_fin,
          duracion_cita,
          activo,
          type: EmployeeType.POR_HORAS,
          hourly: {
            create: { hourlyRate, hoursWorked },
          },
        },
        include: { hourly: true },
      });
    } catch (error) {
      console.error('Error creating hourly employee:', error);
      throw new Error('Could not create hourly employee');
    }
  }

  async getAllEmployees() {
    return this.prisma.employee.findMany({
      include: { salaried: true, hourly: true },
    });
  }

  async updateSalariedEmployee(
    id: string,
    name: string,
    salary: number,
    monthsWorked: number,
    telefono: string,
    email: string,
    especialidad: string,
    cedula: string,
    horario_inicio: string,
    horario_fin: string,
    duracion_cita: number,
    activo: boolean,
  ) {
    return this.prisma.employee.update({
      where: { id },
      data: {
        name,
        telefono,
        email,
        especialidad,
        cedula,
        horario_inicio,
        horario_fin,
        duracion_cita,
        activo,
        salaried: {
          update: { salary, monthsWorked },
        },
      },
      include: { salaried: true },
    });
  }

  async updateHourlyEmployee(
    id: string,
    name: string,
    hourlyRate: number,
    hoursWorked: number,
    telefono: string,
    email: string,
    especialidad: string,
    cedula: string,
    horario_inicio: string,
    horario_fin: string,
    duracion_cita: number,
    activo: boolean,
  ) {
    return this.prisma.employee.update({
      where: { id },
      data: {
        name,
        telefono,
        email,
        especialidad,
        cedula,
        horario_inicio,
        horario_fin,
        duracion_cita,
        activo,
        hourly: {
          update: { hourlyRate, hoursWorked },
        },
      },
      include: { hourly: true },
    });
  }

  async deleteEmployee(id: string) {
    // Step 1: Delete all related HourlyEmployee records
    await this.prisma.hourlyEmployee.deleteMany({
      where: { employeeId: id },
    });

    await this.prisma.salariedEmployee.deleteMany({
      where: { employeeId: id },
    });

    return this.prisma.employee.delete({
      where: { id },
    });
  }
}
