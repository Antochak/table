import React from 'react';
import styled from "styled-components";
import ava from '../../../assets/images/ava.jpg'
import { PATH } from "../../constants/path";
import { useNavigate } from 'react-router-dom';
import { ProfileAvatar } from "../../../features/authentification/pages/profile/Profile";
import { useAppSelector } from "../../../store";
import { FlexContainer, TextContainer } from '../..';

export const Header = () => {
    const navigate = useNavigate()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const userName = useAppSelector(state => state.auth.user.name)
    const navHandler = () => navigate(PATH.PROFILE)

    return (
        <>
            <HeaderContainer>
                <div>
                    {isLoggedIn &&
                    <FlexContainer style={{cursor: 'pointer'}} justifyContent="flex-end" width="90%"  margin="5px auto" onClick={navHandler}  >
                        <TextContainer margin="0 15px 0 0">{userName}</TextContainer>
                        <ProfileAvatar src={ava} alt="image" height="50px" width="50px" border-radius="25px"></ProfileAvatar>
                    </FlexContainer>}
                </div>
            </HeaderContainer>
        </>
    );
};

export const HeaderContainer = styled.header`
width: 90%;
height: 70px;
box-shadow: 2px 13px 33px -3px rgba(0,0,0,0.5);
display: flex;
margin: 0 auto;
flex-direction: column;
`