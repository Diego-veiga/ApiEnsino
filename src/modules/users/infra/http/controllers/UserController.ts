import CreateUserService from '@modules/users/services/CreateUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';
import ListUserService from '@modules/users/services/ListUserService';
import ShowUserService from '@modules/users/services/ShowUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UserController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, lastName, email, password } = request.body;
    const createUserService = container.resolve(CreateUserService);

    await createUserService.execute({ name, lastName, email, password });

    return response.json({ message: 'user created successfully ' }).status(201);
  }

  async index(request: Request, response: Response): Promise<Response> {
    const listUserService = container.resolve(ListUserService);

    const users = await listUserService.execute();

    return response.json(users).status(200);
  }
  async show(request: Request, response: Response): Promise<Response> {
    const showUserService = container.resolve(ShowUserService);
    const { id } = request.params;

    const user = await showUserService.execute(id);

    return response.json(user).status(200);
  }
  async update(request: Request, response: Response): Promise<Response> {
    const updateUserService = container.resolve(UpdateUserService);
    const { id } = request.params;
    const { name, lastName, email, password } = request.body;

    const user = await updateUserService.execute({
      id,
      name,
      lastName,
      email,
      password,
    });

    return response.json(user).status(200);
  }
  async delete(request: Request, response: Response): Promise<Response> {
    const deleteUserService = container.resolve(DeleteUserService);
    const { id } = request.params;

    await deleteUserService.execute(id);

    return response.json().status(200);
  }
}
