import { NextApiRequest, NextApiResponse } from "next";

import prisma from '@/libs/prismadb';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // this handles the request to get a specific post
    if (req.method !== 'GET') return res.status(405).end();

    try {
        // get postId from request query
        const { postId } = req.query;

        if (!postId || typeof postId !== 'string') throw new Error('Invalid id');

        // include the user and users who commented 
        const post = await prisma.post.findUnique({
            where: {
                id: postId
            },
            include: {
                user: true,
                comment: {
                    include: {
                        user: true
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            }
        });

        return res.status(200).json(post);

    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}