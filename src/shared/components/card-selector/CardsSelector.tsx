import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type CardsSelectorPropsType = {
    itemsPerPage: number
    onChange: (params: {[key in string]: string})=>void
}
export const CardsSelector:React.FC<CardsSelectorPropsType> = ({itemsPerPage, onChange}) => {
    const handleChange = (event: SelectChangeEvent) => {
        onChange({pageCount: event.target.value});
    };

    return (
        <>
            <FormControl sx={{ width: 70, height: 50 }} variant="filled" size="small">
                <InputLabel>Pages</InputLabel>
                    <Select
                        value={itemsPerPage.toString()}
                        defaultValue={'5'}
                        onChange={handleChange}
                        autoWidth
                        label="Pages"
                    >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={15}>15</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                     </Select>
            </FormControl>
        </>
    );
}