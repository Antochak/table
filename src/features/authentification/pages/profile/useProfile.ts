import {useAppSelector} from "../../../../store";
import {useLogoutMutation, useMeQuery} from "../../api/authApi";
import {useSetNewNameMutation} from "./profileApi";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {PATH} from "../../../../shared/constants/path";
import {queryErrorHandler} from "../../../../shared/utils/QueryErrorHandler";

export const useProfile = () => {
    useMeQuery({})
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const userName = useAppSelector(state => state.auth.user.name)
    const userEmail = useAppSelector(state => state.auth.user.email)
    const [trigger, {isLoading: loguotLoading}] = useLogoutMutation()
    const [rename, {error}] = useSetNewNameMutation()
    const navigate = useNavigate()
    const message = queryErrorHandler(error)
    const logOutHandler = async () => await trigger({})

    const avatar = ''
    const onChangeName =  async (userName: string) => await rename({name: userName, avatar})

    useEffect(()=>{
        if(!isLoggedIn){
            navigate(PATH.LOGIN)
        }
    },[navigate,isLoggedIn])

    return {userName,userEmail,onChangeName,logOutHandler, message, error, loguotLoading}
};
