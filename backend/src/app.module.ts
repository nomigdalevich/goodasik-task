import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsController } from './students/students.controller';
import { ClassesController } from './classes/ClassesController';
import { StudentsService } from './students/students.service';
import { ClassesService } from './classes/classes.service';

@Module({
  imports: [],
  controllers: [AppController, StudentsController, ClassesController],
  providers: [AppService, StudentsService, ClassesService],
})
export class AppModule {}
