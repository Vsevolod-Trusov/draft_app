import { Injectable } from '@nestjs/common';

import { UserEntity } from 'frameworks';
import { BaseRepository, DatabaseOptions } from 'gateways';

import { PrismaService } from '../../prisma.service';

@Injectable()
export class UserRepository extends BaseRepository<UserEntity> {
  constructor(private readonly prismaService: PrismaService) {
    super();
  }

  findAll(options: DatabaseOptions<UserEntity> = {}): Promise<UserEntity[]> {
    return this.prismaService.user.findMany({
      where: options.filter,
    });
  }

  findOne(options: DatabaseOptions<UserEntity>): Promise<UserEntity> {
    return this.prismaService.user.findFirst({
      where: options.filter,
    });
  }

  createOne(creatingEntity: UserEntity): Promise<UserEntity> {
    return this.prismaService.user.create({
      data: creatingEntity,
    });
  }

  async createMany(creatingEntities: UserEntity[]): Promise<UserEntity[]> {
    const { count } = await this.prismaService.user.createMany({
      data: creatingEntities,
    });

    return count === creatingEntities.length ? creatingEntities : [];
  }

  updateOne(options: DatabaseOptions<UserEntity>, updateEntity: UserEntity): Promise<UserEntity> {
    return this.prismaService.user.update({
      where: {
        id: options.filter?.id,
      },
      data: updateEntity,
    });
  }

  async updateMany(options: DatabaseOptions<UserEntity>, updateEntities: UserEntity[]): Promise<UserEntity[]> {
    const { count } = await this.prismaService.user.updateMany({
      where: {
        id: options.filter?.id,
      },
      data: updateEntities,
    });

    return count === updateEntities.length ? updateEntities : [];
  }

  remove(options: DatabaseOptions<UserEntity>): Promise<UserEntity> {
    return this.prismaService.user.delete({ where: { id: options.filter?.id } });
  }
}
