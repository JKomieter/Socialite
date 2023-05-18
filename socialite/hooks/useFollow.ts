import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser"
import useUser from "./useUser";
import useLoginModal from "./useloginmodel";
import toast from "react-hot-toast";
import axios from "axios"

const useFollow = (userId: string) => {
    const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();

    const { mutate: mutateFetchedUser } = useUser(userId);

    const loginModal = useLoginModal();

    //check if user already follows
    const isFollowing = useMemo(() => {
        const list = currentUser?.followingId || [];
        //check list of currentUser followingId
        return list.includes(userId);
    }, [userId, currentUser?.followingId]);

    const toggleFollow = useCallback(async () => {
        if (!currentUser) loginModal.onOpen();

        try {
            let request;

            if (isFollowing) {
                //special for delete request
                request = () => axios.delete("/api/follow", {data: {userId}})
            } else {
                request = () => axios.post("/api/follow", {userId})
            }

            await request();
            
            mutateCurrentUser();
            mutateFetchedUser();

            toast.success("Success");
        } catch (error) {
            toast.error("Something went wrong.");
            console.log(error);
        }
    }, [isFollowing, currentUser, userId, mutateCurrentUser, mutateFetchedUser, loginModal])


    return {
        isFollowing,
        toggleFollow
    }
}

export default useFollow;