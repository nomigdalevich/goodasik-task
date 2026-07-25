
import { beforeEach, describe, it ,expect} from "@jest/globals";
import { ClassesService } from "./classes.service";
import { Test, TestingModule } from "@nestjs/testing";

describe('ClassesService' , () => {

    let service:ClassesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ClassesService],
        }).compile();

        service = module.get<ClassesService>(ClassesService);
    });

    it('should be defined' , () => { 
        expect(service).toBeDefined();
    });

    it('should return an array of classes' , async () => {

        const result = await service.getAllClasses();
        expect(Array.isArray(result)).toBe(true);
    });
})