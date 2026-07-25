import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { ClassesService } from "./classes.service";
import type { classModel } from "./class.model";
import { CreateClassDto } from "./dto/create-class.dto";
import { UpdateClassDto } from "./dto/update-class.dto";

@Controller('classes')
export class ClassesController
{
    constructor(private classesService: ClassesService) {}

    @Get()
    getAllClasses() :classModel[]
    {
        return this.classesService.getAllClasses();
    }

    @Post()
    createClass(@Body() newClass :CreateClassDto) :classModel 
    {
       return this.classesService.createClass(newClass);
    }

    @Patch(':id')
    updateClass(@Param('id') id: string ,@Body() classForUpdate :UpdateClassDto) :classModel | null
    {
        return this.classesService.updateClass(+id , classForUpdate);
    }


}