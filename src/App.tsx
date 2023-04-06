import React from 'react'

import './App.css'
import { useAppSelector} from "./store";
import { useMeQuery } from './features/authentification/api';
import {Loading} from "./shared/components/loader/Loading";
import {Route, Routes} from "react-router-dom";
import {Layout} from "./shared/components/layout/Layout";
import {Profile} from "./features/authentification/pages/profile/Profile";
import {PATH} from "./shared/constants/path";
import {RegisterForm} from "./features/authentification/pages/registration/RegisterForm";
import {LoginForm} from "./features/authentification/pages/login/LoginForm";
import {PacksContainer} from "./features/packs/PacksContainer";
import {CardsContainer} from "./features/cards/CardsContainer";
import {LearnPage} from "./features/learn/LearnPage";

export function App() {
    useMeQuery({})
    const isInitialized = useAppSelector(state=> state.auth.isInitialized)
    if(!isInitialized){
        return <Loading/>
    }
  return (
    <div className="App">
        <Routes>
            <Route path={'/'} element={<Layout/>}>
                <Route index element={<Profile/>}/>
                <Route path={PATH.REGISTRATION} element={<RegisterForm/>}/>
                <Route path={PATH.LOGIN} element={<LoginForm/>}/>
                <Route path={PATH.PROFILE} element={<Profile/>}/>
                <Route path={PATH.PACKS} element={<PacksContainer/>}/>
                <Route path={PATH.CARDS} element={<CardsContainer/>}/>
                <Route path={PATH.LEARN} element={<LearnPage/>}/>
            </Route>
        </Routes>
    </div>
  )
}


