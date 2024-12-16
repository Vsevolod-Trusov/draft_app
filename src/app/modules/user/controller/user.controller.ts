import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Params, Public, Routes } from 'core';
import { AbstractBaseUseCase } from 'gateways';

import { PartialUserDto, UserDto } from '../dto/user.dto';

@ApiTags('Users')
@Public()
@Controller(Routes.UsersPrefix)
export class UserController {
  constructor(private readonly _userService: AbstractBaseUseCase) {}

  @Post()
  create(@Body() user: UserDto) {
    return this._userService.createOne(user);
  }

  @Get('/fail')
  fail() {
    process.exit(-1);
    throw new Error('server failed');
  }

  @Get()
  getAll() {
    return this._userService.getAll();
  }

  @Get(Routes.ById)
  getOne(@Param(Params.Id) id: string) {
    return this._userService.getOne({ filter: { id: id } });
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
