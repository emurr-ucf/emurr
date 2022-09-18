/*
  Warnings:

  - You are about to alter the column `tourTitle` on the `Tour` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `Tour` MODIFY `tourTitle` VARCHAR(191) NOT NULL,
    MODIFY `tourDescription` VARCHAR(255) NULL;
