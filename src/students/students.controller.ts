import { Controller, HttpException, HttpStatus, Param } from '@nestjs/common';
import {
    CreateStudentDto,
    DeleteStudentDto,
    UpdateStudentDto,
} from './dto';
import { StudentsService } from './students.service';
import { classService } from 'src/class/class.service';
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
        private readonly classService: classService

    ) { }

    @Post()
    async create(@Body() CreateStudentDto: CreateStudentDto) {
        const std = this.classService.findOne(CreateStudentDto.class);
        if (!std) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: `Bad Request: Student cannot found!`,
            }, HttpStatus.BAD_REQUEST);
        }
        return this.StudentsService.create(CreateStudentDto);


    }

    @Patch(':_id')
    async update(@Param('_id') id: string, @Body() updateClassDto: UpdateStudentDto) {
        const std = this.classService.findOne(updateClassDto.class);
        if (!std) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: `Bad Request: Student cannot found!`,
            }, HttpStatus.BAD_REQUEST);
        }
        return this.StudentsService.update(id, updateClassDto);
    }

    @Delete()
    async delete(@Body() deleteClassDto: DeleteStudentDto) {
        return this.StudentsService.delete(deleteClassDto);
    }

    @Get()
    async search() {
        return this.StudentsService.findAll();
    }

    @Get('/:_id')
    async all(@Param() _id: string) {
        return this.StudentsService.findOne(_id);
    }

}
