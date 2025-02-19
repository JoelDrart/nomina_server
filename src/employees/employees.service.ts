import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmployeeType } from '@prisma/client';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}
  async createSalariedEmployee(
    id: string | undefined,
    name: string,
    salary: number,
    monthsWorked: number,
  ) {
    try {
      return await this.prisma.employee.create({
        data: {
          id: id ?? undefined, // Si hay un id, lo usa; si no, Prisma generará uno automáticamente
          name,
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
  ) {
    try {
      return await this.prisma.employee.create({
        data: {
          id: id ?? undefined,
          name,
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
