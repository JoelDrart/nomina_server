import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Employee, EmployeeType } from '@prisma/client';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}

  async createSalariedEmployee(
    name: string,
    salary: number,
    monthsWorked: number,
  ) {
    return this.prisma.employee.create({
      data: {
        name,
        type: EmployeeType.ASALARIADO,
        salaried: {
          create: { salary, monthsWorked },
        },
      },
      include: { salaried: true },
    });
  }

  async createHourlyEmployee(
    name: string,
    hourlyRate: number,
    hoursWorked: number,
  ) {
    return this.prisma.employee.create({
      data: {
        name,
        type: EmployeeType.POR_HORAS,
        hourly: {
          create: { hourlyRate, hoursWorked },
        },
      },
      include: { hourly: true },
    });
  }

  async getAllEmployees() {
    return this.prisma.employee.findMany({
      include: { salaried: true, hourly: true },
    });
  }
}
