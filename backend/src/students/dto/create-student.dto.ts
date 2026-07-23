import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";
import { StudentStatus } from "../student.model";

//פה אנחנו מגדירים איך הלקוח יוצר כיתה במערכת 
export class CreateStudentDto 
{
  @ApiProperty({ example: 3, description: 'מספר הכיתה אליה התלמיד משויך' })
  @IsNotEmpty({ message: 'מזהה כיתה הוא שדה חובה' })
  classId!: number;

  @ApiProperty({ example: '123456789', description: 'תעודת זהות של התלמיד' })
  @IsNotEmpty({ message: 'תעודת זהות היא שדה חובה' })
  @IsString({ message: 'תעודת זהות חייבת להיות מחרוזת' })
  @MinLength(9, { message: 'תעודת זהות חייבת להכיל 9 ספרות' })
  @MaxLength(9, { message: 'תעודת זהות חייבת להכיל 9 ספרות' })
  identityNumber!: string; //שדה חובה 

  @ApiProperty({ example: 'ישראל', description: 'שם פרטי' })
  @IsNotEmpty({ message: 'שם פרטי הוא שדה חובה' })
  @IsString({ message: 'שם פרטי חייב להיות מחרוזת' })
  @MinLength(2, { message: 'שם פרטי חייב להכיל לפחות 2 תווים' })
  @MaxLength(30, { message: 'שם פרטי אינו יכול לעלות על 30 תווים' })
  firstName!: string;

  @ApiProperty({ example: 'ישראלי', description: 'שם משפחה' })
  @IsNotEmpty({ message: 'שם משפחה הוא שדה חובה' })
  @IsString({ message: 'שם משפחה חייב להיות מחרוזת' })
  @MinLength(2, { message: 'שם משפחה חייב להכיל לפחות 2 תווים' })
  @MaxLength(30, { message: 'שם משפחה אינו יכול לעלות על 30 תווים' })
  lastName!: string;

  @ApiProperty({ example: '0501234567', description: 'טלפון הורה' })
  @IsNotEmpty({ message: 'טלפון הורה הוא שדה חובה' })
  @IsString({ message: 'טלפון הורה חייב להיות מחרוזת' })
  parentPhone! :string;

  @ApiProperty({ 
    enum: StudentStatus, 
    example: StudentStatus.Active, 
    description: 'סטטוס תלמיד' 
  })
  status!: StudentStatus; 
}