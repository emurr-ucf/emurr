-- AlterTable
ALTER TABLE `Page` ADD COLUMN `deletable` BOOLEAN NOT NULL DEFAULT true,
    MODIFY `content` TEXT NULL;
