import { Param } from '@nestjs/common';
import {
    Body,
    Controller,
    Delete,
    Get,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { classService } from './class.service';
import {
    CreateClassDto,
    DeleteClassDto,
    UpdateClassDto,
} from './dto';

@Controller('class')
export class ClassController {
    constructor(private readonly classService: classService) { }

    @Post()
    async create(@Body() createClassDto: CreateClassDto) {
        return this.classService.create(createClassDto);
    }

    @Patch()
    async update(@Body() { id, updateClassDto }) {
        return this.classService.update(id, updateClassDto);
    }

    @Delete()
    async delete(@Body() deleteClassDto: DeleteClassDto) {
        return this.classService.delete(deleteClassDto);
    }

    @Get('/:id')
    async all(@Param() id: string) {
        return this.classService.findOne(id);
    }

    @Get()
    async search() {
        return this.classService.findAll();
    }


}
