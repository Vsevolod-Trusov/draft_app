abstract class BaseService {
  abstract getAll(options?: unknown): Promise<unknown>;
  abstract getOne(options: unknown): Promise<unknown>;
  abstract createOne(entityOne: unknown): Promise<unknown>;
  abstract updateOne(options: unknown, updateDto: unknown): Promise<unknown>;
  abstract remove(options: unknown): Promise<unknown>;
}

export { BaseService };
