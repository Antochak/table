import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {UserResponseType} from "../../api/authApi";

export const profileApi = createApi({
    reducerPath: 'local/api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:7542/2.0',
        credentials: 'include'
    }),
    endpoints: (build) => ({
        setNewName: build.mutation<SetNewNameResponseType, SetNewNameRequestType>({
            query: (data) => ({
                url: 'auth/me',
                method: 'PUT',
                body: data
            })
        })
    })
})
export const {useSetNewNameMutation} = profileApi
export type SetNewNameResponseType = {
    updatedUser: UserResponseType
    error?:string
}
export type SetNewNameRequestType = {
    name: string
    avatar: string
}