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
import { ClassService } from './class.service';
import {
    CreateClassDto,
    DeleteClassDto,
    UpdateClassDto,
} from './dto';

@Controller('class')
export class ClassController {
    constructor(private readonly ClassService: ClassService) { }

    @Post()
    async create(@Body() createClassDto: CreateClassDto) {
        return this.ClassService.create(createClassDto);
    }

    @Patch()
    async update(@Body() updateClassDto: UpdateClassDto) {
        return this.ClassService.update(updateClassDto);
    }

    @Delete()
    async delete(@Body() deleteClassDto: DeleteClassDto) {
        return this.ClassService.delete(deleteClassDto);
    }

    @Get('/:id')
    async all(@Param() id: string) {
        return this.ClassService.findOne(id);
    }

    @Get()
    async search() {
        return this.ClassService.findAll();
    }


}
