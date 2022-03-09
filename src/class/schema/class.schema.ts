import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { students } from '../../students/schema/student.schema';
export type classtDocument = Class & Document;

@Schema()
export class Class {
    @Prop()
    id: string;

    @Prop()
    name: string;

    @Prop()
    teacherName: string;

    @Prop()
    totalMember: number;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'students' }] })
    students: students[];
}

export const classSchema = SchemaFactory.createForClass(Class);