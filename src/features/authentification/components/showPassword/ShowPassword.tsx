import React from 'react';
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";

export type ShowPasswordPropsType = {
    showPassword?: 'password' | 'text'
    setShowPassword: (value: 'password' | 'text')=>void
}

export const ShowPassword: React.FC<ShowPasswordPropsType> = ({showPassword, setShowPassword}) => {

    const handleClickShowPassword = () => {
        showPassword==='password' ?  setShowPassword('text') :  setShowPassword('password')
        console.log(showPassword)
    }
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <>
            <InputAdornment position="end">
                <IconButton
                    size={'small'}
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                >
                    {showPassword === 'password' ? <Visibility/> : <VisibilityOff/>}
                </IconButton>
            </InputAdornment>
        </>
    );
};

