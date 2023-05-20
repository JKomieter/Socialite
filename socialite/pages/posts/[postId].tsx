import Form from "@/components/form";
import Header from "@/components/header";
import PostItem from "@/components/posts/postitem";
import usePost from "@/hooks/usePost";
import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";
import CommentFeed from "@/components/posts/comment";

const PostView = () => {
    const router = useRouter();
    // get post id and use it to fetch all data about it
    const { postId } = router.query;

    const { data: fetchedPost, isLoading } = usePost(postId as string);

    if (isLoading || !fetchedPost) {
        return (
            <div className="flex justify-center items-center h-full">
                <ClipLoader color="#9B59B6" size={80}/>
            </div>
        )
    }

    return (
        <>
            <Header label='Slite' showBackArrow/>
            <PostItem data={fetchedPost}/>
            <Form 
                postId={postId as string}
                isComment
                placeholder='Slite your reply'
                />
            <CommentFeed comments={fetchedPost?.comment}/>
        </>
    )
}

export default PostView;