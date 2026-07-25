//קובץ לבדיקות יחידה
//אנחנו בודרים שהסרוויס עובד
//שהפונקציה של שליפת כיתות עובדת 

import { beforeEach, describe, it ,expect} from "@jest/globals";
import { ClassesService } from "./classes.service";
import { Test, TestingModule } from "@nestjs/testing";

//תיאור על מי הולכים לעשות את  הבדיקה
describe('ClassesService' , () => {

    //משתנה של הסרוויס שלנו
    let service:ClassesService;

    //פונקציה שרצה לפני בדיקה מבודדת
    beforeEach(async () => {
        //פה אנחנו אומרים שהבדיקה תיהיה על קובץ מסוים
        const module: TestingModule = await Test.createTestingModule({
            providers: [ClassesService],
        }).compile();

        //מוציאים את הסרוויס לקראת הבדיקה
        service = module.get<ClassesService>(ClassesService);
    });

    //האם הסרוויס נוצר בהצלחה ?
    it('should be defined' , () => { //הגדרה של הבדיקה הבודדת 
        expect(service).toBeDefined();
    });

    //האם הפונקציה  מחזירה מערך ?
    it('should return an array of classes' , async () => {

        const result = await service.getAllClasses();
        expect(Array.isArray(result)).toBe(true);
    });
})