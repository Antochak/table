import * as React from 'react';
import { Box } from '@mui/material/';
import { CircularProgress } from "@mui/material/";

export const CircularLoader = () => {
    return (
        <Box sx={{ display: 'flex' , margin: '50% auto', position: 'absolute', zIndex: '3'}}>
            <CircularProgress />
        </Box>
    );
}