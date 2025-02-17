import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

import { PrismaService } from './prisma/prisma.service';
import { EmployeesModule } from './employees/employees.module';

@Module({
  imports: [EmployeesModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
