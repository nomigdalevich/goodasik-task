import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateClassDto
{
  @ApiPropertyOptional({ example: 'כיתה א2', description: 'שם כיתה מעודכן' })
  @IsOptional()
  @IsString({ message: 'שם הכיתה חייב להיות מחרוזת' })
  @MinLength(2, { message: 'שם הכיתה חייב להכיל לפחות 2 תווים' })
  name?: string;
  
  @ApiPropertyOptional({ example: 'ב', description: 'שכבה מעודכנת' }) 
  @IsString({ message: 'שכבה חייבת להיות מחרוזת' }) 
  grade?: string; 

  @ApiPropertyOptional({ example: 'שרה לוי', description: 'שם מחנכת מעודכן' })
  @IsOptional()
  @IsString({ message: 'שם המחנכת חייב להיות מחרוזת' })
  @MinLength(2, { message: 'שם המחנכת חייב להכיל לפחות 2 תווים' })
  @MaxLength(50, { message: 'שם המחנכת אינו יכול לעלות על 50 תווים' })
  homeroomTeacher?: string;

}