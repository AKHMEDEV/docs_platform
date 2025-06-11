/*
  Warnings:

  - You are about to drop the column `commentId` on the `Reaction` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,documentId]` on the table `Reaction` will be added. If there are existing duplicate values, this will fail.
  - Made the column `documentId` on table `Reaction` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Reaction" DROP COLUMN "commentId",
ALTER COLUMN "documentId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Reaction_userId_documentId_key" ON "Reaction"("userId", "documentId");
