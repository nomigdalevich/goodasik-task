import { Injectable, OnModuleInit } from "@nestjs/common";
import { studentModel } from "./student.model";
import * as path from 'path';
import * as fs from 'fs';
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { ClassesService } from "../classes/classes.service";



@Injectable()

export class StudentsService implements OnModuleInit {
    constructor(private classesService: ClassesService) { }

    private students: studentModel[] = [];

    onModuleInit() {
        this.loadStudents();
    }

    private loadStudents() {
        try {
            const filePath = path.join(process.cwd(), 'data', 'students.json');
            const fileData = fs.readFileSync(filePath, 'utf-8');
            this.students = JSON.parse(fileData);
        }

        catch (error) {
            console.error('שגיאה בטעינת קובץ התלמידים:', error);
            this.students = [];
        }
    }

    getAllStudents(): studentModel[] {
        return this.students;
    }

    getStudentsByClassIdAndFilter(classId: number, search?: string, status?: string): studentModel[] {

        let result = this.students.filter((s) => s.classId === classId);

        if (search) {
            const text = search.toLowerCase().trim();

            result = result.filter((s) =>
                s.firstName.toLocaleLowerCase().includes(text) ||
                s.lastName.toLocaleLowerCase().includes(text) ||
                s.identityNumber.includes(text)
            );
        }

        if (status) {
            result = result.filter((s) => s.status === status);
        }

        return result;
    }

    createStudent(student: CreateStudentDto): studentModel {
        const newStudent: studentModel =
        {
            ...student,
            id: this.students.length + 1,
        };

        this.students.push(newStudent);
        const classObj = this.classesService.getAllClasses().find(c => c.id === student.classId);
        if (classObj) classObj.studentsCount++;

        return newStudent;
    }


    updateStudent(id: number, updatedData: UpdateStudentDto): studentModel | null {
        const index = this.students.findIndex((s) => s.id === id);
        if (index !== -1) {


            const cleanData = Object.fromEntries(
                Object.entries(updatedData).filter(([_, value]) => value !== undefined)
            );

            this.students[index] = { ...this.students[index], ...cleanData };


            return this.students[index];
        }

        return null;
    }


}
