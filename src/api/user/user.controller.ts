import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { IUserService } from 'gateways/service/user-service.interface';
import { PartialUserDto, UserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: IUserService) {}

  @Post()
  create(@Body() user: UserDto) {
    return this.userService.createOne(user);
  }

  @Get()
  getAll() {
    return this.userService.getAll({});
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.userService.getOne({ filter: { id: id } });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: PartialUserDto) {
    return this.userService.updateOne({ filter: { id: id } }, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove({ filter: { id: id } });
  }
}
