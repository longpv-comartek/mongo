import { ClassModule } from './class/class.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentsModule } from './students/students.module';
import { ScoreModule } from './score/score.module';
import { SubjectController } from './subject/subject.controller';
import { SubjectModule } from './subject/subject.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://long:long123@cluster0.6l92v.mongodb.net/quanlihocsinh?retryWrites=true&w=majority'),
    StudentsModule,
    ClassModule,
    ScoreModule,
    SubjectModule
  ],
  controllers: [AppController, SubjectController],
  providers: [AppService],
})
export class AppModule { }
