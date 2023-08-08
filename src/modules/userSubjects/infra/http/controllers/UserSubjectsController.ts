import CreateUserSubjects from '@modules/userSubjects/service/CreateUserSubjectsService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UserSubjectsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { userId, subjectId } = request.body;
    const userSubjectsService = container.resolve(CreateUserSubjects);
    await userSubjectsService.execute({ userId, subjectId });
    return response.status(201).json();
  }
}
