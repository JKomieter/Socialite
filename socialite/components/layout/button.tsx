import React from 'react'
import { text } from 'stream/consumers'

interface ButtonProps {
    label: string,
    secondary: boolean,
    fullWidth?: boolean,
    disabled?: boolean,
    large?: boolean,
    onClick: () => void,
    outline?: boolean
}


const Button: React.FC<ButtonProps> = ({label, secondary,fullWidth, large, onClick, disabled, outline}) => {
  return (
    <button disabled={disabled} onClick={onClick} className={`
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-full
        font-semibold
        hover:opacity-80
        transition
        border-2
        ${fullWidth ? 'w-full' : 'w-fit'}
        ${secondary ? 'bg-white' : 'bg-[#9B59B6]'}
        ${secondary ? 'text-black' : 'text-white'}
        ${secondary ? 'border-black' : 'border-[#9B59B6]'}
        ${large ? 'text-xl' : 'text-md'}
        ${large ? 'px-5' : 'px-4'}
        ${large ? 'py-3' : 'py-2'}
        ${outline ? 'bg-transparent' : ''}
        ${outline ? 'border-white' : ''}
        ${outline ? 'text-white' : ''}
    `}>
        {label}
    </button>
  )
}

export default Button