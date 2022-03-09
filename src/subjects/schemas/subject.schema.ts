import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform, Type } from 'class-transformer';
import mongoose from 'mongoose';
import { score } from '../../score/schema/score.schema';

export type SubjectDocument = Subject & Document;

@Schema()
export class Subject {
    @Transform(({ value }) => value.toString())
    _id: mongoose.ObjectId;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    type: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Score' }] })
    scores: score[];
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);