import * as React from 'react';
import {ReactNode} from 'react';
import { Modal, Box } from '@mui/material/';
import { PopupWrapper, OverlayInPopUp } from "../modal-kit/overlay-in-popup/OverlayInPopUp";

type ModalPropsType = {
    isOpened: boolean
    children: ReactNode
}
export const BasicModal:React.FC<ModalPropsType> = ({children,isOpened}) => {
    return (
        <OverlayInPopUp>
            <PopupWrapper >
                <Modal
                    open={isOpened}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        {children}
                    </Box>
                </Modal>
            </PopupWrapper>
        </OverlayInPopUp>
    );
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};