import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST' && req.method !== 'GET') {
        return res.status(405).end();
    }

    try {
        
        if (req.method === 'POST') {
            const { currentUser } = await serverAuth(req, res);
            const { body } = req.body;

            const post = await prisma.post.create({
                data: {
                    body,
                    userId: currentUser.id
                }
            });

            return res.status(200).json(post);
        }

        if (req.method === 'GET') {
            const { userId } = req.query;

            console.log( `The userId is ${userId}` );
            
            let posts;
            
            if (userId && typeof userId === 'string') {
                // find post of specific user wiuth userId inqery string
                posts = await prisma.post.findMany({
                    where: {
                        userId
                    },
                    include: {
                        user: true,
                        comment: true
                    },
                    orderBy: {
                        createdAt: 'desc'
                    },
                });
            } else if (userId === 'undefined') {
                
                // feteching all posts do display on postffed
                posts = await prisma.post.findMany({
                    include: {
                        comment: true,
                        user: true,
                    }
                });

                // error when fetching all posts

                console.log(`The post is ${posts}`);
            }

            return res.status(200).json(posts);
        }
    } catch (error) {
        console.log({error: error});
        return res.status(400).end();
    }
}