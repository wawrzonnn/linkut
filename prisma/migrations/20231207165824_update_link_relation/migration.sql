-- CreateTable
CREATE TABLE `LinkStat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `linkId` INTEGER NOT NULL,
    `clickedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `referrer` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LinkStat` ADD CONSTRAINT `LinkStat_linkId_fkey` FOREIGN KEY (`linkId`) REFERENCES `Link`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
