import React, {useState} from 'react';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';
import {IconButton} from "@mui/material";

export const MenuBar = () => {
    const [isMenuOpened, setIsMenuOpened] = useState(false)
    return (
        <IconButton onClick={()=>setIsMenuOpened(!isMenuOpened)}>
            { isMenuOpened ? <MenuOpenOutlinedIcon/> : <ListOutlinedIcon/>}
        </IconButton>
    );
};

