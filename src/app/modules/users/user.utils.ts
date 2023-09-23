import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

// generate id for student

export const findLastStudentID = async (): Promise<string | undefined> => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastStudent?.id ? lastStudent.id.substring(4) : undefined;
};

export const generateStudentId = async (
  academicSemester: IAcademicSemester,
): Promise<string> => {
  const currentId =
    (await findLastStudentID()) || (0).toString().padStart(3, '0');
  let incrementId = (parseInt(currentId) + 1).toString().padStart(3, '0');

  incrementId = `${academicSemester?.year.substring(
    2,
  )}${academicSemester?.code}${incrementId}`;
  return incrementId;
};

// generate id for faculty
export const findLastFacultyID = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateFacultyId = async (): Promise<string> => {
  const currentId =
    (await findLastFacultyID()) || (0).toString().padStart(5, '0');
  let incrementId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementId = `F-${incrementId}`;
  return incrementId;
};
