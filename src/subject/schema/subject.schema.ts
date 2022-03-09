import { Score } from './../../score/schema/score.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

export type SubjectDocument = Subject & Document;

@Schema()
export class Subject {
    @Prop()
    id: string;

    @Prop()
    name: number;

    @Prop(
        {
            enum: ['Online', 'Offline']
        })
    type: 'Online' | 'Offline';

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'score' })
    class: Score;

}

export const SubjectSchema = SchemaFactory.createForClass(Subject);