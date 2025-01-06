import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { BaseRepository, DatabaseOptions } from 'gateways';

import { PrismaService } from '../../prisma.service';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(private readonly prismaService: PrismaService) {
    super();
  }

  findAll(options: DatabaseOptions<User> = {}): Promise<User[]> {
    return this.prismaService.user.findMany({
      where: options.filter,
    });
  }

  findOne(options: DatabaseOptions<User>): Promise<User> {
    return this.prismaService.user.findFirst({
      where: options.filter,
    });
  }

  createOne(creatingEntity: User): Promise<User> {
    return this.prismaService.user.create({
      data: creatingEntity,
    });
  }

  async createMany(creatingEntities: User[]): Promise<User[]> {
    const { count } = await this.prismaService.user.createMany({
      data: creatingEntities,
    });

    return count === creatingEntities.length ? creatingEntities : [];
  }

  updateOne(options: DatabaseOptions<User>, updateEntity: User): Promise<User> {
    return this.prismaService.user.update({
      where: {
        id: options.filter?.id,
      },
      data: updateEntity,
    });
  }

  async updateMany(options: DatabaseOptions<User>, updateEntities: User[]): Promise<User[]> {
    const { count } = await this.prismaService.user.updateMany({
      where: {
        id: options.filter?.id,
      },
      data: updateEntities,
    });

    return count === updateEntities.length ? updateEntities : [];
  }

  remove(options: DatabaseOptions<User>): Promise<User> {
    return this.prismaService.user.delete({ where: { id: options.filter?.id } });
  }
}
