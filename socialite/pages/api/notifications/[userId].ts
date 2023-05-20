import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/libs/prismadb';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'GET') return res.status(405).end();

    try {
        const { userId } = req.query;

        if (!userId || typeof userId !== 'string') throw new Error('Invalid id');
        //get users notifications
        const notifications = await prisma.notification.findMany({
            where: {
                userId
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        // let hasNotification to be false after getting seeing new
        // notifications
        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                hasNotification: false
            }
        });

        return res.status(200).json(notifications)
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}