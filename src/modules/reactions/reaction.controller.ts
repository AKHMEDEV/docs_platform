import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { ApiBody } from '@nestjs/swagger';
import { ToggleReactionDto } from './dtos';

@Controller('reactions')
export class ReactionController {
  constructor(private readonly reactionService: ReactionService) {}

  @Post('toggle')
  @ApiBody({ type: ToggleReactionDto })
  async toggleReaction(@Body() dto: ToggleReactionDto) {
    return this.reactionService.toggleReaction(dto.userId, dto.documentId);
  }

  @Get('likes/count')
  async getLikeCount(@Query('documentId') documentId: string) {
    return this.reactionService.getLikeCount(documentId);
  }
}
