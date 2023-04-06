import * as React from 'react';
import { Button, TextField } from '@mui/material/';
import { FC, useState } from "react";
import { BasicModal } from "./BasicModal";
import { FlexContainer } from "../..";

type SetPackModalPropsType = {
    header: string
    isOpened: boolean
    setIsOpened: (value: boolean) => void
    onChangeTitle: (title: string) => void
}

export const SetPackModal:FC<SetPackModalPropsType> = ({header, onChangeTitle, setIsOpened, isOpened}) => {
    const [title, setTitle] = useState('')
    const onSubmitHandler = () => {
        setIsOpened(false)
        onChangeTitle(title)
    }

    return (
        <BasicModal isOpened={isOpened}>
            <h2>{header}</h2>
            <FlexContainer flexDirection="column" height="150px">
                <TextField
                    placeholder="Set Pack name"
                    variant="standard"
                    style={{marginTop: '20px', width: '300px'}}
                    value={title}
                    onChange={(e) => setTitle(e.currentTarget.value)}/>
                    <FlexContainer justifyContent="space-around" flexDirection="row">
                        <Button
                            style={{marginTop: '20px', width: '130px'}}
                            onClick={onSubmitHandler}
                            variant={'contained'}
                        >Save</Button>
                        <Button
                            style={{marginTop: '20px', backgroundColor: "red", width: '130px'}}
                            onClick={()=>setIsOpened(false)}
                            variant={'contained'}
                        >Cancel</Button>
                    </FlexContainer>
            </FlexContainer>
        </BasicModal>
    )
}

