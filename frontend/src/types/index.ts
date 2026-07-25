export interface ClassModel {
  id: number;
  grade: string;
  classNumber: number;
  homeroomTeacher: string;
  studentsCount: number;
}

export interface CreateClassDto {
  grade: string;
  classNumber: number;
  homeroomTeacher: string;
}

export interface UpdateClassDto {
  grade?: string;
  classNumber?: number;
  homeroomTeacher?: string;
}

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