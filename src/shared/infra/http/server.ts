import 'reflect-metadata';
import * as dotenv from 'dotenv';
import app from './app';
import { dataSource } from '@shared/infra/typeorm/index';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, `../../../../.env.${process.env.NODE_ENV}`),
  override: true,
});

dataSource.initialize().then(() => {
  app.listen(process.env.PORT || 3333, () => {
    console.log(`Server started on port ${process.env.PORT || 3333}`);
  });
});
