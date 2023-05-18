import Image from "next/image";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";


interface ImageUploads {
    value?: string,
    onChange: (base64: string) => void,
    label: string,
    disabled?: boolean
}

const ImageUpload: React.FC<ImageUploads> = ({
    value,
    onChange,
    label,
    disabled
}) => {
    const [ base64, setBase64 ] = useState(value);

    const handleChange = useCallback((base64: string) => {
        onChange(base64);
    }, [onChange]);

    const handleDrop = useCallback((files: any) => {
        const file = files[0];
        const reader = new FileReader();
        //convert file into base64

        reader.onload = (event: any) => {
            setBase64(event.target.result);
            handleChange(event.target.result);
        }

        reader.readAsDataURL(file)
    }, [handleChange]);

    const { getRootProps, getInputProps } = useDropzone({
        maxFiles: 1,
        onDrop: handleDrop,
        disabled,
        accept: {
            'image/jpeg': [],
            'image/png': []
        }
    })

    return (
        <div {...getRootProps({
            className: 'w-full p-4 text-white text-center border-2 border-dotted rounded-md border-[#9B59B6] cursor-pointer'
        })}>
            <input {...getInputProps()} />
            {
                base64 ? (
                    <div className="flex items-center justify-center">
                        <Image
                            src={base64}
                            height='100'
                            width='100'
                            alt='Uploaded Image'
                        />
                    </div>
                ) : (
                    <p className="text-white">{label}</p>
                )
            }
        </div>
    )
}

export default ImageUpload;