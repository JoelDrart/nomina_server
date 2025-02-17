import { Controller, Get, Post, Body } from '@nestjs/common';
import { EmployeesService } from './employees.service';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post('salaried')
  createSalaried(
    @Body() body: { name: string; salary: number; monthsWorked: number },
  ) {
    return this.employeesService.createSalariedEmployee(
      body.name,
      body.salary,
      body.monthsWorked,
    );
  }

  @Post('hourly')
  createHourly(
    @Body() body: { name: string; hourlyRate: number; hoursWorked: number },
  ) {
    return this.employeesService.createHourlyEmployee(
      body.name,
      body.hourlyRate,
      body.hoursWorked,
    );
  }

  @Get()
  getAll() {
    return this.employeesService.getAllEmployees();
  }
}
