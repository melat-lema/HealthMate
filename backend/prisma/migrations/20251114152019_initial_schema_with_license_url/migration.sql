-- CreateEnum
CREATE TYPE "Specialization" AS ENUM ('Cardiology', 'InterventionalCardiology', 'CardiacSurgery', 'HeartFailureSpecialist');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "license_url" TEXT;
