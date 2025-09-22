"use server";

import db from "@/lib/db";
import { REST_METHOD } from "@prisma/client";


export interface Request {
    name: string;
    method: REST_METHOD;
    url: string;
    body?: string;
    headers?: string;
    response?: string;
}

export const addRequestToCollection = async (collectionId:string , value:Request)=>{
  const request = await db.request.create({
    data:{
        collectionId,
        name: value.name,
        method: value.method,
        url: value.url,
        body: value.body,
        headers: value.headers
    }
  });

  return request;
}

export const saveRequest = async (id:string, value:Request)=>{

  console.log(value , id);
const request =  await db.request.update({
    where: {
      id: id
    },
    data: {
      name: value.name,
      method: value.method,
      url: value.url,
      body: value.body,
      headers: value.headers
    },
  });

  return request;
}

export const getAllRequestFromCollection = async (collectionId:string)=>{
  const requests = await db.request.findMany({
    where: {
      collectionId,
    },
  });
  return requests;
}