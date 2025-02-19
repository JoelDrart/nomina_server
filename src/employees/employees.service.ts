import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmployeeType } from '@prisma/client';

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

  async updateSalariedEmployee(
    id: string,
    name: string,
    salary: number,
    monthsWorked: number,
  ) {
    return this.prisma.employee.update({
      where: { id },
      data: {
        name,
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
  ) {
    return this.prisma.employee.update({
      where: { id },
      data: {
        name,
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
