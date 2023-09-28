import ILessonToLessonViewMapper from '@modules/lesson/domain/ILessonToLessonViewMapper';
import ILessonRepository from '@modules/lesson/domain/repository/ILessonRepository';
import LessonRepository from '@modules/lesson/infra/typeorm/repository/LessonRepository';
import { LessonToLessonViewMapper } from '@modules/lesson/mappers/LessonToLessonView.mapper';
import ISubjectToSubjectViewMapper from '@modules/subjects/domain/mappers/ISubjectToSubjectView.mapper';
import ISubjectRepository from '@modules/subjects/domain/respositories/ISubjectsRepository';
import SubjectsRepository from '@modules/subjects/infra/typeorm/respository/SubjectsRepository';
import { SubjectToSubjectViewMapper } from '@modules/subjects/mappers/SubjectToSubjectView.mappper';
import IUnitRepository from '@modules/unit/domain/repository/IUnitRepository';
import UnitRepository from '@modules/unit/infra/typeorm/repository/UnitRepository';
import IUserToUserViewMapper from '@modules/users/domain/mappers/IUserToUserView.mapper';
import IUsersRepository from '@modules/users/domain/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/respositories/UsersRepository';
import { UserToUserViewMapper } from '@modules/users/mappers/userToUserView.mappper';
import IUserSubjectsRepository from '@modules/userSubjects/domain/IUserSubjectsRepository';
import IUserSubjectToUserSubjectViewMapper from '@modules/userSubjects/domain/mappers/IUserSubjectToUserSubjectView';
import UserSubjectsRepository from '@modules/userSubjects/infra/typeorm/repository/UserSubjectsRepository';
import UserSubjectViewMapper from '@modules/userSubjects/mappers/userSubjectView.mapper';
import IRebbit from '@shared/messaging/Interface/IRabbit';
import Rabbit from '@shared/messaging/Rabbit';
import { container } from 'tsyringe';

container.registerSingleton<ISubjectRepository>(
  'SubjectRepository',
  SubjectsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UserRepository',
  UsersRepository,
);

container.registerSingleton<IUserSubjectsRepository>(
  'UserSubjectsRepository',
  UserSubjectsRepository,
);

container.registerSingleton<ILessonRepository>(
  'LessonRepository',
  LessonRepository,
);

container.registerSingleton<IUnitRepository>('UnitRepository', UnitRepository);

container.registerSingleton<IUserToUserViewMapper>(
  'UserToUserViewMapper',
  UserToUserViewMapper,
);
container.registerSingleton<ISubjectToSubjectViewMapper>(
  'SubjectToSubjectViewMapper',
  SubjectToSubjectViewMapper,
);

container.registerSingleton<IUserSubjectToUserSubjectViewMapper>(
  'UserSubjectToUserSubjectViewMapper',
  UserSubjectViewMapper,
);

container.registerSingleton<ILessonToLessonViewMapper>(
  'LessonToLessonViewMapper',
  LessonToLessonViewMapper,
);

container.registerSingleton<IRebbit>('Rebbit', Rabbit);
