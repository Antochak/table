import React from 'react';
import {FlexContainer, TextContainer} from "../..";
import {BasicModal} from "./BasicModal";
import {Button} from "@mui/material";

type DeleteItemPropsType = {
    isOpened:boolean
    setIsOpened:(value: boolean) => void
    deleteItemHandler: ()=>void
    itemTitle: string
}

export const DeleteItemModal:React.FC<DeleteItemPropsType> = ({itemTitle,setIsOpened,isOpened,deleteItemHandler}) => {
    const onSubmitHandler = () => {
        deleteItemHandler()
    }
    return (
        <BasicModal isOpened={isOpened}>
            <h2>Delete {itemTitle} ?</h2>
            <TextContainer>
                Do you really want to delete {itemTitle} ?
            </TextContainer>
            <FlexContainer justifyContent="space-around" flexDirection="row">
                <Button
                    style={{marginTop: '20px', width: '130px'}}
                    onClick={onSubmitHandler}
                    variant={'contained'}
                >OK</Button>
                <Button
                    style={{marginTop: '20px', backgroundColor: "red",  width: '130px'}}
                    onClick={()=>setIsOpened(false)}
                    variant={'contained'}
                >Cancel</Button>
            </FlexContainer>
        </BasicModal>
    );
};

