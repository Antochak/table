import React, {useState} from 'react';
import { FlexContainer } from "../..";
import Button from "@mui/material/Button";
import { ButtonGroup } from "@mui/material";

export enum ButtonsSwitcherOption {
    My = 'my',
    All = 'all',
}

type ButtonsPropsType = {
    currentOption: ButtonsSwitcherOption
    onOptionChanged: (option: ButtonsSwitcherOption) => void
}
export const ButtonsSwitcher:React.FC<ButtonsPropsType> = ({currentOption,onOptionChanged}) => {
    const [selected, setSelected] = useState('all')
    const onMySwitcherHandler = (value: ButtonsSwitcherOption, flag: string) => {
        onOptionChanged(value)
        setSelected(flag)
    }
    return (
        <>
            <FlexContainer flexDirection="column">
                <span>Show packs</span>
                <ButtonGroup aria-label="Disabled elevation buttons">
                    <Button variant={selected === 'my' ? 'contained' : 'outlined'}
                            onClick={() => onMySwitcherHandler(ButtonsSwitcherOption.My, 'my')}>My</Button>
                    <Button variant={selected === 'all' ? 'contained' : 'outlined'}
                            onClick={() => onMySwitcherHandler(ButtonsSwitcherOption.All, 'all')}>All</Button>
                </ButtonGroup>
            </FlexContainer>
        </>
    );
};

