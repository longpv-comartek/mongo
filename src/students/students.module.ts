import { forwardRef, Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { studentsSchema, students } from './schema/student.schema';
import { ClassModule } from 'src/class/class.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: students.name, schema: studentsSchema }]),
    ClassModule],
  providers: [StudentsService],
  controllers: [StudentsController],
  exports: [StudentsService]
})
export class StudentsModule { }
