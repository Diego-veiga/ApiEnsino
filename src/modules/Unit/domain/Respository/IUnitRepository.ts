/* eslint-disable @typescript-eslint/no-empty-interface */

/* eslint-disable no-unused-vars */

import Unit from '@modules/unit/infra/typeorm/entities/Unit';
import IBaseRepository from '@shared/domain/repository/IBaseRepository';

export default interface IUnitRepository extends IBaseRepository<Unit> {}
