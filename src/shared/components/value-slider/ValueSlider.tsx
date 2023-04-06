import React, { useEffect, useState } from 'react';
import Box from "@mui/material/Box";
import { FlexContainer } from "../..";
import SuperRange from "./Range";

type ValueSliderPropsType = {
    max: number
    min: number
    onChangeSlider: (minValue: number, maxValue: number) => void
}

export const ValueSlider:React.FC<ValueSliderPropsType> = ({onChangeSlider,max,min}) => {
    const [minValue, setMinValue] = useState(min)
    const [maxValue, setMaxValue] = useState(max)

    useEffect(()=>{
        setMinValue(min)
        setMaxValue(max)
    },[min,max])
    const change = (event: Event, value: number | number[]) => {
        if (Array.isArray(value)) {
            setMinValue(value[0]);
            setMaxValue(value[1]);
        } else {
            setMinValue(value);
        }
    }
    const onChangeQueryHandler = () => {
        onChangeSlider(minValue, maxValue)
    }
    return (
        <FlexContainer flexDirection="row" justifyContent="space-evenly">
            <span>{minValue}</span>
            <Box sx={{width: 150}}>
                <SuperRange
                    value={[minValue, maxValue]}
                    max={max}
                    min={min}
                    onChange={(event: Event, value) => change(event, value)}
                    onChangeCommitted={onChangeQueryHandler}
                />
            </Box>
            <span>{maxValue}</span>
        </FlexContainer>
    )
}