import { SubjectService } from './subject.service';
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
    CreateSubjectDto,
    DeleteSubjectDto,
    UpdateSubjectDto,
} from './dto';
import { ScoreService } from '../score/score.service'

@Controller('subject')

export class SubjectController {

    constructor(
        private readonly SubjectService: SubjectService,
        private readonly ScoreService: ScoreService) { }

    @Post()
    async create(@Body() id: string, createClassDto: CreateSubjectDto) {
        const score = this.ScoreService.findOne(id);
        if (!score) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: `Bad Request: subject cannot found!`,
            }, HttpStatus.BAD_REQUEST);
        }
        return this.SubjectService.create(createClassDto);
    }

    @Patch()
    async update(@Body() id: string, updateClassDto: UpdateSubjectDto) {
        const score = this.ScoreService.findOne(id);
        if (!score) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: `Bad Request: subject cannot found!`,
            }, HttpStatus.BAD_REQUEST);
        }
        return this.SubjectService.update(updateClassDto);
    }

    @Delete()
    async delete(@Body() id: string, deleteClassDto: DeleteSubjectDto) {
        const score = this.ScoreService.findOne(id);
        if (!score) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: `Bad Request: subject cannot found!`,
            }, HttpStatus.BAD_REQUEST);
        }
        return this.SubjectService.delete(deleteClassDto);
    }

    @Get()
    async all(@Query() id: string) {
        return this.SubjectService.findOne(id);
    }

    @Get()
    async search() {
        return this.SubjectService.findAll();
    }

}
