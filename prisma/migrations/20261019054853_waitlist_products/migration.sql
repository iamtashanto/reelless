-- AlterTable
ALTER TABLE "WaitlistEntry" ADD COLUMN     "products" TEXT[] DEFAULT ARRAY[]::TEXT[];
