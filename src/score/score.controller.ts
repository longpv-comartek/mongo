import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import {
    CreateScoreDto,
    DeleteScoreDto,
    UpdateScoreDto,
} from './dto';

import { ScoreService } from './score.service';
import { StudentsService } from 'src/students/students.service';
import { SubjectService } from 'src/subject/subject.service';

@Controller('score')
export class ScoreController {

    constructor(
        private readonly ScoreService: ScoreService,
        private readonly StudentsService: StudentsService,
        private readonly SubjectService: SubjectService

    ) { }

    @Post()
    async create(@Body() id_std: string, id_sub: string, createClassDto: CreateScoreDto) {
        const std_score = this.StudentsService.findOne(id_std)
        const std_subject = this.SubjectService.findOne(id_sub)
        if (!std_score || !std_subject) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: `Bad Request: Score cannot found!`,
            }, HttpStatus.BAD_REQUEST);
        }
        return this.ScoreService.create(createClassDto);
    }

    @Patch()
    async update(@Body() id: string, updateClassDto: UpdateScoreDto) {
        const find_score = this.ScoreService.findOne(id)
        if (!find_score) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: `Bad Request: Score cannot found!`,
            }, HttpStatus.BAD_REQUEST);
        }
        return this.ScoreService.update(updateClassDto);
    }

    @Delete()
    async delete(@Body() id: string, deleteClassDto: DeleteScoreDto) {
        const find_score = this.ScoreService.findOne(id)
        if (!find_score) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: `Bad Request: Score cannot found!`,
            }, HttpStatus.BAD_REQUEST);
        }
        return this.ScoreService.delete(deleteClassDto);
    }

    @Get()
    async search() {
        return this.ScoreService.findAll();
    }

    @Get()
    async all(@Query() id: string) {
        return this.ScoreService.findOne(id);
    }
}
