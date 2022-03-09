import { Injectable } from '@nestjs/common';
import { Score, scoreDocument } from './schema/score.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
    CreateScoreDto,
    DeleteScoreDto,
    UpdateScoreDto,
} from './dto';

@Injectable()
export class ScoreService {
    constructor(
        @InjectModel(Score.name) private readonly model: Model<scoreDocument>,
    ) { }

    async create(createTodoDto: CreateScoreDto) {
        return await new this.model({
            ...createTodoDto,
        }).save();
    }

    async update({ id, ...classProps }: UpdateScoreDto) {
        return this.model.findByIdAndUpdate(id, classProps).exec();
    }

    async delete({ id }: DeleteScoreDto) {
        return this.model.findByIdAndDelete(id).exec();
    }

    async findAll() {
        const all = await this.model.find().exec();
        console.log(all);

    }

    async findOne(id: string) {
        return await this.model.findById(id).exec();
    }
}
