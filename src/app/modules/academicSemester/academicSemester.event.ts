import { RedisClient } from '../../../shared/redis';
import { IAcademicSemesterCreatedEvent } from './academicSemester.interface';
import { academicSemesterService } from './academicSemester.service';

const initAcademicSemester = () => {
  RedisClient.subscribe('academic-semester.create', async (e: string) => {
    const data: IAcademicSemesterCreatedEvent = JSON.parse(e);

    await academicSemesterService.createAcademicSemesterFromEvent(data);
    console.log(data);
  });
};

export default initAcademicSemester;
