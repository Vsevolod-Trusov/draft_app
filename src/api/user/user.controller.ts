import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";

import { BaseService } from "gateways";

import { PartialUserDto, UserDto } from "./user.dto";
@Controller("user")
export class UserController {
  constructor(private readonly _userService: BaseService) {}

  @Post()
  create(@Body() user: UserDto) {
    return this._userService.createOne(user);
  }

  //http://localhost:3000/user
  @Get()
  getAll() {
    return this._userService.getAll();
  }

  @Get(":id")
  getOne(@Param("id") id: string) {
    return this._userService.getOne({ filter: { id: id } });
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: PartialUserDto) {
    return this._userService.updateOne({ filter: { id: id } }, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this._userService.remove({ filter: { id: id } });
  }
}
