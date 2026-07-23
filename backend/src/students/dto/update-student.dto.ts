import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { StudentStatus } from "../student.model";

//פה מגדירים איך הלקוח מעדכן תלמיד במערכת
export class UpdateStudentDto 
{
  @ApiPropertyOptional({ example: 'ישראל', description: 'שם פרטי מעודכן' })
  @IsOptional()
  @IsString({ message: 'שם פרטי חייב להיות מחרוזת' })
  @MinLength(2, { message: 'שם פרטי חייב להכיל לפחות 2 תווים' })
  @MaxLength(30, { message: 'שם פרטי אינו יכול לעלות על 30 תווים' })
  firstName?: string;

  @ApiPropertyOptional({ example: 'ישראלי', description: 'שם משפחה מעודכן' })
  @IsOptional()
  @IsString({ message: 'שם משפחה חייב להיות מחרוזת' })
  @MinLength(2, { message: 'שם משפחה חייב להכיל לפחות 2 תווים' })
  @MaxLength(30, { message: 'שם משפחה אינו יכול לעלות על 30 תווים' })
  lastName?: string;

  @ApiPropertyOptional({ example: '0501234567', description: 'טלפון הורה מעודכן' })
  @IsOptional()
  @IsString({ message: 'טלפון הורה חייב להיות מחרוזת' })
  parentPhone?: string;

  @ApiPropertyOptional({ enum: StudentStatus, example: StudentStatus.Inactive, description: 'סטטוס תלמיד מעודכן' })
  @IsOptional()
  @IsEnum(StudentStatus, { message: 'סטטוס חייב להיות ACTIVE או INACTIVE' })
  status?: StudentStatus;
}