import React, { useState } from 'react';
import { BasicModal } from "./BasicModal";
import { FlexContainer } from "../..";
import { Button, Input } from "@mui/material";

type AddCardModalPropsType = {
    question?: string
    answer?: string
    titleModal: string
    isOpened: boolean
    onClose: () => void
    onChange: (answer: string, question: string) => void
}

export const SetCardModal: React.FC<AddCardModalPropsType> = (
    {
        question,
        answer,
        titleModal,
        isOpened,
        onClose,
        onChange
    }) => {
    const [questionState, setQuestionState] = useState(question || '')
    const [answerState, setAnswerState] = useState(answer || '')

    const onSubmitHandler = () => {
        onChange(questionState,answerState)
        onClose()
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
