import { Injectable } from '@nestjs/common';
import { score, scoreDocument } from './schema/score.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
    CreateScoreDto,
    DeleteScoreDto,
    UpdateScoreDto,
} from './dto';
import { StudentsService } from '../students/students.service';
import { SubjectsService } from '../subjects/subjects.service';
@Injectable()
export class ScoreService {
    constructor(
        @InjectModel(score.name) private readonly model: Model<scoreDocument>,
        private StudentsService: StudentsService,
        private SubjectsService: SubjectsService

    ) { }

    async create(createTodoDto: CreateScoreDto) {
        const result = await new this.model(createTodoDto).save();
        const student = await this.StudentsService.findOne(createTodoDto.student);
        console.log(student, result);
        const subject = await this.SubjectsService.findOneById(createTodoDto.subject);
        await this.StudentsService.update(createTodoDto.student, { score: [...student.score, result] });
        await this.SubjectsService.update(createTodoDto.subject, { scores: [...subject.scores, result] });
        return result;
    }

    async update(id, classProps: UpdateScoreDto) {
        return this.model.findByIdAndUpdate(id, classProps).exec();
    }

    async delete({ id }: DeleteScoreDto) {
        return this.model.findByIdAndDelete(id).exec();
    }

    async findAll() {
        return await this.model.find().exec();
    }

    async findOne(id: string) {
        return await this.model.findById(id).populate('score').exec();
    }
}
