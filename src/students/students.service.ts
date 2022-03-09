import { classService } from 'src/class/class.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
    CreateStudentDto,
    DeleteStudentDto,
    UpdateStudentDto,
} from './dto';
import { Model } from 'mongoose';
import { students, studentsDocument } from './schema/student.schema';
@Injectable()
export class StudentsService {
    constructor(@InjectModel(students.name)
    private readonly model: Model<studentsDocument>,
        private readonly classService: classService,
    ) { }

    async create(createTodoDto: CreateStudentDto) {
        const student = await new this.model(createTodoDto).save();
        const _class = await this.classService.findOne(createTodoDto.class);
        await this.classService.update(
            createTodoDto.class,
            {
                totalMember: ++_class.totalMember,
                students: [..._class.students, student]
            });
        return student;
    }

    async update(id: string, update: UpdateStudentDto): Promise<students> {
        //Nếu student thay lớp thì phải cập nhập ở danh sánh class.
        if (update.class) {
            const oldStudent = await this.model.findById(id).populate('class').exec();
            const oldClass = oldStudent.class;
            const newClass = await this.classService.findOne(update.class);
            const arrStudentInOldClass = oldClass.students as students[];
            const index = arrStudentInOldClass.indexOf(oldStudent);

            //Cập nhập class cũ
            arrStudentInOldClass.splice(index, 1);
            await this.classService.update((oldClass),
                {
                    totalMember: --oldClass.totalMember,
                    students: arrStudentInOldClass
                })

            //Cập nhập class mới và student
            const newStudent = await this.model.findByIdAndUpdate(id, update).exec();
            await this.classService.update(update.class, {
                totalMember: ++newClass.totalMember,
                students: [...newClass.students, newStudent]
            });
            return newStudent;
        }
        return await this.model.findByIdAndUpdate(id, update).exec()

    }

    async delete({ id }: DeleteStudentDto) {
        const student = await this.model.findById(id).populate('class').exec();
        const _class = student.class;
        const arrStudent = _class.students as students[];
        const index = arrStudent.indexOf(student);
        arrStudent.splice(index, 1);
        await this.classService.update((_class), {
            totalMember: --_class.totalMember,
            students: arrStudent
        });
        return await this.model.findByIdAndDelete(id).exec();
    }

    async findAll() {
        return await this.model.find().populate("class");
    }

    async findOne(_id: string) {
        return await this.model.findById(_id).populate("score").exec();
    }
}

