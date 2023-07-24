import CreateUnitService from '@modules/unit/services/unitservies';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UnitController {
  async create(request: Request, response: Response): Promise<Response> {
    const { title, explanation } = request.body;

    const createUnitService = container.resolve(CreateUnitService);

    await createUnitService.execute({ title, explanation });
    return response.status(201).json({ message: 'Unit created' });
  }
}
