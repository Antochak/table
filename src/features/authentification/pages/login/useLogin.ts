import { PATH } from "../../../../shared/constants/path";
import { schema } from "../../components/validation/schema";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../store";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLoginMutation } from "../../api/authApi";
import { FormValuesType } from "./LoginForm";

export const useLogin = () => {
    const navigate = useNavigate()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const methods = useForm<FormValuesType>({
        mode: "onBlur",
        resolver: yupResolver(schema())
    })
    const [login, {isLoading, error, status}] = useLoginMutation()

    const formSubmitHandler:SubmitHandler<FormValuesType> = async (data: FormValuesType) => {
        await login(data)
    }

    useEffect(()=>{
        if(isLoggedIn){
            navigate(PATH.PROFILE)
        }
    },[isLoggedIn,navigate])
    return {methods,formSubmitHandler,isLoading,error,status}
};

