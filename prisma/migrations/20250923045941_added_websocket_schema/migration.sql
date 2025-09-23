-- CreateTable
CREATE TABLE "public"."WebSocketPreset" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "protocols" JSONB,
    "params" JSONB,
    "workspaceId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WebSocketPreset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."WebsocketMessage" (
    "id" TEXT NOT NULL,
    "presetId" TEXT,
    "connectionId" TEXT,
    "direction" TEXT NOT NULL,
    "payload" TEXT,
    "size" INTEGER,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "meta" JSONB,

    CONSTRAINT "WebsocketMessage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."WebSocketPreset" ADD CONSTRAINT "WebSocketPreset_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "public"."Workspace"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WebsocketMessage" ADD CONSTRAINT "WebsocketMessage_presetId_fkey" FOREIGN KEY ("presetId") REFERENCES "public"."WebSocketPreset"("id") ON DELETE SET NULL ON UPDATE CASCADE;
