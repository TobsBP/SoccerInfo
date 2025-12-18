-- AlterTable
ALTER TABLE "Players" ADD COLUMN     "lastTeams" TEXT[] DEFAULT ARRAY[]::TEXT[];
