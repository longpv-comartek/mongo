import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SubjectSchema, Subject } from '../subject/schema/subject.schema'
import { ScoreModule } from 'src/score/score.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Subject.name, schema: SubjectSchema }]),
    ScoreModule
  ],
  providers: [SubjectService],
  exports: [SubjectService]

})

export class SubjectModule { }
