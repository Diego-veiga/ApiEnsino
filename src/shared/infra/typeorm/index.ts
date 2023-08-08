import Subject from '@modules/subjects/infra/typeorm/entities/subject';
import Unit from '@modules/unit/infra/typeorm/entities/Unit';
import User from '@modules/users/infra/typeorm/entities/user';
import UserSubjects from '@modules/userSubjects/infra/typeorm/entities/userSubject';
import 'dotenv/config';
import { DataSource } from 'typeorm';
import { CreateUser1682587596261 } from './migrations/1682587596261-CreateUser';
import { AddActiveColumnUser1683279499546 } from './migrations/1683279499546-addActiveColumnUser';
import { CreateSubject1683401231137 } from './migrations/1683401231137-createSubject';
import { AddActiveColumnSubject1683632730291 } from './migrations/1683632730291-addActiveColumnSubject';
import { CreateUnitTable1689761970246 } from './migrations/1689761970246-createUnitTable';
import { CreateUserSubject1690888220521 } from './migrations/1690888220521-CreateUserSubject';

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.HOST_DATABASE || 'localhost',
  port: Number(process.env.PORT_DATABASE) || 5432,
  username: process.env.USERNAME_DATABASE || 'postgres',
  password: process.env.PASSWORD_DATABASE || '1234',
  database: process.env.DATABASE || 'ApiEnsino',
  entities: [User, Subject, Unit, UserSubjects],
  logging: true,
  migrations: [
    CreateUser1682587596261,
    AddActiveColumnUser1683279499546,
    CreateSubject1683401231137,
    AddActiveColumnSubject1683632730291,
    CreateUnitTable1689761970246,
    CreateUserSubject1690888220521,
  ],
});
