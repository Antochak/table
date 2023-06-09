import React, { useEffect, useState } from 'react';
import { PATH } from "../../shared/constants/path";
import { useParams } from "react-router-dom";
import { SnackType } from "../../shared/constants/snackType";
import { FormControl } from "@mui/material/";
import { PopUpSnackbar } from "../../shared/components/popup-snackbar/PopUpSnackbar";
import { useTableQuery } from "../../shared/hooks/useTableQuery";
import { getRandomCard } from "../../shared/utils/random-selection-card/getRandomCard";
import { CircularLoader } from "../../shared/components/loader/CircilarLoader";
import { queryErrorHandler } from "../../shared/utils/QueryErrorHandler";
import { FlexContainer, TextContainer } from "../../shared";
import { Link, Paper, FormControlLabel, Radio, RadioGroup, Button } from "@mui/material";
import { CardType, useGetCardsWithSearchParamsQuery, useGradeCardMutation } from "../cards/api/cardsApi";
import styled from "styled-components";

export const LearnPage = () => {
    const grades = [
        {title:'не знал', value: 1},
        {title:'забыл', value: 2},
        {title:'долго думал', value: 3},
        {title:'перепутал', value: 4},
        {title:'знал', value: 5}];
    const {urlSearchParams,navigate} = useTableQuery()
    const {packId} = useParams();
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [selected, setSelected] = useState(0)
    const [setGradeCard] = useGradeCardMutation()
    const {data: cardsData, isLoading: Loading, error: errFetch} = useGetCardsWithSearchParamsQuery({
        ...Object.fromEntries(urlSearchParams),
        cardsPack_id: packId || '',
    })
    const [currentCard, setCurrentCard] = useState<CardType | null>(null)
    const message = queryErrorHandler(errFetch)
    const onNext = async() => {
        setIsChecked(false);
        if (currentCard && cardsData?.cards && cardsData.cards.length > 0) {
            await setGradeCard({grade: selected, card_id: currentCard._id});
        }
        setCurrentCard(getRandomCard(cardsData?.cards || []));
    }
    useEffect(()=>{
        if (!currentCard) {
            setCurrentCard(getRandomCard(cardsData?.cards || []));
        }
    },[cardsData])

    return (
        <>
            {errFetch && <PopUpSnackbar error={message} popUpType={SnackType.ERROR}/>}
                <FlexContainer flexDirection="column" width={'410px'} margin={'150px auto'}>
                    <BoxShadow>
                        <FlexContainer flexDirection="column" width="95%" margin={'10px'}>
                            {Loading && <CircularLoader/>}
                            <Link onClick={() => navigate(PATH.PACKS)}>Back to Packs List</Link>
                            <h2>Learn "{cardsData?.packName}" </h2>
                            <TextContainer>Question: {currentCard?.question}</TextContainer>
                            <TextContainer opacity="0.5" margin="0 0 20px 0">
                                Количество попыток ответа: {currentCard?.shots}
                            </TextContainer>
                            <Button
                                size={'small'}
                                variant={'contained'}
                                onClick={()=>setIsChecked(!isChecked)}>
                                {!isChecked ? 'Show answer' : 'Hide answer'}
                            </Button>
                        </FlexContainer>

                        {
                            isChecked &&
                                <FlexContainer flexDirection="column" alignItems="flex-start" margin="10px" width="95%">
                                    <TextContainer>Rate your self: </TextContainer>
                                    Answer: {currentCard?.answer}
                                    <FormControl>
                                        <RadioGroup
                                            name="row-radio-buttons-group">
                                            {grades.map((g,i) => {
                                                return <FormControlLabel
                                                    key={'grade-' + i}
                                                    value={g.value}
                                                    onChange={()=>setSelected(g.value)}
                                                    control={<Radio />} label={g.title} />})}
                                        </RadioGroup>
                                    </FormControl>
                                    <FlexContainer>
                                        <Button size={'small'} variant={'contained'} onClick={onNext}>next</Button>
                                    </FlexContainer>
                                </FlexContainer>
                        }
                        </BoxShadow>
                </FlexContainer>

        </>
    );
};
const BoxShadow = styled.div`
box-shadow: 1px 1px 37px 4px rgba(0,0,0,0.43);
width: 410px
`
