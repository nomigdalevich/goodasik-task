import { Injectable, OnModuleInit } from "@nestjs/common";
import { studentModel } from "./student.model";
import * as path from 'path';
import * as fs from 'fs';
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";



//הסרוויס - מבצע את הלוגיקה העסקית

// ~~טעינת הנתונים מ-students.json~~ (כבר ביצענו)

// שליפת תלמידי כיתה ספציפית (עם חיפוש ופילטר): סינון לפי classId, חיפוש (שם/ת"ז), ופילטר status.

// שליפת כל התלמידים במערכת: פונקציה פשוטה שמחזירה את כל המערך students.

// הוספת תלמיד חדש (createStudent): הוספת אובייקט תלמיד חדש למערך.

// עדכון תלמיד קיים (updateStudent): עדכון פרטי תלמיד לפי id.

@Injectable() //הסבר שהמחלקה הזו היא Injectable, כלומר ניתן להזריק אותה למחלקות אחרות באמצעות Dependency Injection של NestJS

export class StudentsService implements OnModuleInit //ממשק שמאפשר לבצע פעולות כאשר המודול נטען  
{
    //לתוך המערך הזה נשים את הנתןנים שבקובץ JSON של התלמידים
    private students: studentModel[] = []; //מערך של תלמידים

    //מה שקורה זה שברגע שהשרת עולה
    onModuleInit() {
        this.loadStudents(); //התפקיד של הפונ הזאת זה לקרוא את הנתונים מתוך קובץ הJSON ולשים אותם במערך של התלמידים
    }

    //פונקציה שטוענת את הנתונים מהJSON למערך של התלמידים
    private loadStudents() {
        try {
            const filePath = path.join(process.cwd(), 'data', 'students.json'); //יוצר את הנתיב לקובץ JSON
            const fileData = fs.readFileSync(filePath, 'utf-8'); //קורא את התוכן שבקובץ JSON וממיר למחרוזת
            this.students = JSON.parse(fileData); //ממיר את המחרוזת לאוביקטים ושומר במערך של התלמידים שהגדרנו
        }

        catch (error) {
            console.error('שגיאה בטעינת קובץ התלמידים:', error); //נשלח שגיאה לקונסול
            this.students = []; //אם יש שגיאה נטען מערך ריק
        }
    }

    //פונקציה שמחזירה את כל התלמידים במערך
    getAllStudents(): studentModel[] {
        return this.students; //מחזירה את כל התלמידים במערך 
    }

    //פונקציה שמחזירה תלמיד לפי חיפוש
    //האופציות הם 
    //לפי תעודת זהות
    //לפי שם פרטי או שם משפחה
    //לפי סטטוס
    //אנחנו נגדיר שהשדה search הוא יכול להיות תעודת זהות או שם פרטי או שם משפחה
    //אנחנו נגדיר שהשדה status הוא יכול להיות Active או Inactive
    getStudentsByClassIdAndFilter(classId: number, search?: string, status?: string): studentModel[] {
        //קודם כל אנחנו מסננים מכל התלמידים את תלמידי הכיתה הספציפית
        //מתוך זה אנחנו נעשה סינון נוסף
        let result = this.students.filter((s) => s.classId === classId);

        //עכשיו אנחנו בודקים את השדה search אם הוא קיים
        //אם הוא קיים אנחנו מסננים את התלמידים לפי תעודת זהות או שם פרטי או שם משפחה
        if (search) {
            const text = search.toLowerCase().trim(); //ממיר את הטקסט לאותיות קטנות ומסיר רווחים מיותרים

            result = result.filter((s) =>
                s.firstName.toLocaleLowerCase().includes(text) || //בודק אם השם הפרטי מכיל את הטקסט
                s.lastName.toLocaleLowerCase().includes(text) || //בודק אם שם המשפחה מכיל את הטקסט
                s.identityNumber.includes(text) //בודק אם תעודת הזהות מכילה את הטקסט
            );
        }

        //אם המשתמש בחר סטטוס
        if (status) 
        {
            result = result.filter((s) => s.status === status); //מסנן את התלמידים לפי סטטוס
        }

        //מחזיר את רשימת התלמידים מסוננים
        return result;
    }

    // 4. הוספת תלמיד
    createStudent(student: CreateStudentDto): studentModel 
    {
        const newStudent: studentModel =
        {
            ...student,
            id: this.students.length+1, // השרת מנפיק מזהה רשום חדש       
        };

        this.students.push(newStudent);
        return newStudent; //החזרת התלמיד שנוסף
    }

  // 5. עדכון תלמיד

//   1. מה זה Partial<StudentModel>?
// Partial היא מילה שמורה ב-TypeScript שאומרת: "כל השדות של StudentModel, אבל כולם אופציונליים (לא חובה)".

// למה זה מעולה בעדכון?

// כשהמשתמש מעדכן תלמיד, הוא לא תמיד משנה את כל הפרטים (למשל, הוא רוצה לשנות רק את טלפון ההורה או רק את הסטטוס).

//Partial, בעדכון מותר לנו להעביר רק את השדות שבאמת השתנו, בלי להעביר מחדש את כל הפרטים.

// 2. איך הפונקציה עובדת שורה-אחר-שורה?
// findIndex — מחפשת במערך את ה-index (המיקום) של התלמיד לפי ה-id. אם היא לא מוצאת, היא מחזירה 1-.

// if (index !== -1) — בודקת: אם התלמיד נמצא במערך...

// { ...this.students[index], ...updatedData } — לוקחת את האובייקט הישן ודורסת בו רק את השדות החדשים שהגיעו ב-updatedData (בעזרת אופרטור ה-Spread ...).

// return this.students[index] — מחזירה את התלמיד המעודכן.

// return null — אם התלמיד לא נמצא, מחזירה null.

  updateStudent(id: number, updatedData: UpdateStudentDto): studentModel | null{
    const index = this.students.findIndex((s) => s.id === id);
    if (index !== -1) {

        console.log('לפני העדכון:', this.students[index]); // 👈 בדיקה 1

         // מסננים כל שדה שאינו מוגדר כדי להגן על הנתונים בזיכרון
         //הסבר לשורה הזאת נמצא בקובץ שפתחתי לזה
    const cleanData = Object.fromEntries(
      Object.entries(updatedData).filter(([_, value]) => value !== undefined)
    );

      this.students[index] = { ...this.students[index], ...cleanData };

      console.log('אחרי העדכון:', this.students[index]); // 👈 בדיקה 2

      return this.students[index];
    }

    return null;
  }

  
}
