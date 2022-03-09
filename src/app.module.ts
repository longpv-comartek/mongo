import { SubjectsModule } from './subjects/subjects.module';
import { ClassModule } from './class/class.module';
import { forwardRef, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentsModule } from './students/students.module';
import { ScoreModule } from './score/score.module';

@Module({
  imports: [
    forwardRef(() => SubjectsModule),
    MongooseModule.forRoot('mongodb+srv://long:long123@cluster0.6l92v.mongodb.net/quanlihocsinh?retryWrites=true&w=majority'),
    StudentsModule,
    ClassModule,
    ScoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
