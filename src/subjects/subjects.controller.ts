import { Body, Controller, Delete, forwardRef, Get, HttpException, HttpStatus, Inject, Param, Patch, Post } from '@nestjs/common';
import { ScoreService } from '../score/score.service';
import { CreateSubjectDto, UpdateSubjectDto } from './dto/index';
import { SubjectsService } from './subjects.service';

@Controller('subjects')
export class SubjectsController {
    constructor(
        private readonly subjectsService: SubjectsService,

        @Inject(forwardRef(() => ScoreService))
        private readonly scoresService: ScoreService
    ) { }

    @Get()
    async index() {
        return await this.subjectsService.findAll();
    }

    @Get(':id')
    async find(@Param('id') id: string) {
        return await this.subjectsService.findOneById(id);
    }

    @Post()
    async create(@Body() create: CreateSubjectDto) {
        return await this.subjectsService.create(create);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() update: UpdateSubjectDto) {
        return await this.subjectsService.update(id, update);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        const subject = await this.subjectsService.findOneById(id);
        if (subject.scores.length) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: `Bad Request: Subject has scores!`,
            }, HttpStatus.BAD_REQUEST);
        }
        return await this.subjectsService.delete(id);
    }
}
