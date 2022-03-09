import { Controller, HttpException, HttpStatus } from '@nestjs/common';
import {
    CreateStudentDto,
    DeleteStudentDto,
    UpdateStudentDto,
} from './dto';
import { StudentsService } from './students.service';
import { ClassService } from 'src/class/class.service';
import {
    Body,
    Delete,
    Get,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
@Controller('students')
export class StudentsController {
    constructor(
        private readonly StudentsService: StudentsService,
        private readonly ClassService: ClassService

    ) { }

    @Post()
    async create(@Body() id, CreateStudentDto: CreateStudentDto) {
        const std = this.ClassService.findOne(id);
        if (!std) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: `Bad Request: Student cannot found!`,
            }, HttpStatus.BAD_REQUEST);
        }
        return this.StudentsService.create(CreateStudentDto);


    }

    @Patch()
    async update(@Body() id: string, updateClassDto: UpdateStudentDto) {
        const std = this.StudentsService.findOne(id);
        if (!std) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: `Bad Request: Student cannot found!`,
            }, HttpStatus.BAD_REQUEST);
        }
        return this.StudentsService.update(updateClassDto);
    }

    @Delete()
    async delete(@Body() id, deleteClassDto: DeleteStudentDto) {
        const std = this.StudentsService.findOne(id);
        if (!std) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: `Bad Request: Student cannot found!`,
            }, HttpStatus.BAD_REQUEST);
        }
        return this.StudentsService.delete(deleteClassDto);
    }

    @Get()
    async all(@Query() _id: string) {
        return this.StudentsService.findOne(_id);
    }

    @Get()
    async search() {
        return this.StudentsService.findAll();
    }
}
