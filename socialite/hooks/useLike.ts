import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser"
import usePost from "./usePost";
import usePosts from "./usePosts";
import useLoginModal from "./useloginmodel";
import { toast } from "react-hot-toast";

import axios from "axios";

const useLike = ({ postId, userId } : {postId: string, userId?: string}) => {
    const { data: currentUser } = useCurrentUser();
    // fetch the post 
    const { data: fetchedPost, mutate: mutatedFetchedPost } = usePost(postId);

    // to refresh all post when liked
    // we add userId just in case we are liking individual user posts
    const { mutate: mutatedFetchedPosts } = usePosts(userId);

    const loginModal = useLoginModal();

    const hasLiked = useMemo(() => {
        // check if currentUser has already liked the post
        const list = fetchedPost?.likeIds || [];
        return list.includes(currentUser?.id);
    }, [fetchedPost?.id, currentUser?.id]);

    const toggleLike = useCallback(async() => {
        // if we are not logged in
        if (!currentUser) return loginModal.onOpen();

        try {
            let request;

            if (hasLiked) {
                request = () => axios.delete('/api/like', { data: { postId} })
            } else {
                request = () => axios.post('/api/like', { postId });
            }

            await request();

            // to reload all posts with updates
            mutatedFetchedPost()
            mutatedFetchedPosts()

            toast.success('Liked post')
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong')
        }
    }, [currentUser, hasLiked, postId, mutatedFetchedPost, mutatedFetchedPosts]);

    return {
        hasLiked,
        toggleLike
    }
}

export default useLike;