import CreateLessonService from '@modules/lesson/services/createLessonService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class LessonController {
  async create(request: Request, response: Response): Promise<Response> {
    const { description, unitId } = request.body;

    const createLessonService = container.resolve(CreateLessonService);

    await createLessonService.execute({ description, unitId });
    return response.status(201).json({ message: 'Lesson created' });
  }
}
