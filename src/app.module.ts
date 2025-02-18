import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

import { PrismaService } from './prisma/prisma.service';
import { EmployeesModule } from './employees/employees.module';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [EmployeesModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // Aplica el middleware a todas las rutas
  }
}
