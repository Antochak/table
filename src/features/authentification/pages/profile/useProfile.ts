import {useAppSelector} from "../../../../store";
import {useLogoutMutation, useMeQuery} from "../../api/authApi";
import {useSetNewNameMutation} from "./profileApi";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {PATH} from "../../../../shared/constants/path";
import {queryErrorHandler} from "../../../../shared/utils/QueryErrorHandler";

export const useProfile = () => {

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const userName = useAppSelector(state => state.auth.user.name)
    const userEmail = useAppSelector(state => state.auth.user.email)
    const avatar = useAppSelector(state => state.auth.user.avatar)

    const [trigger, {isLoading: loguotLoading}] = useLogoutMutation()
    const [rename, {error}] = useSetNewNameMutation()
    const navigate = useNavigate()
    const message = queryErrorHandler(error)
    const logOutHandler = async () => await trigger({})

    const onChangeName =  async (userName: string) => await rename({name: userName, avatar})
    const loadProfileAvatarHandler = async (file64: string) => await rename({name: userName, avatar: file64})

    useEffect(()=>{
        if(!isLoggedIn){
            navigate(PATH.LOGIN)
        }
    },[navigate,isLoggedIn])

    return {userName,userEmail,onChangeName,logOutHandler, message, error, loguotLoading, avatar, loadProfileAvatarHandler}
};
