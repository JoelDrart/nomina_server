import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { PrismaService } from '../prisma/prisma.service';
import { EmployeesController } from './employees.controller';

@Module({
  providers: [EmployeesService, PrismaService],
  controllers: [EmployeesController],
})
export class EmployeesModule {}
