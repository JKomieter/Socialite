import useLoginModal from '@/hooks/useloginmodel'
import React, { useCallback, useState, useEffect } from 'react'
import Input from '../layout/input';
import Modal from '../modal';
import useRegisterModal from '@/hooks/useregistermodal';

const LoginModals = () => {
    const loginModals = useLoginModal()
    const registerModals = useRegisterModal()
    
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ isLoading, setIsLoading ] = useState(false);

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true)
            //todo add login
            loginModals.onClose()
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }, [loginModals])

    const onToggle = useCallback(() => {
        if (isLoading) {
            return;
        }
        loginModals.onClose();
        registerModals.onOpen()
    }, [isLoading, registerModals, loginModals])


    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input 
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                value={email}
            />
            <Input 
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                value={password}
            />
        </div>
    )

    const footerContent = (
        <div className="text-neutral-400 text-center mt-4">
            <p>
                Don't have an account?
                <span onClick={onToggle} className='text-white cursor-pointer hover:underline'> Create an account </span>
            </p>
        </div>
    )

    return (
        <div>
            <Modal
                disabled={isLoading}
                isOpen={loginModals.isOpen}
                title='Login'
                actionLabel='Sign in'
                onClose={loginModals.onClose}
                onSubmit={onSubmit}
                body={bodyContent}
                footer={footerContent}
            />
        </div>
    )
}

export default LoginModals