import {
    useAddCardMutation,
    useDeleteCardMutation,
    useGetCardsWithSearchParamsQuery,
    useUpdateCardMutation
} from "../api/cardsApi";
import {useParams} from "react-router-dom";

export const useCardsQuery = (urlSearchParams: URLSearchParams) => {
    const [deleteCard, {error: errDelete}] = useDeleteCardMutation()
    const [addCard, {isLoading: isLoadingAdd, error: errAdd}] = useAddCardMutation()
    const [editCard, {isLoading: isLoadingEdit, error: errEdit}] = useUpdateCardMutation()
    const {id} = useParams();
    const {data: cardsData, isLoading: getLoading, error: errFetch} = useGetCardsWithSearchParamsQuery({
        ...Object.fromEntries(urlSearchParams),
        cardsPack_id: id || '',
    })
    console.log(cardsData)
    return {deleteCard,addCard,editCard,cardsData,errDelete,isLoadingAdd,isLoadingEdit,getLoading,errAdd,errEdit,errFetch,id}
}