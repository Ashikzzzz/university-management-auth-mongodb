import { RedisClient } from '../../../shared/redis';

const initAcademicSemester = () => {
  RedisClient.subscribe('academic-semester.create', async (e: string) => {
    const data = JSON.parse(e);
    console.log(data);
  });
};

export default initAcademicSemester;
