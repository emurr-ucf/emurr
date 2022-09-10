/*
  Warnings:

  - You are about to drop the column `firstName` on the `User` table. All the data in the column will be lost.
  - Added the required column `emailToken` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resPassToken` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resPassword` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `firstName`,
    ADD COLUMN `emailToken` VARCHAR(255) NOT NULL,
    ADD COLUMN `emailVerified` DATETIME(3) NULL,
    ADD COLUMN `name` VARCHAR(191) NULL,
    ADD COLUMN `password` VARCHAR(255) NOT NULL,
    ADD COLUMN `registeredAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `resPassToken` VARCHAR(255) NOT NULL,
    ADD COLUMN `resPassword` INTEGER NOT NULL,
    ADD COLUMN `verifyEmail` BOOLEAN NOT NULL DEFAULT false;
