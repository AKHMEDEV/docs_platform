import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dtos';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Protected, Roles } from 'src/decorators';
import { Role } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Protected(true)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'get all users' })
  @Get()
  async getAll() {
    return this.userService.getAll();
  }

  @Protected(true)
  @Roles(Role.USER, Role.ADMIN)
  @ApiOperation({ summary: 'create users' })
  @Post()
  async create(@Body() payload: CreateUserDto) {
    return this.userService.create(payload);
  }

  @Put(':id')
  @Protected(true)
  @Roles(Role.USER, Role.ADMIN)
  @ApiOperation({ summary: 'update user' })
  async update(@Param('id') id: string, @Body() payload: UpdateUserDto) {
    return this.userService.update(id, payload);
  }
  @Protected(true)
  @Roles(Role.USER, Role.ADMIN)
  @ApiOperation({ summary: 'delete user' })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.userService.delete(id);
  }
}
