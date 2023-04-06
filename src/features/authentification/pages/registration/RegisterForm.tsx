import React from 'react'

import {Link} from '@mui/material'
import {Button, Paper} from '@mui/material/'
import {FlexContainer, TextContainer, Title} from '../../../../shared'
import {yupResolver} from "@hookform/resolvers/yup";
import {schema} from "../../components/validation/schema";

import {FormProvider, SubmitHandler, useForm} from 'react-hook-form'
import {FormValuesType} from "../login/LoginForm";
import {InputField} from "../../../../shared/components/input/InputField";
import {useRegistrationMutation} from '../../api/authApi';
import {PATH} from "../../../../shared/constants/path";

export const RegisterForm = () => {
    const methods = useForm<FormValuesType>({
        mode: "onBlur",
        resolver: yupResolver(schema(false))})
    const [registration,{isLoading}] = useRegistrationMutation()
    const formSubmitHandler:SubmitHandler<FormValuesType> = async (data: FormValuesType) => await registration(data)
    return (
        <FlexContainer height="100vh">
            <Paper elevation={5} style={{width: '300px', margin: '0 auto', padding: '30px'}}>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(formSubmitHandler)} noValidate>
                        <FlexContainer>
                            <Title style={{margin: '0 0 30px 0'}}>Sign Up</Title>
                            <InputField
                                fieldName={'email'}
                                fieldType={'text'}
                                fieldLabel={'Email'}/>
                            <InputField
                                fieldName={'password'}
                                fieldType={'password'}
                                fieldLabel={'Password'}/>
                            <InputField
                                fieldName={'confirmPassword'}
                                fieldType={'password'}
                                fieldLabel={'Confirm password'}/>
                            <Button type="submit" variant={'contained'} size={'large'} style={{width: '200px'}}>
                                Sign Up
                            </Button>
                            <TextContainer opacity={"0.5"} margin="30px 0 30px 0">
                                <Link href={PATH.LOGIN}>Already have an account?</Link>
                            </TextContainer>
                            <TextContainer><Link href={PATH.REGISTRATION}>Sign Up</Link></TextContainer>
                        </FlexContainer>
                    </form>
                </FormProvider>
            </Paper>
        </FlexContainer>
    )
}

