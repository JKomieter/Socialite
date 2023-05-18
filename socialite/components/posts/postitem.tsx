import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useloginmodel";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/router"
import React, { useCallback, useEffect, useMemo } from "react"
import Avatar from "../avatar";
import { AiOutlineHeart, AiFillHeart, AiOutlineMessage } from "react-icons/ai";
import useLike from "@/hooks/useLike";

interface PostItemProps {
    data?: Record<string, any>;
    userId?: string;
}

const PostItem: React.FC<PostItemProps> = ({data = {}, userId}) => {
    const router = useRouter();

    const loginModal = useLoginModal();

    
    const { data: currentUser } = useCurrentUser();
    
    const { toggleLike, hasLiked } = useLike({ postId: data.id, userId })

    useEffect(() => {
        console.log(data)
    }, [data]);


    const goToUser = useCallback((event: any) => {
        event.stopPropagation();

        router.push(`/users/${data?.user.id}`);
    }, [router, data?.user?.id || ''])

    const goToPost = useCallback(() => {
        router.push(`/posts/${data?.id}`);
    }, [router, data?.id]);


    const onLike = useCallback((event: any) => {
        event.stopPropagation();

        if (!currentUser) return loginModal.onOpen();

        toggleLike()
    }, [loginModal, currentUser]);

    const createdAt = useMemo(() => {
        if (!data?.createdAt) {
            return null;
        }

        return formatDistanceToNowStrict(new Date(data?.createdAt))
    }, [data?.createdAt]);

    const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart

    return (
        <div 
        onClick={goToPost}
        className="border-neutral-800
                    border-b-[1px]
                    p-5
                    cursor-pointer
                    hover:bg-neutral-800
                    transition
                    ">
            <div className="flex flex-row items-start gap-3">
                <Avatar userId={data?.user.id}/>
                <div>
                    <div className="
                        flex flex-row items-center gap-2
                    ">
                        <p 
                        onClick={goToUser}
                        className="
                            text-white
                            font-semibold
                            cursor-pointer
                            hover:underline
                        ">{data?.user.name}</p>
                        <span onClick={goToUser} 
                        className="text-neutral-500 
                        cursor-pointer hover:underline hidden md:block">
                            @{data?.user.username}
                        </span>
                        <span className="text-neutral-500 text-sm">
                            {createdAt} ago
                        </span>
                    </div>
                    <div className="text-white mt-1">
                        {data?.body}
                    </div>
                    <div className="flex flex-row items-center mt-3 gap-10">
                        <div className="
                            flex flex-row items-center
                            text-neutral-500
                            cursor-pointer
                            transition
                            gap-2
                            hover:text-[#0720ff]
                        ">
                            <AiOutlineMessage size={20}/>
                            <p>{data?.comments?.length || 0}</p>
                        </div>
                        <div 
                        onClick={onLike}
                        className="
                            flex flex-row items-center
                            text-neutral-500
                            cursor-pointer
                            transition
                            gap-2
                            hover:text-red-500
                        ">
                            <LikeIcon size={20} color={hasLiked ? 'red' : ''}/>
                            <p>{data?.likeIds.length || 0}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostItem;