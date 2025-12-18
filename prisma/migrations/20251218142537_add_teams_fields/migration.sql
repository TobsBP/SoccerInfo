-- AlterTable
ALTER TABLE "Teams" ADD COLUMN     "city" TEXT,
ADD COLUMN     "colors" TEXT,
ADD COLUMN     "country" TEXT NOT NULL DEFAULT 'Brasil',
ADD COLUMN     "foundedYear" INTEGER,
ADD COLUMN     "socialMedia" TEXT,
ADD COLUMN     "stadium" TEXT,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "titlesCup" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "titlesIntl" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "titlesLeague" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "titlesTotal" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "website" TEXT;
