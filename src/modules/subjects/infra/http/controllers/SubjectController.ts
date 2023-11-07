import CreateSubjectService from '@modules/subjects/services/CreateSubject';
import DeleteSubjectService from '@modules/subjects/services/DeleteSubjectService';
import ListSubjectService from '@modules/subjects/services/ListSubjectService';
import ShowSubjectService from '@modules/subjects/services/ShowSubjectService';
import UpdateSubjectService from '@modules/subjects/services/UpdateSubjectService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class SubjectController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, area } = request.body;
    const createSubjectService = container.resolve(CreateSubjectService);

    const subjectCreated = await createSubjectService.execute({ name, area });

    return response.json(subjectCreated).status(201);
  }

  async index(request: Request, response: Response): Promise<Response> {
    const listSubjectService = container.resolve(ListSubjectService);

    const subjects = await listSubjectService.execute();

    return response.json(subjects).status(200);
  }
  async show(request: Request, response: Response): Promise<Response> {
    const showSubjectService = container.resolve(ShowSubjectService);
    const { id } = request.params;

    const subject = await showSubjectService.execute(id);

    return response.json(subject).status(200);
  }
  async update(request: Request, response: Response): Promise<Response> {
    const updateSubjectService = container.resolve(UpdateSubjectService);
    const { id } = request.params;
    const { name, area } = request.body;

    const subjectUpdated = await updateSubjectService.execute({
      id,
      name,
      area,
    });

    return response.json(subjectUpdated).status(200);
  }
  async delete(request: Request, response: Response): Promise<Response> {
    const deleteSubjectService = container.resolve(DeleteSubjectService);
    const { id } = request.params;

    await deleteSubjectService.execute(id);

    return response.json().status(200);
  }
}
