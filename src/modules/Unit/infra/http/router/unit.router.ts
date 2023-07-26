import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import UnitController from '../controller/unitController';

const unitRouter = Router();

const unitController = new UnitController();

unitRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      explanation: Joi.string().required(),
    },
  }),
  unitController.create,
);

unitRouter.get('/', unitController.index);

unitRouter.get(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().guid().required,
    },
  }),
  unitController.show,
);

unitRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().guid().required,
    },
    [Segments.BODY]: {
      title: Joi.string().required(),
      explanation: Joi.string().required(),
    },
  }),
  unitController.update,
);
unitRouter.delete(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().guid().required,
    },
  }),
  unitController.delete,
);

export default unitRouter;
