//הקונטרולר של התלמידים ,

import { Body, Controller, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { StudentsService } from "./students.service";
// type אומר - 
// "הקובץ הזה צריך את הטיפוס רק בשביל לבדוק שגיאות בזמן הפיתוח (Build Time).
//  אל תנסה להפוך אותו לקוד JavaScript שנשאר בזמן הריצה (Runtime)."
import type { studentModel } from "./student.model"; 
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { ApiQuery } from "@nestjs/swagger";

@Controller() 
export class StudentsController
{
    constructor(private studentsService: StudentsService) {}

    @Get('students')
    getAllStudents() :studentModel[]
    {
        return this.studentsService.getAllStudents();
    }

    @Get('classes/:classId/students')

    @ApiQuery({ name: 'search', required: false, type: String })
    @ApiQuery({ name: 'status', required: false, type: String })
    getStudentsByClassIdAndFilter(

        @Param('classId') classId:string , 
        @Query('search') search?:string , 
        @Query('status') status?:string
    ) :studentModel[]
    {
        return this.studentsService.getStudentsByClassIdAndFilter(+classId , search , status);
    }

    @Post('students')
    createStudent(@Body() student: CreateStudentDto) :studentModel
    {
        return this.studentsService.createStudent(student);
    }

    @Patch('students/:id')
    updateStudent
    (@Param('id') id:string , @Body() studentForUpdate:UpdateStudentDto) 
    :studentModel | null
    {
        return this.studentsService.updateStudent(+id ,studentForUpdate);
    }


}