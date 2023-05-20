import useCurrentUser from "@/hooks/useCurrentUser";
import usePosts from "@/hooks/usePosts";
import useLoginModal from "@/hooks/useloginmodel";
import useRegisterModal from "@/hooks/useregistermodal";
import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios"
import Button from "./layout/button";
import Avatar from "./avatar";
import usePost from "@/hooks/usePost";

interface FormProps {
    placeholder: string,
    isComment?: boolean,
    postId?: string
}

const Form: React.FC<FormProps> = ({
    placeholder,
    isComment,
    postId
}) => {
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal();

    const { data: currentUser } = useCurrentUser();

    const { mutate: mutatePosts } = usePosts();
    const { mutate: mutatePost } = usePost(postId as string)

    const [ body, setBody ] = useState("");
    const [ isloading, setisLoading ] = useState(false);

    const onSubmit = useCallback(async () => {
        try {
            setisLoading(true);

            //check whether we are posting a comment or new feed
            const url = isComment ? 
                `/api/comment?postId=${postId}` : 
                '/api/posts';

            await axios.post(url, { body });

            toast.success("Slite created successfully!");

            setBody("");
            //load new ones whith existing ones
            mutatePosts();
            mutatePost()
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong.");
        } finally {
            setisLoading(false)
        }
    }, [body, mutatePosts, mutatePost, isComment, postId])

    return (
        <div className="border-b-[1px] border-neutral-800 px-5 py-2">
            {currentUser ? (
                <div className='flex flex-row gap-4'>
                    <div className="">
                        <Avatar userId={currentUser?.id}/>
                    </div>
                    <div className="w-full">
                        <textarea
                            disabled={isloading}
                            onChange={(e) => setBody(e.target.value)}
                            value={body}
                            className="disabled:opacity:70 peer resize-none mt-3 
                            w-full bg-black ring-0 outline-none text-[20px] 
                            placeholder-neutral-500 text-white"
                            placeholder={placeholder}
                        ></textarea>
                        <hr className="opacity-0 peer-focus:opacity-100 h-[1px] 
                        w-full border-[#9B59B6] transition ease-in-out"/>
                        <div className="flex flex-row justify-end mt-4">
                            <Button label="Slite" disabled={isloading || !body} onClick={onSubmit}/>
                        </div>
                    </div>
                </div>
                ) : (
                    <div className='py-8'>
                        <h1 className="text-white text-2xl text-center mb-4 font-bold">
                            Welcome to Socialite
                        </h1>
                        <div className='flex flex-row items-center justify-center gap-4'>
                            <Button label='Login' onClick={loginModal.onOpen}/>
                            <Button 
                                label="Register" 
                                onClick={registerModal.onOpen}
                                secondary
                            />
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Form;