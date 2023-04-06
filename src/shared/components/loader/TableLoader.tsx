import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export const TableLoader = () => {
    return (
        <Box sx={{ width: 300 }}>
            <Skeleton />
            <Skeleton animation="pulse" />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
        </Box>
    );
}