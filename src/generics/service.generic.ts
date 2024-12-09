import { Injectable } from '@nestjs/common';

import { AbstractBaseService, BaseRepository, DatabaseOptions } from 'gateways';

@Injectable()
export class BaseService<T> extends AbstractBaseService {
  constructor(private readonly _repository: BaseRepository<T>) {
    super();
  }

  getAll(options: DatabaseOptions<T> = {}): Promise<Array<T>> {
    return this._repository.findAll(options);
  }

  getOne(options: DatabaseOptions<T>): Promise<T> {
    return this._repository.findOne(options);
  }

  createOne(createData: T): Promise<T> {
    return this._repository.createOne(createData);
  }

  createMany(entities: Array<T>): Promise<Array<T>> {
    return this._repository.createMany(entities);
  }

  updateOne(options: DatabaseOptions<T>, updateData: T): Promise<T> {
    return this._repository.updateOne(options, updateData);
  }

  remove(options: DatabaseOptions<T>): Promise<T> {
    return this._repository.remove(options);
  }
}
