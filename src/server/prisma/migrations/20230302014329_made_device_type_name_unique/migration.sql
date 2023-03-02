/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `DeviceType` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DeviceType_name_key" ON "DeviceType"("name");
