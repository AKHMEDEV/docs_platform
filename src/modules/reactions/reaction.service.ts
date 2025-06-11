import { Injectable } from '@nestjs/common';
import { ReactionType } from '@prisma/client';
import { PrismaService } from 'src/prisma';

@Injectable()
export class ReactionService {
  constructor(private prisma: PrismaService) {}

  async toggleReaction(userId: string, documentId: string) {
    const existing = await this.prisma.reaction.findFirst({
      where: {
        userId,
        documentId,
      },
    });

    let finalType: ReactionType;

    if (!existing) {
      finalType = ReactionType.LIKE;
      await this.prisma.reaction.create({
        data: {
          userId,
          documentId,
          type: finalType,
        },
      });
    } else {
      finalType =
        existing.type === ReactionType.LIKE
          ? ReactionType.DISLIKE
          : ReactionType.LIKE;

      await this.prisma.reaction.update({
        where: { id: existing.id },
        data: { type: finalType },
      });
    }

    return {
      reaction: finalType,
    };
  }

  async getLikeCount(documentId: string) {
    const count = await this.prisma.reaction.count({
      where: {
        documentId,
        type: ReactionType.LIKE,
      },
    });

    return { documentId, likeCount: count };
  }
}
