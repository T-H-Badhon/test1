/*
  Warnings:

  - The `status` column on the `Booking` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "bookingStatus" AS ENUM ('PENDING', 'BOOKED', 'REJECTED');

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "status",
ADD COLUMN     "status" "bookingStatus" NOT NULL DEFAULT 'PENDING';
