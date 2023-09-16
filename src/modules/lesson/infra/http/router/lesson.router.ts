import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import LessonController from '../controller/lessonController';

const lessonRouter = Router();
const lessonController = new LessonController();

lessonRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      description: Joi.string().required(),
      unitId: Joi.string().guid().required(),
    },
  }),
  lessonController.create,
);

export default lessonRouter;
