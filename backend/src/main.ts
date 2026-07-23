import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // הקמת השרת של NestJS

  app.enableCors(); //נותן הרשאה לשרת לקבל בקשות ממקומות שונים

//   // מנגנון אימות נתונים גלובלי
//   app.useGlobalPipes(
//   new ValidationPipe({ // הגדרת אפשרויות לאימות הנתונים

//     // מה זה ?
//     whitelist: true,  // מאפשר רק את השדות המוגדרים ב-DTO
//     forbidNonWhitelisted: true, //החזרת שגיאה אם נשלחו שדות לא מוגדרים ב-DTO
//     transform: true, //המרת טיפוסים אוטומטית של הנתונים שהתקבלו ל-DTO
//     transformOptions: {
//       exposeUnsetFields: false, // לא מצרף שדות שלא נשלחו בבקשה!
//     },
//     skipUndefinedProperties: true, // 👈 מונע העברת שדות שהערך שלהם הוא undefined
//   }),
// );

// מנגנון אימות נתונים גלובלי
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // מסנן ומנקה שדות שלא מוגדרים ב-DTO
      forbidNonWhitelisted: false, // לא יכשיל את הבקשה אם סוואגר שלח שדה נוסף
      transform: true, // המרת טיפוסים אוטומטית ל-DTO
      skipUndefinedProperties: true, // מונע העברת שדות שהערך שלהם הוא undefined
    }),
  );

// יצירת אובייקט הגדרות לתיעוד ה-Swagger
  const config = new DocumentBuilder()
    .setTitle('Task Management API') // הגדרת הכותרת הראשית שתוצג בתיעוד
    .setDescription('REST API for Task Management System') // תיאור קצר של המערכת
    .setVersion('1.0') // הגדרת גרסת ה-API
    .build(); // סיום בניית אובייקט התצורה

  // יצירת מסמך ה-OpenAPI המלא על ידי סריקת האפליקציה וההגדרות
  const document = SwaggerModule.createDocument(app, config);

  // הגשת הממשק הויזואלי בדפדפן בנתיב '/api' (כלומר: http://localhost:3000/api)
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000); //הגדרת הפורט שבו השרת יאזין לבקשות 
  
}
bootstrap();
