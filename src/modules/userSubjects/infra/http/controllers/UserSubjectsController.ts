import CreateUserSubjects from '@modules/userSubjects/service/CreateUserSubjectsService';
import DeleteUserSubjectsService from '@modules/userSubjects/service/DeleteUserSubjectsService';
import ListUserSubjectsService from '@modules/userSubjects/service/ListUserSubjectsService';
import ShowUserSubjectsService from '@modules/userSubjects/service/ShowUserSubjectsService';
import UpdateUserSubjectsService from '@modules/userSubjects/service/UpdateUserSubjectsService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UserSubjectsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { userId, subjectId } = request.body;
    const userSubjectsService = container.resolve(CreateUserSubjects);
    await userSubjectsService.execute({ userId, subjectId });
    return response.status(201).json({ message: 'Enrollment successful' });
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
    await updateUserSubjectsService.execute({ id, userId, subjectId, grade });
    return response
      .status(201)
      .json({ message: 'UserSubject successfully updated' });
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
