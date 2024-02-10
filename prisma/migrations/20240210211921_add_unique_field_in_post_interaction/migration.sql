/*
  Warnings:

  - A unique constraint covering the columns `[post_id,user_id]` on the table `PostInteraction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `PostInteraction_post_id_user_id_key` ON `PostInteraction`(`post_id`, `user_id`);
