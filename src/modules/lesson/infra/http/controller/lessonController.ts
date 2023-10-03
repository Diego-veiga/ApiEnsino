import CreateLessonService from '@modules/lesson/services/CreateLessonService';
import DeleteLessonService from '@modules/lesson/services/DeleteLessonService';
import ListLessonService from '@modules/lesson/services/ListLessonService';
import ShowLessonService from '@modules/lesson/services/ShowLessonService';
import UpdateLessonService from '@modules/lesson/services/UpdateLessonService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class LessonController {
  async create(request: Request, response: Response): Promise<Response> {
    const { description, unitId } = request.body;

    const createLessonService = container.resolve(CreateLessonService);

    const lessonCreated = await createLessonService.execute({
      description,
      unitId,
    });
    return response.status(201).json(lessonCreated);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteLessonService = container.resolve(DeleteLessonService);

    await deleteLessonService.execute(id);
    return response.status(200).json({ message: 'Lesson removed' });
  }

  async index(request: Request, response: Response): Promise<Response> {
    const listLessonService = container.resolve(ListLessonService);

    const lessons = await listLessonService.execute();
    return response.status(200).json(lessons);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showLessonService = container.resolve(ShowLessonService);

    const lesson = await showLessonService.execute(id);
    return response.status(200).json(lesson);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { description, unitId } = request.body;
    const updateLessonService = container.resolve(UpdateLessonService);

    const lessonUpdated = await updateLessonService.execute({
      id,
      description,
      unitId,
    });
    return response.status(200).json(lessonUpdated);
  }
}
