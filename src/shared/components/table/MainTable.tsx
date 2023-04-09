import React, { ReactNode } from 'react';
import {Paper, Table, TableBody, TableContainer, TableHead, TableRow} from "@mui/material";

export type TablePropsType = {
    tableBody: ReactNode
    tableHead: ReactNode
}
export const MainTable:React.FC<TablePropsType> = ({tableBody,tableHead}) => {

    return (
        <>
            <TableContainer component={Paper} style={{boxShadow: '0px 0px 12px 2px rgba(150,150,150,1)', minWidth: 750, minHeight: 400} }>
                <Table aria-label="packs table">
                    <TableHead>
                        <TableRow style={{backgroundColor: 'silver'}}>
                        {tableHead}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableBody}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

