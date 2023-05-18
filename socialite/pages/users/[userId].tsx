import Header from "@/components/header"
import useUser from "@/hooks/useUser";
import { useRouter } from "next/router"
import { ClipLoader } from "react-spinners";
import UserHero from "@/components/users/userHero";
import UserBio from "@/components/users/userBio";
import PostFeed from "@/components/posts/postfeed";

const UserView = () => {
    const router = useRouter()

    const { userId } = router.query;

    const { data: fetchedUser, isLoading } = useUser(userId as string)

    if (isLoading || !fetchedUser) {
        return (
            <div className="flex justify-center items-center h-full">
                <ClipLoader color='#9B59B6' size={80}/>
            </div>
        )
    } 

    return (
        <>
            <Header showBackArrow label={fetchedUser?.name}/>
            <UserHero userId={userId as string}/>
            <UserBio userId={userId as string}/>
            <PostFeed userId={userId as string}/>
        </>
    )
}

export default UserView