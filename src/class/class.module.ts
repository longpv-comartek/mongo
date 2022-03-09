import { Module } from '@nestjs/common';
import { classService } from './class.service';
import { ClassController } from './class.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Class, classSchema } from './schema/class.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Class.name, schema: classSchema }])],
  providers: [classService],
  controllers: [ClassController],
  exports: [classService]
})
export class ClassModule { }
