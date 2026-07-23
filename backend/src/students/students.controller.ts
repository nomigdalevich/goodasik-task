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

//  הוא אחראי על הבקשות שמגיעות מהלקוח והוא מעביר אותם לסרוויס
//Decorator שמגדיר את המחלקה כקונטרולר
@Controller() 
export class StudentsController
{
    //בנאי 
    //מזריקים את הסרוויס של תלמידים למחלקה הזו כדי שנוכל להשתמש בו
    constructor(private studentsService: StudentsService) {}

    //שליפת כל התלמידים
    @Get('students')
    getAllStudents() :studentModel[]
    {
        return this.studentsService.getAllStudents();
    }

    //שליפה של התלמידים לפי כיתה + לפי סינון
    @Get('classes/:classId/students')
    //     הסיבה שהכוכבית עדיין מופיעה היא ש-Swagger (דרך @nestjs/swagger) לא קורא אוטומטית 
    // את סימן השאלה של 
    // TypeScript (?) בזמן הריצה (Runtime), מכיוון ש-TypeScript מוחק את הטיפוסים ואת הסימנים 
    // הללו בזמן
    //  הקומפילציה ל-JavaScript.
    // כדי ש-Swagger יבין שהפרמטרים אינם חובה ויסיר 
    // את הכוכבית האדומה, חייבים להוסיף את ה-Decorators של 
    // @ApiQuery מעל הפונקציה ולהגדיר בהם מפורשות required: false.

    @ApiQuery({ name: 'search', required: false, type: String })
    @ApiQuery({ name: 'status', required: false, type: String })
    getStudentsByClassIdAndFilter(
        //הפרמטרים שהפונקציה מקבלת
        //@Param - מוציא משתנים מתוך הURL
        //@Query - מוציא פרמטרים בסוף הURL (כאלה שאחרי הסימן שאלה ?search=כהן&status=active)
        @Param('classId') classId:string , 
        @Query('search') search?:string , 
        @Query('status') status?:string
    ) :studentModel[]
    {
        return this.studentsService.getStudentsByClassIdAndFilter(+classId , search , status);
    }

    //הוספת תלמיד חדש
    @Post('students')
    createStudent(@Body() student: CreateStudentDto) :studentModel
    {
        return this.studentsService.createStudent(student);
    }

    //עריכת תלמיד קיים 
    @Patch('students/:id')
    updateStudent
    (@Param('id') id:string , @Body() studentForUpdate:UpdateStudentDto) 
    :studentModel | null
    {
        return this.studentsService.updateStudent(+id ,studentForUpdate);
    }


}