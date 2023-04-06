import React, {ChangeEvent} from 'react';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import {IconButton} from "@mui/material";
import {ImageConverter} from "../../utils/convert-to-base64/imageConverter";

export const ImageUploader = () => {
    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files.length){
            const file = e.target.files[0]
            console.log('file:', file)
            ImageConverter(file, (file64: string)=>{
                console.log('file64', file64)
            })
        }
    }
    return (
        <IconButton component="label" color={'primary'} style={{width: '30px', position: 'absolute', top: '191px',right: '130px'}}>
            <CloudUploadOutlinedIcon/>
            <input type={'file'} style={{display: 'none'}} onChange={uploadHandler}/>
        </IconButton>
    );
};

