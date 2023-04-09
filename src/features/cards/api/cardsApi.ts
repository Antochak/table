import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const cardsApi = createApi({
    reducerPath: 'cardsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://neko-back.herokuapp.com/2.0/',
        // baseUrl: 'http://localhost:7542/2.0',
        credentials: 'include'
    }),
    tagTypes: ['cards'],
    endpoints: (build) => ({
        getCardsWithSearchParams: build.query<CardsType, {[key in string]: string}>({
            query: (params) => ({
                url: `cards/card/`,
                method: 'GET',
                params: {
                    ...params,
                    pageCount: params.pageCount ?? 5,
                },
            }),
            providesTags: ['cards']
        }),
        addCard: build.mutation<CardsType, { card: AddCardType }>({
            query: (data) => ({
                url: `cards/card`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['cards']
        }),
        deleteCard: build.mutation<CardsType, {id: string}>({
            query: (data) => ({
                url: `cards/card/?id=${data.id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['cards']
        }),
        updateCard: build.mutation<CardsType, UpdateCardType>({
            query: (data) => ({
                url: `cards/card/`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['cards']
        }),
        gradeCard: build.mutation<UpdatedGradeType, GradeRequestType>({
            query: (data) => ({
                url: `cards/grade/`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['cards']
        }),
    })
})

export const {
    useGetCardsWithSearchParamsQuery,
    useAddCardMutation,
    useDeleteCardMutation,
    useUpdateCardMutation,
    useGradeCardMutation} = cardsApi

export type CardsType = {
    cards: CardType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    packCreated: string
    packDeckCover: string
    packName: string
    packPrivate: boolean
    packUpdated: string
    packUserId: string
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}
export type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    card_id: string
    rating: number
    answerImg: string
    questionImg: string
    user_id: string
    created: string
    updated: string
    _id: string
}
export type AddCardType = Partial<CardType>
export type UpdatedGradeType = {
    updatedGrade: Partial<CardType>
}
export type UpdateCardType = {
    card: {
        _id: string
        question: string
        answer: string
    }
}
export type GradeRequestType = {
    grade: number
    card_id: string
}