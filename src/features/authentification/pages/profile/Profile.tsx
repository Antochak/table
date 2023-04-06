import React from 'react';
import {FlexContainer, TextContainer} from "../../../../shared";
import ava from '../../../../assets/images/ava.jpg'
import styled from "styled-components";
import { Button,Paper } from "@mui/material";
import { EditableSpan } from "../../../../shared/components/editableSpan/EditableSpan";
import { Link } from "@mui/material/";
import { useProfile } from "./useProfile";
import { PATH } from "../../../../shared/constants/path";
import { PopUpSnackbar } from "../../../../shared/utils/PopUpSnackbar";
import { SnackType } from "../../../../shared/constants/snackType";
import { ImageUploader } from "../../../../shared/components/image-uploader/ImageUploader";
import { CircularLoader } from "../../../../shared/components/loader/CircilarLoader";

export const Profile = () => {
    const {userName,userEmail,onChangeName,logOutHandler, message, error, loguotLoading} = useProfile()

    return (
        <Paper elevation={5} style={{height:'360px', width:'380px', margin: '0 auto', position: 'relative'}} >
            {error && <PopUpSnackbar error={message} popUpType={SnackType.ERROR}/>}
            {loguotLoading && <CircularLoader/>}
                <FlexContainer margin="40% auto" flexDirection="column">
                    <TextContainer><Link href={PATH.PACKS}>Back to the packs</Link></TextContainer>
                    <TextContainer><h3>Personal information</h3></TextContainer>
                    <FlexContainer height="100px" alignItems="flex-end">
                        <ProfileAvatar src={ava} alt="image" height="100px" width="100px" ></ProfileAvatar>
                        <ImageUploader/>
                    </FlexContainer>
                    <FlexContainer height="70px" justify-content="space-evenly" flexDirection="column">
                        <EditableSpan value={userName} onChange={onChangeName}/>
                        <TextContainer>{userEmail}</TextContainer>
                    </FlexContainer>
                    <Button variant="outlined" onClick={logOutHandler}>Log out</Button>
                </FlexContainer>
        </Paper>
    );
};

export const ProfileAvatar = styled.img<{
    height?: string
    width?: string
    position?: string
    borderRaduis?: string
}>`
position: ${props=>props.position || 'relative'}  
height: ${props => props.height || '100px'};
width: ${props => props.width || '100px'};
border-radius: ${props => props.borderRaduis || '100px'};
`