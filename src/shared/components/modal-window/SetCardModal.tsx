import React, { useState } from 'react';
import { BasicModal } from "./BasicModal";
import { FlexContainer } from "../..";
import { Button, Input } from "@mui/material";

type AddCardModalPropsType = {
    titleModal: string
    isOpened: boolean
    setIsOpened: (value: boolean) => void
    onChange: (answer: string, question: string) => void
}

export const SetCardModal: React.FC<AddCardModalPropsType> = ({titleModal,isOpened, setIsOpened, onChange}) => {
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')

    const handleClose = () => {
        setIsOpened(false);
    }
    const onSubmitHandler = () => {
        onChange(question,answer)
        setIsOpened(false)
    }

    return (
        <BasicModal isOpened={isOpened} >
            <h2>{titleModal}</h2>
            <FlexContainer flexDirection="column" width="300px">
                <Input
                    placeholder="Question"
                    onChange={e => setQuestion(e.currentTarget.value)}
                    value={question}
                    style={{marginTop: "20px", width: "300px"}}
                />
                <Input
                    placeholder="Answer"
                    onChange={e => setAnswer(e.currentTarget.value)}
                    value={answer}
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
                        onClick={handleClose}>
                        Cancel
                    </Button>
                </FlexContainer>
            </FlexContainer>
        </BasicModal>

    );
};
