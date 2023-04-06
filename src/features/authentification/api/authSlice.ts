import { authApi } from "./authApi";
import { profileApi } from "../pages/profile/profileApi";
import { createSlice } from "@reduxjs/toolkit";

 type InitialStateType = {
    isLoggedIn: boolean,
    isInitialized: boolean,
    user: {
        email: string
        name: string
    }
}
const initialState:InitialStateType = {
    isLoggedIn: false,
    isInitialized: false,
    user: {
        name: '',
        email: ''
    }
}
export const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder => {
        builder
            .addMatcher(authApi.endpoints.me.matchFulfilled, (state, {payload}) => {
                state.isInitialized = true
                state.isLoggedIn = true
                state.user.name = payload.name
                state.user.email = payload.email
            })
            .addMatcher(authApi.endpoints.login.matchFulfilled, (state, {payload}) => {
                state.isLoggedIn = true
            })
            .addMatcher(authApi.endpoints.me.matchRejected, (state, {payload}) => {
                state.isInitialized = true
                state.isLoggedIn = false
            })
            .addMatcher(authApi.endpoints.logout.matchFulfilled, (state, {payload}) => {
                state.isLoggedIn = false
            })
            .addMatcher(profileApi.endpoints.setNewName.matchFulfilled, (state, {payload}) => {
                state.user.name = payload.updatedUser.name
            })
    })
})
export const authReducer = slice.reducer
