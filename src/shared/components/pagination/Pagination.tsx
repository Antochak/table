import * as React from 'react';
import { Pagination } from '@mui/material/';
import Stack from '@mui/material/Stack';
import { ChangeEvent } from "react";

type PaginationPropsType = {
    currentPage: number
    pageQuantity: number
    onChange:(value: string)=>void
}
export const Paginations:React.FC<PaginationPropsType> = ({pageQuantity,currentPage,onChange}) => {
    const onChangeHandle = (event: ChangeEvent<unknown>, page: number) => onChange(page.toString())
    return (
        <Stack spacing={2} >
            <Pagination count={pageQuantity} page={currentPage} onChange={onChangeHandle} shape="rounded" />
        </Stack>
    );
}