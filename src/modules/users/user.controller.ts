import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
  Patch,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dtos';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
} from '@nestjs/swagger';
import { Protected, Roles } from 'src/decorators';
import { CheckAuthGuard } from 'src/guards';
import { FileInterceptor } from '@nestjs/platform-express';
import { CheckFileSizePipe } from './pipes';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Protected(true)
  @ApiOperation({ summary: 'get all users' })
  @Get()
  async getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'get one' })
  async getOne(@Param('id') id: string) {
    return this.userService.getOne(id);
  }
  @Get(':id')
  @ApiOperation({ summary: 'Me' })
  async getMe(@Param('id') id:string) {
    return this.userService.getMe(id);
  }

  @Protected(true)
  @ApiOperation({ summary: 'create users' })
  @Post()
  async create(@Body() payload: CreateUserDto) {
    return this.userService.create(payload);
  }

  @Put(':id')
  @Protected(true)
  @ApiOperation({ summary: 'update user' })
  async update(@Param('id') id: string, @Body() payload: UpdateUserDto) {
    return this.userService.update(id, payload);
  }
  @Protected(true)
  @ApiOperation({ summary: 'delete user' })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.userService.delete(id);
  }

  @Patch('upload-image')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
        id: { type: 'string' },
      },
    },
  })
  async uploadImage(
    @UploadedFile(new CheckFileSizePipe(5)) file: Express.Multer.File,
    @Body('id') id: string,
  ) {
    return this.userService.updateUserImage(id, file);
  }
}
