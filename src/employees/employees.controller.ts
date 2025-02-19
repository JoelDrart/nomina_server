import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
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

  @Put('salaried/:id')
  updateSalaried(
    @Body() body: { name: string; salary: number; monthsWorked: number },
    @Param('id') id: string,
  ) {
    return this.employeesService.updateSalariedEmployee(
      id,
      body.name,
      body.salary,
      body.monthsWorked,
    );
  }

  @Put('hourly/:id')
  updateHourly(
    @Body() body: { name: string; hourlyRate: number; hoursWorked: number },
    @Param('id') id: string,
  ) {
    return this.employeesService.updateHourlyEmployee(
      id,
      body.name,
      body.hourlyRate,
      body.hoursWorked,
    );
  }

  @Delete(':id')
  removeEmployee(@Param('id') id: string) {
    return this.employeesService.deleteEmployee(id);
  }
}
