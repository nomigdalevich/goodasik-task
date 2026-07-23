import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { 
  ClassModel, CreateClassDto, UpdateClassDto, CreateStudentDto, UpdateStudentDto, StudentModel, StudentQueryParams } from '../types/index';

export const appApi = createApi({
  reducerPath: 'appApi', // השם של ה‑slice
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }), // כתובת השרת
  tagTypes: ['Classes', 'Students'], // תגיות לריענון נתונים
  endpoints: (builder) => ({ // כאן יכתבו הפונקציות שלנו

    // -- כיתות --

    // שליפת כל הכיתות 
    getAllClasses: builder.query<ClassModel[], void>({
      query: () => '/classes', // הנתיב
      providesTags: ['Classes'], // כאן אנחנו אומרים שהנתונים האלה קשורים ל-Classes
    }),

    // הוספת כיתה
    createClass: builder.mutation<ClassModel, CreateClassDto>({
      query: (newClass) => ({
        url: '/classes', // הנתיב
        method: 'POST', // הפעולה
        body: newClass, // מה נשלח
      }),
      invalidatesTags: ['Classes'], // מרענן את נתוני הכיתות
    }),

    // עריכת כיתה קיימת
    updateClass: builder.mutation<ClassModel, { id: number; data: UpdateClassDto }>({
      query: ({ id, data }) => ({
        url: `/classes/${id}`, // שימו לב: שימוש ב-Backticks שיוכל להחליף את ה-id
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Classes'],
    }),

    // -- תלמידים --

    //קבלת כל התלמידים 
    getAllStudents:
    builder.query<StudentModel[] , void>({
        query: () => '/students',
        providesTags: ['Students']
    }),

    // שליפת תלמידים לפי סינון
    getStudentsByFilter: builder.query<StudentModel[], StudentQueryParams>({
      query: ({ classId, search, status }) => {
        // URLSearchParams הוא אובייקט מובנה ב-JavaScript. חושבים עליו כמו ארגז כלים לבניית כתובות URL.
        const params = new URLSearchParams();

        // במקרה שיש משהו ב-search
        if (search) params.append('search', search); // מוסיפים למה שישלח

        if (status) params.append('status', status); // מוסיפים למה שישלח

        // ברגע שהכנסנו את כל הפרמטרים הנחוצים נמיר את הכתובת למחרוזת בצורה שתוכל להשלח ב-URL
        const paramsString = params.toString();

        // שולחים לשרת את הניתוב שיצרנו
        return `/classes/${classId}/students${paramsString ? `?${paramsString}` : ''}`;
      }, // <-- פה נסגרת פונקציית ה-query!
      providesTags: ['Students'], // <-- פה ממוקם ה-providesTags כמאפיין של האובייקט
    }),

    //הוספת תלמיד חדש
    createStudent:
    builder.mutation<StudentModel , CreateStudentDto>({
        query: (newStudent) => ({
            url: '/students',
            method: 'POST',
            body: newStudent
        }),
        invalidatesTags: ['Students' , 'Classes'],
    }),

    //עריכת תלמיד קיים
    updateStudent:
    builder.mutation<StudentModel , {id:number , data: UpdateStudentDto}>({
        query: ({id , data}) =>({
            url: `/students/${id}`,
            method: 'PATCH',
            body:data
        }),
        invalidatesTags: ['Students'],
    })

  }), 
});

export const {
  useGetAllClassesQuery,
  useCreateClassMutation,
  useUpdateClassMutation,
  useGetStudentsByFilterQuery,
  useLazyGetAllStudentsQuery,
  useCreateStudentMutation,
  useUpdateStudentMutation
} = appApi;

