import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateCommentDto, UpdateCommentDto } from './dtos';
import { CheckAuthGuard } from 'src/guards';
import { CommentService } from './coment.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  @ApiOperation({summary:"getall"})
  async getAllComments() {
    return this.commentService.getAllComments();
  }
  
  @ApiOperation({summary:"get one"})
  @Get(':id')
  async getOneComment(@Param('id') id: string) {
    return this.commentService.getOne(id);
  }
  
  @ApiOperation({summary:"create"})
  @UseGuards(CheckAuthGuard)
  @Post()
  async createComment(@Body() payload: CreateCommentDto) {
    return this.commentService.create(payload);
  }
  
  @UseGuards(CheckAuthGuard)
  @ApiOperation({summary:"update"})
  @Patch(':id')
  async updateComment(
    @Param('id') id: string,
    @Body() payload: UpdateCommentDto,
    @Req() req,
  ) {
    const userId = req.user.id;
    return this.commentService.update(id, userId, payload);
  }
  
  @UseGuards(CheckAuthGuard)
  @ApiOperation({summary:"delete"})
  @Delete(':id')
  async deleteComment(@Param('id') id: string, @Req() req) {
    const userId = req.user.id;
    return this.commentService.delete(id, userId);
  }
}
