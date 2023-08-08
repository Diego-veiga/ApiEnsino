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
import UserSubjectsRepository from '@modules/userSubjects/infra/typeorm/repository/UserSubjectsRepository';
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

container.registerSingleton<IUnitRepository>('UnitRepository', UnitRepository);

container.registerSingleton<IUserToUserViewMapper>(
  'UserToUserViewMapper',
  UserToUserViewMapper,
);
container.registerSingleton<ISubjectToSubjectViewMapper>(
  'SubjectToSubjectViewMapper',
  SubjectToSubjectViewMapper,
);

container.registerSingleton<IRebbit>('Rebbit', Rabbit);
