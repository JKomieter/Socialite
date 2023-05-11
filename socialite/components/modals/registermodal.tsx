import useLoginModal from '@/hooks/useloginmodel'
import React, { useCallback, useState, useEffect } from 'react'
import Input from '../layout/input';
import Modal from '../modal';
import useRegisterModal from '@/hooks/useregistermodal';

const RegisterModals = () => {
    const loginModals = useLoginModal();
    const registerModals = useRegisterModal();
    
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ name, setName ] = useState("");
    const [ username, setUsername ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true)
            //todo add register and login
            registerModals.onClose()
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }, [registerModals]);

    const onToggle = useCallback(() => {
        if (isLoading) {
            return;
        }
        registerModals.onClose();
        loginModals.onOpen()
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
                placeholder='Name'
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
                value={name}
            /><Input 
                placeholder='Username'
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                value={username}
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
                Already have an account?
                <span onClick={onToggle} className='text-white cursor-pointer hover:underline'> Sign in </span>
            </p>
        </div>
    )

    return (
        <div>
            <Modal
                disabled={isLoading}
                isOpen={registerModals.isOpen}
                title='Create an account'
                actionLabel='Register'
                onClose={registerModals.onClose}
                onSubmit={onSubmit}
                body={bodyContent}
                footer={footerContent}
            />
        </div>
    )
}

export default RegisterModals