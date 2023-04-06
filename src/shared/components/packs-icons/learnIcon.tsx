import React from 'react';
import { IconButton } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
type LearnIconPropsType = {
    packId: string
    disabled: boolean
}
export const LearnIcon:React.FC<LearnIconPropsType> = ({packId,disabled}) => {
    const navigate = useNavigate()

    const openLearnPageHandler = (id: string) => {
        navigate(`/learn/${id}`)
    }
    return (
        <>
            <IconButton disabled={disabled} onClick={()=>openLearnPageHandler(packId)}>
                <SchoolIcon style={{cursor: "pointer"}}/>
            </IconButton>
        </>
    );
};

