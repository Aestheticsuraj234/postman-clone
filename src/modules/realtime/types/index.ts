import { DIRECTION, Prisma } from "@prisma/client";

export interface CreateWebSocketPresetInput {
  name: string;
  url: string;
  protocols?: Prisma.JsonValue;
  params?: Prisma.JsonValue;
  workspaceId: string;
}


export interface UpdateWebSocketPresetInput {
  name?: string;
  url?: string;
  protocols?: Prisma.JsonValue | null;
  params?: Prisma.JsonValue;
}


export type WebSocketMessageDirection = DIRECTION

export interface SaveWebSocketMessageInput {
  presetId?: string;
  connectionId?: string;
  direction: WebSocketMessageDirection;
  payload?: string;
  size?: number;
  meta?: Prisma.JsonValue;
}
