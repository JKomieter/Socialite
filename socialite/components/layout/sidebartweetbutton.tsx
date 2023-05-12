import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { FaFeather } from 'react-icons/fa';
import useLoginModal from '@/hooks/useloginmodel';

const SidebarTweetButton = () => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const onHandleClick = useCallback(() => {
        loginModal.onOpen();
    }, [])

    return (
        <div onClick={onHandleClick}>
            <div className="mt-6 lg:hidden rounded-full h-14 w-14 flex items-center justify-center bg-[#9B59B6] hover:bg-opacity-70 transition cursor-pointer">
                <FaFeather size={24} color='white'/>
            </div>
            <div className="mt-6 hidden lg:block px-4 py-6 rounded-full bg-[#9B59B6] hover:bg-opcaity-70 cursor-pointer transition">
                <p className='hidden lg:block text-center text-white text-[20px]'>
                    Slite
                </p>
            </div>
        </div>
    )
}

export default SidebarTweetButton;