import React from "react";

interface InputProps {
    placeholder?: string,
    value?: string,
    type?: string,
    disabled?: boolean,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
}


const Input: React.FC<InputProps> = ({
    placeholder,
    value,
    type,
    disabled,
    onChange
}) => {
    return (
        <input placeholder={placeholder} disabled={disabled} value={value} type={type} onChange={onChange}
        className="w-full p-4 text-lg bg-black border-2 
        border-neutral-800 rounded-md outline-none 
        text-white focus:border-[#9B59B6] focus:border-2 
        transition disabled:bg-nuetral-900 
        disabled:opacity-70 disabled:cursor-not-allowed"/>
    )
}

export default Input