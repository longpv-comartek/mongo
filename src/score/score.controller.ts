import {
    Body,
    Controller,
    Delete,
    forwardRef,
    Get,
    HttpException,
    HttpStatus,
    Inject,
    Patch,
    Post,
    Param,
} from '@nestjs/common';
import {
    CreateScoreDto,
    DeleteScoreDto,
    UpdateScoreDto,
} from './dto';
import { SubjectsService } from '../subjects/subjects.service';
import { ScoreService } from './score.service';
import { StudentsService } from 'src/students/students.service';

@Controller('score')
export class ScoreController {

    constructor(
        private readonly ScoreService: ScoreService,
        private readonly StudentsService: StudentsService,
        @Inject(forwardRef(() => SubjectsService))
        private readonly subjectsService: SubjectsService,

    ) { }

    @Post()
    async create(@Body() createScoreDto: CreateScoreDto) {
        const std_score = this.StudentsService.findOne(createScoreDto.student);
        const subject = await this.subjectsService.findOneById(createScoreDto.subject);
        if (!std_score || !subject) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: `Bad Request: Score cannot found!`,
            }, HttpStatus.BAD_REQUEST);
        }
        return this.ScoreService.create(createScoreDto);
    }

    @Patch('/:id')
    async update(@Param('id') id: string, @Body() updateScoreDto: UpdateScoreDto) {
        const std_score = this.StudentsService.findOne(updateScoreDto.student)
        const subject = await this.subjectsService.findOneById(updateScoreDto.subject);

        if (!std_score || !subject) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: `Bad Request: Score cannot found!`,
            }, HttpStatus.BAD_REQUEST);
        }
        return this.ScoreService.update(id, updateScoreDto);
    }

    @Delete()
    async delete(@Body() deleteClassDto: DeleteScoreDto) {
        const find_score = this.ScoreService.findOne(deleteClassDto.id)
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

    @Get('/:id')
    async all(@Param() id: string) {
        return this.ScoreService.findOne(id);
    }
}
