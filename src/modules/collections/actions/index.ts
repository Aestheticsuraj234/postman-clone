"use server";

import db from "@/lib/db";

export const createCollection = async (workspaceId: string, name: string) => {
  const collection = await db.collection.create({
    data: {
      name,
      workspace: {
        connect: {
          id: workspaceId,
        },
      },
    },
  });

  return collection;
};

export const getCollections = async (workspaceId: string) => {
  const collections = await db.collection.findMany({
    where: {
      workspaceId,
    },
  });

  return collections;
};


export const deleteCollection = async (collectionId: string) => {
  await db.collection.delete({
    where: {
      id: collectionId,
    },
  });
};

export const editCollection = async (collectionId: string, name: string) => {
  await db.collection.update({
    where: {
      id: collectionId,
    },
    data: {
      name,
    },
  });
};