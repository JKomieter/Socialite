import { useRouter } from 'next/router'
import React from 'react'
import { Tb3DCubeSphere } from "react-icons/tb"


const SidebarLogo = () => {
    const router = useRouter()

    return (
        <div onClick={() => router.push("/")} className='rounded-full w-14 h-14 p-4 flex items-center justify-center hover:bg-[#9B59B6] hover:bg-opacity-10 cursor-pointer transition'>
            <Tb3DCubeSphere size={30} color='white'/>
        </div>
    )
}

export default SidebarLogo
