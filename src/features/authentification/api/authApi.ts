import { FormValuesType } from "../pages/login/LoginForm";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const authApi = createApi({
    reducerPath: 'local/api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://neko-back.herokuapp.com/2.0/',
        // baseUrl: 'http://localhost:7542/2.0',
        credentials:'include'
    }),
    endpoints: (build) => ({
        login: build.mutation<UserResponseType, FormValuesType>({
            query: (data) => ({
                url: 'auth/login',
                method: 'POST',
                body: data
                })
            }),
        logout: build.mutation<LoguotResponseType, {}>({
            query: (data) => ({
                url: 'auth/me',
                method: 'DELETE',
            })
        }),
        registration: build.mutation<UserResponseType, FormValuesType>({
            query: (data)=>({
                url:'auth/register',
                method:'POST',
                body: data
            })
        }),
        me: build.query({
            query: () => ({
                url: 'auth/me',
                method: 'POST'
            })
        })
    })
})
export const {useLoginMutation, useRegistrationMutation, useMeQuery, useLogoutMutation} = authApi

export type UserResponseType = {
    _id: string
    email: string
    name: string
    avatar: string
    publicCardPacksCount: number
    created: Date
    updated: Date
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
    error?: string
    token: string
}

export type LoguotResponseType = {
    info: string
    error: string
}