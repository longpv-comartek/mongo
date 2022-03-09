import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
    CreateSubjectDto,
    DeleteSubjectDto,
    UpdateSubjectDto,
} from './dto';
import { Model } from 'mongoose';
import { Subject, SubjectDocument } from './schema/subject.schema';
@Injectable()
export class SubjectService {
    constructor(
        @InjectModel(Subject.name) private readonly model: Model<SubjectDocument>,
    ) { }

    async create({ ...createTodoDto }: CreateSubjectDto) {
        return await new this.model(
            {
                ...createTodoDto,
            }
        ).save();
    }

    async update({ id, ...classProps }: UpdateSubjectDto) {
        return this.model.findByIdAndUpdate(id, classProps).exec();
    }

    async delete({ id }: DeleteSubjectDto) {
        return this.model.findByIdAndDelete(id).exec();
    }

    async findAll() {
        return await this.model.find().populate("class");
    }

    async findOne(id: string) {
        return await this.model.findById(id).exec();
    }
}

