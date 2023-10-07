import IUnitRepository from '@modules/unit/domain/Respository/IUnitRepository';
import BaseRepository from '@shared/infra/typeorm/repository/BaseRepository';

import Unit from '../entities/Unit';

export default class UnitRepository
  extends BaseRepository<Unit>
  implements IUnitRepository
{
  constructor() {
    super(Unit);
  }
}
