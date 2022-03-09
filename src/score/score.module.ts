import { SubjectModule } from './../subject/subject.module';
import { Module } from '@nestjs/common';
import { ScoreService } from './score.service';
import { ScoreController } from './score.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ScoreSchema, Score } from './schema/score.schema';
import { StudentsModule } from 'src/students/students.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Score.name, schema: ScoreSchema }]),
    StudentsModule,
    SubjectModule
  ],
  providers: [ScoreService],
  controllers: [ScoreController]
})
export class ScoreModule { }
