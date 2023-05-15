import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import Joi from 'joi';
import UserController from '../controllers/UserController';

const userRouter = Router();

const userController = new UserController();

userRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(4).required(),
    },
  }),
  userController.create,
);
userRouter.get('/', userController.index);
userRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().guid().required(),
    },
  }),
  userController.show,
);
userRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().guid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(4).required(),
    },
  }),
  userController.update,
);

userRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().guid().required(),
    },
  }),
  userController.delete,
);

export default userRouter;
