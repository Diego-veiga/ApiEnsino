import 'reflect-metadata';
import 'dotenv/config';
import app from './app';
import { dataSource } from '@shared/infra/typeorm/index';

dataSource.initialize().then(() => {
  const server = app.listen(process.env.PORT || 3333, () => {
    console.log(`Server started on port ${process.env.PORT || 3333}`);
  });
});