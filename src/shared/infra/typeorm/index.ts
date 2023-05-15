import Subject from '@modules/subjects/infra/typeorm/entities/subject';
import User from '@modules/users/infra/typeorm/entities/user';
import 'dotenv/config';
import { DataSource } from 'typeorm';
import { CreateUser1682587596261 } from './migrations/1682587596261-CreateUser';
import { AddActiveColumnUser1683279499546 } from './migrations/1683279499546-addActiveColumnUser';
import { CreateSubject1683401231137 } from './migrations/1683401231137-createSubject';
import { AddActiveColumnSubject1683632730291 } from './migrations/1683632730291-addActiveColumnSubject';

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.HOST_DATABASE || 'localhost',
  port: Number(process.env.PORT_DATABASE) || 5432,
  username: process.env.USERNAME_DATABASE || 'postgres',
  password: process.env.PASSWORD_DATABASE || '1234',
  database: process.env.DATABASE || 'ApiEnsino',
  entities: [User, Subject],
  logging: true,
  migrations: [
    CreateUser1682587596261,
    AddActiveColumnUser1683279499546,
    CreateSubject1683401231137,
    AddActiveColumnSubject1683632730291,
  ],
});
