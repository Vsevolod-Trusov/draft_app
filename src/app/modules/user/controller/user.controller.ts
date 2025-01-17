import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { GlobalFilter, Params, QueryOptions, Routes } from 'core';
import { AbstractUserUseCase } from 'gateways';
import { Public } from 'libs';

import { CombinedExpression } from 'core/utils/parseFilter';
import { PartialUserDto, UserDto } from '../dto';

@ApiTags('Users')
@Public()
@Controller(Routes.UsersPrefix)
export class UserController {
  constructor(private readonly _userService: AbstractUserUseCase) {}

  @Post()
  create(@Body() user: UserDto) {
    return this._userService.createOne(user);
  }

  @Get()
  getAll(
    @Query()
    options: QueryOptions,
  ) {
    return this._userService.getAll();
  }

  @Get(Routes.ById)
  getOne(@Param(Params.Id) id: string) {
    return this._userService.getOne({ filter: { id: id } });
  }

  @Get('/filter')
  getByFilter(@GlobalFilter() filter: CombinedExpression) {
    console.log(JSON.stringify(filter, null, 2));

    return this._userService.getByFilter(filter);
  }

  @Put(Routes.ById)
  update(@Param(Params.Id) id: string, @Body() updateUserDto: PartialUserDto) {
    return this._userService.updateOne({ filter: { id: id } }, updateUserDto);
  }

  @Patch(Routes.ById)
  partialUpdate(@Param(Params.Id) id: string, @Body() updateUserDto: PartialUserDto) {
    return this._userService.updateOne({ filter: { id: id } }, updateUserDto);
  }

  @Delete(Routes.ById)
  remove(@Param(Params.Id) id: string) {
    return this._userService.remove({ filter: { id: id } });
  }
}
