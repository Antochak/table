import {
    useCreatePackMutation,
    useDeletePackMutation,
    useGetPacksWithParamsQuery,
    useUpdatePackMutation
} from "../api/packsApi";
import {queryErrorHandler} from "../../../shared/utils/QueryErrorHandler";

export const usePackQuery = (urlSearchParams: URLSearchParams) => {
    const [ deletePack, { isLoading: delLoading, error } ] = useDeletePackMutation()
    const [ changePackTitle ] = useUpdatePackMutation()
    const { data, isLoading: getLoading } = useGetPacksWithParamsQuery(Object.fromEntries(urlSearchParams))
    const [createPack, {isLoading: CreateLoading}] = useCreatePackMutation()
    const message = queryErrorHandler(error)

    return {deletePack,changePackTitle,data,message,getLoading,delLoading,error,createPack,CreateLoading}
}