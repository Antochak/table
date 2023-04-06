import React from 'react';
import { Button } from "@mui/material";
import { BasicModal } from "./BasicModal";
import { FlexContainer, TextContainer } from "../..";

type DeleteItemPropsType = {
    isOpened:boolean
    onClose:() => void
    deleteItemHandler: ()=>void
    itemTitle: string
}

export const DeleteItemModal:React.FC<DeleteItemPropsType> = (
    {
        itemTitle,
        onClose,
        isOpened,
        deleteItemHandler
    }) => {
    return (
        <BasicModal isOpened={isOpened}>
            <h2>Delete {itemTitle} ?</h2>
            <TextContainer>
                Do you really want to delete {itemTitle} ?
            </TextContainer>
            <FlexContainer justifyContent="space-around" flexDirection="row">
                <Button
                    style={{marginTop: '20px', width: '130px'}}
                    onClick={deleteItemHandler}
                    variant={'contained'}> OK
                </Button>
                <Button
                    style={{marginTop: '20px', backgroundColor: "red",  width: '130px'}}
                    onClick={()=>onClose()}
                    variant={'contained'}
                >Cancel</Button>
            </FlexContainer>
        </BasicModal>
    );
};

