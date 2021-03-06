import { Type } from 'class-transformer';
import { score } from '../../score/schema/score.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Class } from '../../class/schema/class.schema';

export type studentsDocument = students & Document;

@Schema()
export class students {
    @Prop()
    id: string;

    @Prop()
    name: string;

    @Prop()
    dob: Date;

    @Prop(
        {
            enum: ['Male', 'Female', 'Other']
        })
    gender: 'Male' | 'Female' | 'Other';

    @Prop()
    email: string;

    @Prop(
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Class',
        }
    )
    @Type(() => Class)
    class: Class;


    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'score' }] })
    score: score[];
}

export const studentsSchema = SchemaFactory.createForClass(students);