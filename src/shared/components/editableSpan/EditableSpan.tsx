import React, { ChangeEvent, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {FlexContainer} from "../..";

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value);

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.value);
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onSubmitHandler = () => {
        props.onChange(title);
        setEditMode(false);
    }
    return editMode
        ? <FlexContainer>
                <TextField variant={'standard'} style={{width: '170px'}} value={title} onChange={changeTitle} autoFocus />
                <Button onClick={onSubmitHandler}> save </Button>
            </FlexContainer>
        : <span onDoubleClick={activateEditMode}>{props.value}</span>
});
