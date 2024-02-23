import Lesson from '@modules/lesson/infra/typeorm/Entities/lesson';
import Subject from '@modules/subjects/infra/typeorm/entities/subject';
import Unit from '@modules/Unit/infra/typeorm/entities/Unit';
import User from '@modules/users/infra/typeorm/entities/user';
import UserSubjects from '@modules/userSubjects/infra/typeorm/entities/userSubject';
import * as dotenv from 'dotenv';
import path from 'path';
import { DataSource } from 'typeorm';
import { CreateUser1682587596261 } from './migrations/1682587596261-CreateUser';
import { AddActiveColumnUser1683279499546 } from './migrations/1683279499546-addActiveColumnUser';
import { CreateSubject1683401231137 } from './migrations/1683401231137-createSubject';
import { AddActiveColumnSubject1683632730291 } from './migrations/1683632730291-addActiveColumnSubject';
import { CreateUnitTable1689761970246 } from './migrations/1689761970246-createUnitTable';
import { CreateUserSubject1690888220521 } from './migrations/1690888220521-CreateUserSubject';
import { CreateLesson1694509633867 } from './migrations/1694509633867-createLesson';

dotenv.config({
  path: path.join(__dirname, `../../../../.env.${process.env.NODE_ENV}`),
  override: true,
});

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.HOST_DATABASE,
  port: Number(process.env.PORT_DATABASE),
  username: process.env.USERNAME_DATABASE,
  password: process.env.PASSWORD_DATABASE,
  database: process.env.DATABASE,
  entities: [User, Subject, Unit, UserSubjects, Lesson],
  ssl: {
    rejectUnauthorized: false,
  },
  logging: true,
  migrations: [
    CreateUser1682587596261,
    AddActiveColumnUser1683279499546,
    CreateSubject1683401231137,
    AddActiveColumnSubject1683632730291,
    CreateUnitTable1689761970246,
    CreateUserSubject1690888220521,
    CreateLesson1694509633867,
  ],
});
