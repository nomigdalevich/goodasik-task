import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

//הקובץ הזה מגדיר מה השרת מקבל מהלקוח כאשר הוא יוצר כיתה חדשה
export class CreateClassDto 
{
  @ApiProperty({ example: 'כיתה א1', description: 'שם הכיתה (המזהה)' })
  @IsNotEmpty({ message: 'שם הכיתה הוא שדה חובה' })
  @MinLength(2, { message: 'שם הכיתה חייב להכיל לפחות 2 תווים' })
  @IsString({ message: 'שם הכיתה חייב להיות מחרוזת' })
  name!: string; //בגלל שהשדה הזה לא מאותחל בבנאי,
  // אנחנו מסמנים אותו כ-! כדי להבטיח שהטיפוס שלו לא יהיה undefined

  @ApiProperty({ example: 'א', description: 'שכבה' })
  @IsNotEmpty({ message: 'שכבה היא שדה חובה' })
  @IsString({ message: 'שכבה חייבת להיות מחרוזת' })
  grade!: string;

  @ApiProperty({ example: 'לאה כהן', description: 'שם המחנכת' })
  @IsNotEmpty({ message: 'שם המחנכת הוא שדה חובה' })
  @MinLength(2, { message: 'שם המחנכת חייב להכיל לפחות 2 תווים' })
  @MaxLength(50, { message: 'שם המחנכת אינו יכול לעלות על 50 תווים' })
  @IsString({ message: 'שם המחנכת חייב להיות מחרוזת' })
  homeroomTeacher!: string;
}