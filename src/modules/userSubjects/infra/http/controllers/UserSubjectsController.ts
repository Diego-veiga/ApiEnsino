import CreateUserSubjects from '@modules/userSubjects/services/CreateUserSubjectsService';
import DeleteUserSubjectsService from '@modules/userSubjects/services/DeleteUserSubjectsService';
import ListUserSubjectsService from '@modules/userSubjects/services/ListUserSubjectsService';
import ShowUserSubjectsService from '@modules/userSubjects/services/ShowUserSubjectsService';
import UpdateUserSubjectsService from '@modules/userSubjects/services/UpdateUserSubjectsService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UserSubjectsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { userId, subjectId } = request.body;
    const userSubjectsService = container.resolve(CreateUserSubjects);
    const userSubjectCreated = await userSubjectsService.execute({
      userId,
      subjectId,
    });
    return response.status(201).json(userSubjectCreated);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { subjectId, userId } = request.params;

    const showUserSubjectsService = container.resolve(ShowUserSubjectsService);
    const userSubjectView = await showUserSubjectsService.execute({
      userId,
      subjectId,
    });
    return response.status(201).json(userSubjectView);
  }

  async index(request: Request, response: Response): Promise<Response> {
    const listUserSubjectsService = container.resolve(ListUserSubjectsService);
    const userSubjectViewList = await listUserSubjectsService.execute();
    return response.status(201).json(userSubjectViewList);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { userId, subjectId, grade } = request.body;
    const updateUserSubjectsService = container.resolve(
      UpdateUserSubjectsService,
    );
    const userSubjectUpdated = await updateUserSubjectsService.execute({
      id,
      userId,
      subjectId,
      grade,
    });
    return response.status(201).json(userSubjectUpdated);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteUserSubjectsService = container.resolve(
      DeleteUserSubjectsService,
    );
    await deleteUserSubjectsService.execute(id);
    return response
      .status(201)
      .json({ message: 'UserSubject successfully deleted ' });
  }
}
