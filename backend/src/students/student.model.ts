
//פה אנחנו מגדירים איך תלמיד נראה במערכת שלנו
export interface studentModel
{
  id: number;              // מזהה ייחודי במערכת (מונפק אוטומטית)
  classId: number;         // מזהה כיתה (מספר)
  identityNumber: string;  // תעודת זהות
  firstName: string;       // שם פרטי
  lastName: string;        // שם משפחה
  parentPhone: string;     // טלפון הורה
  status: StudentStatus;   // סטטוס}

}
//פה נגדיר enums של פעיל או לא פעיל
export enum StudentStatus
{
    Active = 'Active', // תלמיד פעיל
    Inactive = 'Inactive' // תלמיד לא פעיל
}