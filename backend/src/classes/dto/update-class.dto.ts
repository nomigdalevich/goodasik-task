import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";

// פה אנחנו מגדירים את ה-DTO (Data Transfer Object) לעדכון כיתה במערכת שלנו
//הלקוח לא חייב לשלוח את כל השדות, אלא רק את אלו שהוא רוצה לעדכן
export class UpdateClassDto
{
  @ApiPropertyOptional({ example: 'כיתה א2', description: 'שם כיתה מעודכן' })
  @IsOptional()
  @IsString({ message: 'שם הכיתה חייב להיות מחרוזת' })
  @MinLength(2, { message: 'שם הכיתה חייב להכיל לפחות 2 תווים' })
  name?: string;
  
  @ApiPropertyOptional({ example: 'ב', description: 'שכבה מעודכנת' }) // שדה אופציונלי שמייצג את השכבה המעודכנת של הכיתה
  @IsOptional() //לא חובה לשלוח
  @IsString({ message: 'שכבה חייבת להיות מחרוזת' }) //מאמת שהשדה הןא מחרוזת 
  grade?: string; //לא חובה לשלוח

  //אותו דבר גם פה
  @ApiPropertyOptional({ example: 'שרה לוי', description: 'שם מחנכת מעודכן' })
  @IsOptional()
  @IsString({ message: 'שם המחנכת חייב להיות מחרוזת' })
  @MinLength(2, { message: 'שם המחנכת חייב להכיל לפחות 2 תווים' })
  @MaxLength(50, { message: 'שם המחנכת אינו יכול לעלות על 50 תווים' })
  homeroomTeacher?: string;

}