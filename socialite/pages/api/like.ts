import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";


import prisma from '@/libs/prismadb'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST' && req.method !== 'DELETE') {
        return res.status(400).end();
    }

    try {
        // get the postID and current User
        const { postId } = req.body;

        const { currentUser } = await serverAuth(req, res);

        if (!postId || typeof postId !== 'string') throw new Error('Invalid id');

        const post = await prisma.post.findUnique({
            where: {
                id: postId
            }
        })

        if (!post) throw new Error('Invalid id');
        // number of likes is determined by likeIds in the array
        let updatedLikeIds = [...(post.likeIds || [])];

        if (req.method === 'POST') {
            // the current user is the one liking the post
            updatedLikeIds.push(currentUser.id)
        }

        if (req.method === 'DELETE') {
            // get all ids except currentUser when he dislikes
            console.log(postId)

            updatedLikeIds = updatedLikeIds.filter(
                updatedLikeId => updatedLikeId !== currentUser.id);
        }

        const updatedPost = await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                likeIds: updatedLikeIds
            }
        })

        return res.status(200).json(updatedPost)

    } catch (error) {
        console.log(error);
        return res.status(405).end();
    }
}