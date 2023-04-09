import React, { useState } from 'react';
import { BasicModal } from "./BasicModal";
import {FlexContainer, Image, TextContainer} from "../..";
import { Button, Input } from "@mui/material";
import {ImageUploader} from "../image-uploader/ImageUploader";

type AddCardModalPropsType = {
    question?: string
    answer?: string
    imageMode?: boolean
    titleModal: string
    isOpened: boolean
    onClose: () => void
    onChange: (answer: string, question: string, questionImg: string) => void
}

export const SetCardModal: React.FC<AddCardModalPropsType> = (
    {
        question,
        answer,
        titleModal,
        isOpened,
        imageMode,
        onClose,
        onChange
    }) => {
    const [questionState, setQuestionState] = useState(question || '')
    const [answerState, setAnswerState] = useState(answer || '')
    const [image, setImage] = useState<string>('')
    const onSubmitHandler = () => {
        onChange(questionState,answerState, image)
        onClose()
    }
    const onUploadImage = (image: string) => {
        setImage(image)
    }

    return (
        <BasicModal isOpened={isOpened} >
            <h2>{titleModal}</h2>
            <FlexContainer flexDirection="column" width="300px">
                <Input
                    placeholder="Question"
                    onChange={e => setQuestionState(e.currentTarget.value)}
                    value={questionState}
                    style={{marginTop: "20px", width: "300px"}}
                />
                {imageMode &&
                <FlexContainer flexDirection="column" justifyContent="flex-start">
                    <Image height="70px" src={image}/>
                    <FlexContainer justifyContent={'space-between'} alignItems={"center"} >
                        <ImageUploader onUploadClick={(image) => onUploadImage(image)}/>
                        <TextContainer margin="0 0 0 30px">Import file</TextContainer>
                    </FlexContainer>
                </FlexContainer>
                }
                <Input
                    placeholder="Answer"
                    onChange={e => setAnswerState(e.currentTarget.value)}
                    value={answerState}
                    style={{marginTop: "20px",  width: "300px"}}
                />
                <FlexContainer justifyContent="space-between">
                    <Button
                        variant={'contained'}
                        size={'large'}
                        style={{width: '130px', marginTop: "20px"}}
                        onClick={onSubmitHandler}>
                        Save
                    </Button>
                    <Button
                        variant={'contained'}
                        size={'large'}
                        style={{width: '130px', marginTop: "20px", backgroundColor: 'red'}}
                        onClick={onClose}>
                        Cancel
                    </Button>
                </FlexContainer>
            </FlexContainer>
        </BasicModal>
    );
};
