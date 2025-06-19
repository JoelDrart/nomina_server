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
      telefono: string;
      email: string;
      especialidad: string;
      cedula: string;
      horario_inicio: string;
      horario_fin: string;
      duracion_cita: number;
      activo: boolean;
    },
  ) {
    try {
      const employee = await this.employeesService.createSalariedEmployee(
        body.id,
        body.name,
        body.salary,
        body.monthsWorked,
        body.telefono,
        body.email,
        body.especialidad,
        body.cedula,
        body.horario_inicio,
        body.horario_fin,
        body.duracion_cita,
        body.activo,
      );
      return { success: true, employee };
    } catch (error) {
      return {
        success: false,
        message: 'Error creating salaried employee',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
      telefono: string;
      email: string;
      especialidad: string;
      cedula: string;
      horario_inicio: string;
      horario_fin: string;
      duracion_cita: number;
      activo: boolean;
    },
  ) {
    try {
      const employee = await this.employeesService.createHourlyEmployee(
        body.id,
        body.name,
        body.hourlyRate,
        body.hoursWorked,
        body.telefono,
        body.email,
        body.especialidad,
        body.cedula,
        body.horario_inicio,
        body.horario_fin,
        body.duracion_cita,
        body.activo,
      );
      return { success: true, employee };
    } catch (error) {
      return {
        success: false,
        message: 'Error creating hourly employee',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
    @Body()
    body: {
      name: string;
      salary: number;
      monthsWorked: number;
      telefono: string;
      email: string;
      especialidad: string;
      cedula: string;
      horario_inicio: string;
      horario_fin: string;
      duracion_cita: number;
      activo: boolean;
    },
    @Param('id') id: string,
  ) {
    return this.employeesService.updateSalariedEmployee(
      id,
      body.name,
      body.salary,
      body.monthsWorked,
      body.telefono,
      body.email,
      body.especialidad,
      body.cedula,
      body.horario_inicio,
      body.horario_fin,
      body.duracion_cita,
      body.activo,
    );
  }

  @Put('hourly/:id')
  updateHourly(
    @Body()
    body: {
      name: string;
      hourlyRate: number;
      hoursWorked: number;
      telefono: string;
      email: string;
      especialidad: string;
      cedula: string;
      horario_inicio: string;
      horario_fin: string;
      duracion_cita: number;
      activo: boolean;
    },
    @Param('id') id: string,
  ) {
    return this.employeesService.updateHourlyEmployee(
      id,
      body.name,
      body.hourlyRate,
      body.hoursWorked,
      body.telefono,
      body.email,
      body.especialidad,
      body.cedula,
      body.horario_inicio,
      body.horario_fin,
      body.duracion_cita,
      body.activo,
    );
  }

  @Delete(':id')
  removeEmployee(@Param('id') id: string) {
    return this.employeesService.deleteEmployee(id);
  }
}
