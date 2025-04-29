/*
  Warnings:

  - You are about to drop the column `postType` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `_GameCommunityToUser` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,postId]` on the table `Favorites` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_GameCommunityToUser" DROP CONSTRAINT "_GameCommunityToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_GameCommunityToUser" DROP CONSTRAINT "_GameCommunityToUser_B_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "postType",
ADD COLUMN     "PostType" "PostType" NOT NULL DEFAULT 'text';

-- DropTable
DROP TABLE "_GameCommunityToUser";

-- CreateTable
CREATE TABLE "_UserCommunities" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_UserCommunities_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_UserCommunities_B_index" ON "_UserCommunities"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Favorites_userId_postId_key" ON "Favorites"("userId", "postId");

-- AddForeignKey
ALTER TABLE "_UserCommunities" ADD CONSTRAINT "_UserCommunities_A_fkey" FOREIGN KEY ("A") REFERENCES "GameCommunity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserCommunities" ADD CONSTRAINT "_UserCommunities_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
