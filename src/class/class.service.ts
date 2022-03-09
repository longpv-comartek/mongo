import { Injectable } from '@nestjs/common';
import { Class, classtDocument } from './schema/class.schema';
import { InjectModel } from '@nestjs/mongoose';
import {
    CreateClassDto,
    DeleteClassDto,
    UpdateClassDto,
} from './dto';
import { Model } from 'mongoose';

@Injectable()
export class classService {
    constructor(
        @InjectModel(Class.name) private readonly model: Model<classtDocument>,
    ) { }

    async create(createTodoDto: CreateClassDto) {
        return await new this.model({
            ...createTodoDto,
        }).save();
    }

    async update(id, classProps) {
        return await this.model.findByIdAndUpdate(id, classProps).exec();
    }

    async delete({ id }: DeleteClassDto) {
        return this.model.findByIdAndDelete(id).exec();
    }

    async findOne(_id: string) {
        return await this.model.findById(_id).populate('students').exec();
    }

    async findAll() {
        return await this.model.find().populate('students').exec();
    }
}
