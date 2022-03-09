import { Class } from 'src/class/schema/class.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
    CreateStudentDto,
    DeleteStudentDto,
    UpdateStudentDto,
} from './dto';
import { Model } from 'mongoose';
import { students, studentsDocument } from './schema/student.schema';
@Injectable()
export class StudentsService {
    constructor(
        @InjectModel(students.name) private readonly model: Model<studentsDocument>,
    ) { }

    async create({ ...createTodoDto }: CreateStudentDto) {
        return await new this.model(
            {
                ...createTodoDto,
            }
        ).save();
    }

    async update({ id, ...classProps }: UpdateStudentDto) {
        return this.model.findByIdAndUpdate(id, classProps).exec();
    }

    async delete({ id }: DeleteStudentDto) {
        return this.model.findByIdAndDelete(id).exec();
    }

    async findAll() {
        return await this.model.find().populate("class");
    }

    async findOne(_id: string) {
        return await this.model.findById(_id).exec();
    }
}

