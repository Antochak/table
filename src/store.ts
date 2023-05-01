import thunkMiddleware from 'redux-thunk'
import { packsApi } from "./features/packs/api/packsApi";
import { cardsApi } from "./features/cards/api/cardsApi";
import { configureStore } from "@reduxjs/toolkit";
import { authApi, authReducer } from "./features/authentification/api";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [packsApi.reducerPath]: packsApi.reducer,
        [cardsApi.reducerPath]: cardsApi.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware()
        .prepend(authApi.middleware)
        .prepend(packsApi.middleware)
        .prepend(cardsApi.middleware)
        .prepend(thunkMiddleware)
})

export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector