import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { students } from '../../students/schema/student.schema';
import { Class } from 'src/class/schema/class.schema';
export type scoreDocument = score & Document;

@Schema()
export class score {
    @Prop()
    id: string;

    @Prop()
    score: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'class' })
    class: Class;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'students' })
    students: students;
}

export const scoreSchema = SchemaFactory.createForClass(score);