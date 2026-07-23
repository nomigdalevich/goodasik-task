// 1. מה הקובץ הזה?
// זהו קובץ הגדרות הטיפוסים (Typescript Interfaces) של ה-Frontend.

// 2. מה התפקיד שלו?
// התפקיד שלו הוא להגדיר ל-TypeScript איך מדויק נראים כל האובייקטים והנתונים באפליקציה שלנו.

// הוא מבטיח שלא נעשה טעויות בשמות של שדות (למשל, שלא נכתוב בטעות first_name במקום firstName).

// הוא דואג שלא נשתמש בשום מקום ב-any (שזה תנאי סף איכותי חשוב במשימה).

// הוא מגדיר את המבנה של:

// כיתה (ClassModel) – הנתונים שמגיעים משרת ה-NestJS על כיתה.

// תלמיד (StudentModel) – הנתונים שמגיעים על תלמיד.

// הוספת תלמיד (CreateStudentDto) – איזה שדות צריך לשלוח לשרת כשיוצרים תלמיד חדש.

// עדכון תלמיד (UpdateStudentDto) – איזה שדות אופציונליים שולחים ב-PATCH בעדכון תלמיד.

// פרמטרים לחיפוש (StudentQueryParams) – השדות של הסינון (קוד כיתה, חיפוש טקסטואלי, סטטוס).

// 1. מודל כיתה - תואם למה שחוזר מה-Backend
export interface ClassModel {
  id: number;
  grade: string;
  classNumber: number;
  homeroomTeacher: string;
  studentsCount: number;
}

// 2. הנתונים הנדרשים ביצירת כיתה חדשה (POST)
export interface CreateClassDto {
  grade: string;
  classNumber: number;
  homeroomTeacher: string;
}

// 3. הנתונים הנדרשים בעדכון כיתה (PATCH - שדות אופציונליים)
export interface UpdateClassDto {
  grade?: string;
  classNumber?: number;
  homeroomTeacher?: string;
}

// 4. מודל תלמיד - תואם למה שחוזר מה-Backend
export interface StudentModel {
  id: number;
  classId: number;
  identityNumber: string;
  firstName: string;
  lastName: string;
  parentPhone: string;
  status: 'ACTIVE' | 'INACTIVE' | string;
}

// 5. הנתונים הנדרשים ביצירת תלמיד חדש (POST)
export interface CreateStudentDto {
  classId: number;
  identityNumber: string;
  firstName: string;
  lastName: string;
  parentPhone: string;
  status?: string;
}

// 6. הנתונים הנדרשים בעדכון תלמיד (PATCH - כל השדות אופציונליים)
export interface UpdateStudentDto {
  firstName?: string;
  lastName?: string;
  parentPhone?: string;
  status?: string;
}

// 7. פרמטרי הסינון והחיפוש בשביל שליפת תלמידים
export interface StudentQueryParams {
  classId: number;
  search?: string;
  status?: string;
}