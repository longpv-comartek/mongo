import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SubjectSchema, Subject } from '../subject/schema/subject.schema'
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Subject.name, schema: SubjectSchema }]),
  ],
  providers: [SubjectService],
  exports: [SubjectService]

})

export class SubjectModule { }
