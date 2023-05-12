import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined
}
//prevent from creating a bunch of new instances 
//won't be affected by hot reload
const client = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;