import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSubjectDto, UpdateSubjectDto } from './dto';
import { Subject, SubjectDocument } from './schemas/subject.schema';

@Injectable()
export class SubjectsService {
    constructor(
        @InjectModel(Subject.name)
        private readonly subjectModel: Model<SubjectDocument>
    ) { }

    async findAll(): Promise<Subject[]> {
        return await this.subjectModel.find().exec();
    }

    async findOneById(id: string): Promise<Subject> {
        return await this.subjectModel.findById(id).exec();
    }

    async create(create: CreateSubjectDto): Promise<Subject> {
        return await new this.subjectModel(create).save();
    }

    async update(id: string, update: UpdateSubjectDto): Promise<Subject> {
        return await this.subjectModel.findByIdAndUpdate(id, update).exec();
    }

    async delete(id: string): Promise<Subject> {
        return await this.subjectModel.findByIdAndDelete(id).exec();
    }
}
