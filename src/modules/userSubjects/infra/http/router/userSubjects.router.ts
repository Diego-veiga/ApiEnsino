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
      subjectsId: Joi.string().guid().required(),
    },
  }),
  userSubjectController.create,
);

export default userSubjectsRouter;
