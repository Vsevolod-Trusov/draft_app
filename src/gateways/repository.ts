import { DatabaseOptions } from "./database-filter.interface";

abstract class BaseRepository<T> {
  abstract findAll(options?: DatabaseOptions<T>): Promise<Array<T>>;
  abstract findOne(options: DatabaseOptions<T>): Promise<T>;
  abstract createOne(creatingEntity: T): Promise<T>;
  abstract createMany(creatingEntities: Array<T>): Promise<Array<T>>;
  abstract updateOne(options: DatabaseOptions<T>, updateEntity: T): Promise<T>;
  abstract updateMany(
    options: DatabaseOptions<T>,
    updateEntities: Array<T>
  ): Promise<Array<T>>;
  abstract remove(options: DatabaseOptions<T>): Promise<Array<T>>;
}

export { BaseRepository };
