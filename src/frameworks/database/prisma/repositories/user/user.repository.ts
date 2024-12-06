/* eslint-disable no-unused-vars */
import { User } from 'api/user/entities/user.entity';
import { DatabaseOptions } from 'gateways/database-filter.interface';
import { BaseRepository } from 'gateways/repository';

export class UserRepository extends BaseRepository<User> {
  findAll(options: DatabaseOptions<User>): Promise<User[]> {
    return new Promise(resolve => {
      return resolve([new User('1', 'name')]);
    });
  }
  findOne(options: DatabaseOptions<User>): Promise<User> {
    return new Promise(resolve => {
      return resolve(new User('1', 'name'));
    });
  }
  createOne(creatingEntity: User): Promise<User> {
    return new Promise(resolve => {
      return resolve(new User('1', 'name'));
    });
  }
  createMany(creatingEntities: User[]): Promise<User[]> {
    return new Promise(resolve => {
      return resolve([new User('1', 'name')]);
    });
  }
  updateOne(options: DatabaseOptions<User>, updateEntity: User): Promise<User> {
    return new Promise(resolve => {
      return resolve(new User('1', 'name'));
    });
  }
  updateMany(options: DatabaseOptions<User>, updateEntities: User[]): Promise<User[]> {
    return new Promise(resolve => {
      return resolve([new User('1', 'name')]);
    });
  }

  remove(options: DatabaseOptions<User>): Promise<User[]> {
    return new Promise(resolve => {
      return resolve([new User('1', 'name')]);
    });
  }
}
