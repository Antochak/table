import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const packsApi = createApi({
    reducerPath: 'packsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://neko-back.herokuapp.com/2.0/',
        // baseUrl: 'http://localhost:7542/2.0',
        credentials: 'include'
    }),
    refetchOnMountOrArgChange: true,
    tagTypes: ['packs'],
    endpoints: (build) => ({
        getPacksWithParams: build.query<GetPacksResponseType, {[key in string]: string}>({
            query: (params) => ({
                url: `cards/pack/`,
                method: 'GET',
                params: {
                    ...params,
                    pageCount: params.pageCount ?? 5,
                },
            }),
            providesTags: ['packs']
        }),
        deletePack: build.mutation<GetPacksResponseType, {id: string}>({
            query: (data)=>({
                url: `cards/pack/?id=${data.id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['packs']
        }),
        createPack: build.mutation<GetPacksResponseType, CreatePackRequestType>({
            query: (data) => ({
                url: 'cards/pack',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['packs']
        }),
        updatePack: build.mutation<GetPacksResponseType, UpdatePackTitleRequestType>({
            query: (data) => ({
                url: 'cards/pack',
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['packs']
        })
    })
})
export const { useGetPacksWithParamsQuery, useDeletePackMutation, useCreatePackMutation, useUpdatePackMutation  } = packsApi

export type GetPacksResponseType = {
    cardPacks: PackType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    token: string
}
export type PackType = {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    created: string
    deckCover: string
    updated: string
    grade: number
    more_id: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    user_name: string
    __v: number
}
type CreatePackRequestType = {
    cardsPack: {
        name: string
        deckCover: string
        private: boolean
    }
}
type UpdatePackTitleRequestType = {
    cardsPack: {
        _id: string
        name: string
    }
}