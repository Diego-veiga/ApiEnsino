import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import Joi from 'joi';
import UserSubjectsController from '../controllers/UserSubjectsController';

const userSubjectsRouter = Router();

const userSubjectController = new UserSubjectsController();

userSubjectsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      userId: Joi.string().guid().required(),
      subjectId: Joi.string().guid().required(),
    },
  }),
  userSubjectController.create,
);

userSubjectsRouter.get(
  '/:subjectId/user/:userId',
  celebrate({
    [Segments.PARAMS]: {
      userId: Joi.string().guid().required(),
      subjectId: Joi.string().guid().required(),
    },
  }),
  userSubjectController.show,
);
userSubjectsRouter.get('/', userSubjectController.index);

userSubjectsRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().guid().required(),
    },
    [Segments.BODY]: {
      userId: Joi.string().guid().required(),
      subjectId: Joi.string().guid().required(),
      grade: Joi.number().min(0).required(),
    },
  }),
  userSubjectController.update,
);

userSubjectsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().guid().required(),
    },
  }),
  userSubjectController.delete,
);

export default userSubjectsRouter;
