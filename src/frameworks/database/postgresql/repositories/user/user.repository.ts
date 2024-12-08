import { Injectable } from "@nestjs/common";
import { UserEntity } from "frameworks";
import { BaseRepository, DatabaseOptions } from "gateways";
import { PrismaService } from "../../prisma.service";

@Injectable()
export class UserRepository extends BaseRepository<UserEntity> {
  constructor(private readonly prismaService: PrismaService) {
    super();
  }

  findAll(options: DatabaseOptions<UserEntity> = {}): Promise<UserEntity[]> {
    return this.prismaService.user.findMany();
  }
  findOne(options: DatabaseOptions<UserEntity>): Promise<UserEntity> {
    return new Promise((resolve) => {
      resolve(new UserEntity("1", "name", "", "", "", "", true, 1));
    });
  }
  createOne(creatingEntity: UserEntity): Promise<UserEntity> {
    return new Promise((resolve) => {
      resolve(new UserEntity("1", "name", "", "", "", "", true, 1));
    });
  }
  createMany(creatingEntities: UserEntity[]): Promise<UserEntity[]> {
    return new Promise((resolve) => {
      resolve([new UserEntity("1", "name", "", "", "", "", true, 1)]);
    });
  }
  updateOne(
    options: DatabaseOptions<UserEntity>,
    updateEntity: UserEntity
  ): Promise<UserEntity> {
    return new Promise((resolve) => {
      resolve(new UserEntity("1", "name", "", "", "", "", true, 1));
    });
  }
  updateMany(
    options: DatabaseOptions<UserEntity>,
    updateEntities: UserEntity[]
  ): Promise<UserEntity[]> {
    return new Promise((resolve) => {
      resolve([new UserEntity("1", "name", "", "", "", "", true, 1)]);
    });
  }

  remove(options: DatabaseOptions<UserEntity>): Promise<UserEntity[]> {
    return new Promise((resolve) => {
      resolve([new UserEntity("1", "name", "", "", "", "", true, 1)]);
    });
  }
}
