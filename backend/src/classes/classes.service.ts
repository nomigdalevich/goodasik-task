import { Injectable, OnModuleInit } from "@nestjs/common";
import { classModel } from "./class.model";
import * as path from 'path';
import * as fs from 'fs';
import { CreateClassDto } from "./dto/create-class.dto";
import { UpdateClassDto } from "./dto/update-class.dto";

@Injectable() 
export class ClassesService implements OnModuleInit 
{
    private classes: classModel[] = []; 

    onModuleInit()
    {
            this.loadClasses(); 
    }

    private loadClasses() 
    {
        try
        {
            const filePath = path.join(process.cwd(), 'data', 'classes.json');
            const fileData = fs.readFileSync(filePath, 'utf-8');
            this.classes = JSON.parse(fileData);
        }

        catch (error) 
        {
            console.error('שגיאה בטעינת קובץ הכיתות:', error);     
            this.classes = []; 
        }
    }

    getAllClasses(): classModel[] 
    {
    return this.classes;
    }

    createClass(classDto : CreateClassDto) :classModel
    {
        const newClass: classModel = {
            id: this.classes.length > 0 ? Math.max(...this.classes.map(c => c.id)) + 1 : 1 ,
            ...classDto ,
            studentsCount: 0 ,
        };

        this.classes.push(newClass);
        return newClass;
    }

    updateClass(id:number , classForUpdate :UpdateClassDto) :classModel | null
    {
        const index = this.classes.findIndex((c) => c.id === id);
        if(index!=-1)
        {

            const cleanData = Object.fromEntries(
            Object.entries(classForUpdate).filter(([_, value]) => value !== undefined)
        );

            this.classes[index] = {...this.classes[index] , ...cleanData};
            return this.classes[index];
        }

        return null;
    }




    
}