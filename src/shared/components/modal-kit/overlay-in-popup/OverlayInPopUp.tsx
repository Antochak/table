import React, { ReactNode } from 'react';
import { Portal } from "../portal/Portal";
import styled from "styled-components";

type OverlayPropsType = {
    children: ReactNode
}

export const OverlayInPopUp:React.FC<OverlayPropsType> = ({children}) => {
    return (
        <Portal>
            <PopupWrapper role={'dialog'}>
                <OverlayWrapper tabIndex={0}></OverlayWrapper>
                { children }
            </PopupWrapper>
        </Portal>
    );
};

const OverlayWrapper = styled.div`
position: absolute;
top: 0;
left: 0
bottom: 0;
right: 0;
background-color: rgba(0, 0, 0, 0.6);
cursor: pointer;
`
export const PopupWrapper = styled.div`
position: fixed;
top: 0;
left: 0
bottom: 0;
right: 0;

padding: 24px;
box-sizing: border-box;

z-index: 1;

display: flex;
justify_content: center;
align-items: center;
`