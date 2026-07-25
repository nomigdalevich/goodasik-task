import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { 
  ClassModel, CreateClassDto, UpdateClassDto, CreateStudentDto, UpdateStudentDto, StudentModel, StudentQueryParams } from '../types/index';

export const appApi = createApi({
  reducerPath: 'appApi', 
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  tagTypes: ['Classes', 'Students'], 
  endpoints: (builder) => ({ 


    getAllClasses: builder.query<ClassModel[], void>({
      query: () => '/classes', 
      providesTags: ['Classes'],   
    }),

    createClass: builder.mutation<ClassModel, CreateClassDto>({
      query: (newClass) => ({
        url: '/classes',
        method: 'POST', 
        body: newClass,  
      }),
      invalidatesTags: ['Classes'], 
    }),

    updateClass: builder.mutation<ClassModel, { id: number; data: UpdateClassDto }>({
      query: ({ id, data }) => ({
        url: `/classes/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Classes'],
    }),


    getStudentsByClass:
    builder.query<StudentModel[] , number >({
        query: (classId) => `/classes/${classId}/students`,
        providesTags: ['Students']
    }),

    getStudentsByFilter: builder.query<StudentModel[], StudentQueryParams>({
      query: ({ classId, search, status }) => {
        
        const params = new URLSearchParams();

        if (search) 
          params.append('search', search); 

        if (status) 
          params.append('status', status); 

        const paramsString = params.toString();

        return `/classes/${classId}/students${paramsString ? `?${paramsString}` : ''}`;
      }, 

      providesTags: ['Students'], 
    }),

    createStudent:
    builder.mutation<StudentModel , CreateStudentDto>({
        query: (newStudent) => ({
            url: '/students',
            method: 'POST',
            body: newStudent
        }),
        invalidatesTags: ['Students' , 'Classes'],
    }),

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
  useGetStudentsByClassQuery,
  useCreateStudentMutation,
  useUpdateStudentMutation
} = appApi;

