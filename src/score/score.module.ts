import { SubjectsModule } from '../subjects/subjects.module';
import { forwardRef, Module } from '@nestjs/common';
import { ScoreService } from './score.service';
import { ScoreController } from './score.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { scoreSchema, score } from './schema/score.schema';
import { StudentsModule } from 'src/students/students.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: score.name, schema: scoreSchema }]),
    forwardRef(() => StudentsModule),
    forwardRef(() => SubjectsModule)
  ],
  providers: [ScoreService],
  controllers: [ScoreController],
  exports: [ScoreService]
})
export class ScoreModule { }
