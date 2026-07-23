import { Injectable, OnModuleInit } from "@nestjs/common";
import { classModel } from "./class.model";
import * as path from 'path';
import * as fs from 'fs';
import { CreateClassDto } from "./dto/create-class.dto";
import { UpdateClassDto } from "./dto/update-class.dto";

//הסרוויס - מבצע את הלוגיקה העסקית
@Injectable() //הסבר שהמחלקה הזו היא Injectable, כלומר ניתן להזריק אותה למחלקות אחרות באמצעות Dependency Injection של NestJS
export class ClassesService implements OnModuleInit //ממשק שמאפשר לבצע פעולות כאשר המודול נטען
{
    //מה שקורה זה שברגע שהשרת עולה
    //OnModuleInit מופעל פעם אחת בלבד
    //הוא קורא את הנתונים מתוך קובץ JSON 
    //ומכניס אותם למערך של כיתות this.classes
    //המערך הזה נשמר בזיכרון RAM של השרת ומוכן לשימוש מהיר

    //נגדיר את המערך של הכיתות שלתוכו ישמרו הנתונים מה JSON
    private classes: classModel[] = []; //מערך של כיתות 

    //עכשיו נגדיר את הפונקציה onModuleInit זה פונקציה שמי שיורש את הממשק OnModuleInit חייב לממש אותה
    //מה זה בעצם הפונקציה הזאת ?
    //זה פונקציה שקוראת ברגע שהשרת סיים לעלות
    onModuleInit()
    {
            //מה אמור להיות בתוך הפונקציה ?
            //היא מפעילה את this.loadClasses();
            this.loadClasses(); //התפקיד של הפונ הזאת זה לקרוא את הנתונים מתוך קובץ הJSON ולשים אותם במערך של הכיתות
    }

    private loadClasses() //פונקציה שמטענת את הנתונים מה JSON למערך של הכיתות
    {
        //נשתמש בtry/catch כדי לטפל בשגיאות
        try
        {
            const filePath = path.join(process.cwd(), 'data', 'classes.json');//יוצר את הנתיב לקובץ JSON
            const fileData = fs.readFileSync(filePath, 'utf-8');//קורא את התוכן שבקובץ JSON וממיר למחרוזת
            this.classes = JSON.parse(fileData);//ממיר את המחרוזת לאוביקטים ושומר במערך של הכיתות שהגדרנו
        }

        catch (error) //במקרה של שגיאה כלשהי
        {
            console.error('שגיאה בטעינת קובץ הכיתות:', error);//נשלח שגיאה לקונסול      
            this.classes = []; //אם יש שגיאה נטען מערך ריק
        }
    }

    //פונקציה שמחזירה את כל הכיתות במערך
    getAllClasses(): classModel[] 
    {
    return this.classes;
    }

    //הוספת כיתה חדשה
    createClass(classDto : CreateClassDto) :classModel
    {
        const newClass: classModel = {
            id: this.classes.length > 0 ? Math.max(...this.classes.map(c => c.id)) + 1 : 1 ,
            ...classDto ,
            studentsCount: 0 ,//כיתה חדשה מתחילה עם אפס תלמידים
        };

        this.classes.push(newClass);
        return newClass;
    }

    //עריכת כיתה קיימת
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

        //אם לא נמצא
        return null;
    }




    
}