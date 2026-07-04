/*
  Warnings:

  - You are about to drop the column `userId` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `workingHours` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the `Appointment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Leave` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MedicationReminder` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `consultationFee` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTime` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `experience` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Doctor` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Appointment" DROP CONSTRAINT "Appointment_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Appointment" DROP CONSTRAINT "Appointment_patientId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Doctor" DROP CONSTRAINT "Doctor_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Leave" DROP CONSTRAINT "Leave_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."MedicationReminder" DROP CONSTRAINT "MedicationReminder_appointmentId_fkey";

-- DropIndex
DROP INDEX "public"."Doctor_userId_key";

-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "userId",
DROP COLUMN "workingHours",
ADD COLUMN     "availableDays" TEXT[],
ADD COLUMN     "consultationFee" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "endTime" TEXT NOT NULL,
ADD COLUMN     "experience" INTEGER NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "startTime" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."Appointment";

-- DropTable
DROP TABLE "public"."Leave";

-- DropTable
DROP TABLE "public"."MedicationReminder";
