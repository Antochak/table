import React, {ChangeEvent, useEffect, useState} from 'react';
import { Input } from "@mui/material";
import { useDebounce } from "./hooks/use-debounce";
import { FlexContainer } from "../..";

type SearchInputPropsType = {
    onChangeInput: ( value: string) => void
}
export const SearchInput:React.FC<SearchInputPropsType> = ({onChangeInput}) => {
    const [inputValue, setInputValue] = useState('')
    const debouncedInputValue: string = useDebounce(inputValue, 400)

    useEffect(()=>{
        onChangeInput(debouncedInputValue)
    },[debouncedInputValue])

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        onChangeInput(inputValue)
        setInputValue(event.currentTarget.value)
    }
    return (
        <>
            <FlexContainer flexDirection="column" height="100px" alignItems="start">
                <span>Search</span>
                <Input style={{width: "300px"}} value={inputValue} onChange={handleChange}/>
            </FlexContainer>
        </>
    )
};

