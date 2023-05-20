import usePosts from "@/hooks/usePosts";
import React, { useEffect } from "react";
import PostItem from "./postitem";

interface PostFeedProps {
    userId?: string,
}


const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
    const { data: posts = [] } = usePosts(userId)

    useEffect(() => {
        console.log(posts);
    }, [posts]);

    return (
        <>
            {
                posts.map((post: Record<string, any>) => (
                    <PostItem
                        userId={userId}
                        key={post.id}
                        data={post}
                    />
                ))
            }
        </>
    )
}

export default PostFeed;