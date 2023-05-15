import { area } from '@modules/subjects/domain/enum/area';
import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import Joi from 'joi';
import SubjectController from '../controllers/SubjectController';

const subjectRouter = Router();

const subjectController = new SubjectController();

subjectRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      area: Joi.valid(...Object.values(area)).required(),
    },
  }),
  subjectController.create,
);
subjectRouter.get('/', subjectController.index);
subjectRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().guid().required(),
    },
  }),
  subjectController.show,
);
subjectRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().guid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      area: Joi.valid(...Object.values(area)).required(),
    },
  }),
  subjectController.update,
);

subjectRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().guid().required(),
    },
  }),
  subjectController.delete,
);

export default subjectRouter;
