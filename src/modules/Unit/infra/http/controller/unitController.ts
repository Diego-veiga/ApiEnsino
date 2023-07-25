import CreateUnitService from '@modules/unit/services/Createunitservies';
import DeleteUnitService from '@modules/unit/services/DeleteUnitservies';
import ListUnitService from '@modules/unit/services/ListUnitservies';
import ShowUnitService from '@modules/unit/services/ShowUnitservies';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UnitController {
  async create(request: Request, response: Response): Promise<Response> {
    const { title, explanation } = request.body;

    const createUnitService = container.resolve(CreateUnitService);

    await createUnitService.execute({ title, explanation });
    return response.status(201).json({ message: 'Unit created' });
  }

  async index(request: Request, response: Response): Promise<Response> {
    const listUnitService = container.resolve(ListUnitService);

    const units = await listUnitService.execute();
    return response.status(201).json(units);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showUnitService = container.resolve(ShowUnitService);

    const unit = await showUnitService.execute(id);
    return response.status(201).json(unit);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteUnitService = container.resolve(DeleteUnitService);

    await deleteUnitService.execute(id);
    return response.status(201).json({ message: 'Unit removed ' });
  }
}
