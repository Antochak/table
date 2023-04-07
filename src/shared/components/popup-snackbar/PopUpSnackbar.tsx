import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {SnackType} from "../../constants/snackType";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type ErrorSnackBarType = {
    popUpType: SnackType
    error: string
}
export const PopUpSnackbar:React.FC<ErrorSnackBarType> = ({error,popUpType}) => {
    const handleClose = (event?: React.SyntheticEvent<any> | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
    };

    return (
        <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={popUpType} sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    );
}
