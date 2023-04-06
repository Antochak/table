import React from 'react';
import { Outlet } from 'react-router-dom';
import {Header} from "./Header";
import {PacksContainer} from "../../../features/packs/PacksContainer";

export const Layout = () => {
    return (
        <>
            <Header/>

            <Outlet/>
        </>
    );
};

