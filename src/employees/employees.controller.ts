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
  async createSalaried(
    @Body()
    body: {
      id?: string;
      name: string;
      salary: number;
      monthsWorked: number;
    },
  ) {
    try {
      const employee = await this.employeesService.createSalariedEmployee(
        body.id,
        body.name,
        body.salary,
        body.monthsWorked,
      );
      return { success: true, employee };
    } catch (error) {
      return {
        success: false,
        message: 'Error creating salaried employee',
        error,
      };
    }
  }

  @Post('hourly')
  async createHourly(
    @Body()
    body: {
      id?: string;
      name: string;
      hourlyRate: number;
      hoursWorked: number;
    },
  ) {
    try {
      const employee = await this.employeesService.createHourlyEmployee(
        body.id,
        body.name,
        body.hourlyRate,
        body.hoursWorked,
      );
      return { success: true, employee };
    } catch (error) {
      return {
        success: false,
        message: 'Error creating hourly employee',
        error,
      };
    }
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
