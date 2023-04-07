import React, { ChangeEvent } from 'react';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import { IconButton } from "@mui/material";
import { ImageConverter } from "../../utils/convert-to-base64/imageConverter";

type ImageUploaderPropsType = {
    top?: string
    right?: string
    left?:string
    bottom?: string
    onUploadClick:(file64: string)=>void
}

export const ImageUploader:React.FC<ImageUploaderPropsType> = (
    {
        top,
        right,
        left,
        bottom,
        onUploadClick
    }) => {
    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            console.log('file:', file)
            ImageConverter(file, (file64: string) => {
                onUploadClick(file64)
            })
        }
    }

    return (
        <>
            <IconButton
                component="label"
                color={'primary'}
                style={{width: '30px', transform: 'rotate(45deg)',position: 'absolute', top: top, right: right, bottom: bottom, left: left}}>
                <AttachFileOutlinedIcon/>
                <input type={'file'} style={{display: 'none'}} onChange={uploadHandler}/>
            </IconButton>
        </>
    );
};

