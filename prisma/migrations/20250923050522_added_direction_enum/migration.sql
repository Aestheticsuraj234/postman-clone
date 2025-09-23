/*
  Warnings:

  - The `direction` column on the `WebsocketMessage` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."DIRECTION" AS ENUM ('INCOMING', 'OUTGOING');

-- AlterTable
ALTER TABLE "public"."WebsocketMessage" DROP COLUMN "direction",
ADD COLUMN     "direction" "public"."DIRECTION" NOT NULL DEFAULT 'INCOMING';
