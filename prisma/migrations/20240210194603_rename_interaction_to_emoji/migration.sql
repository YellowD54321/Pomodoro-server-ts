/*
  Warnings:

  - You are about to drop the column `interaction` on the `PostInteraction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `PostInteraction` DROP COLUMN `interaction`,
    ADD COLUMN `emoji` ENUM('LIKE', 'WOW', 'HEART') NULL;
