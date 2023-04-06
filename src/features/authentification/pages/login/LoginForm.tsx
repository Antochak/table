import React from 'react'
import styled from 'styled-components'
import {Button, Checkbox, Paper, Link} from '@mui/material/'
import {FlexContainer, TextContainer, TextError, Title} from '../../../../shared'
import {FormProvider} from 'react-hook-form'
import {InputField} from "../../../../shared/components/input/InputField";
import {useLogin} from './useLogin'
import {PATH} from "../../../../shared/constants/path";
import {CircularLoader} from "../../../../shared/components/loader/CircilarLoader";
import {PopUpSnackbar} from "../../../../shared/utils/PopUpSnackbar";
import {queryErrorHandler} from "../../../../shared/utils/QueryErrorHandler";
import {SnackType} from "../../../../shared/constants/snackType";

export type FormValuesType = {
    email?: string | null
    password?: string | null
    rememberMe?: boolean
    confirmPassword?: string | null
}
export const LoginForm = () => {
    const {methods, formSubmitHandler, isLoading, error} = useLogin()
    const message = queryErrorHandler(error)
    return (
        <FlexContainer height="100vh">
            {isLoading && <CircularLoader/>}
            {error && <PopUpSnackbar error={message} popUpType={SnackType.ERROR}/>}
            <Paper elevation={5} style={{width: '300px', margin: '0 auto', padding: '30px'}}>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(formSubmitHandler)} noValidate>
                        <FlexContainer flexDirection="column">
                            <Title style={{margin: '0 0 30px 0'}}>Sign In</Title>
                            <InputField
                                fieldName={'email'}
                                fieldType={'text'}
                                fieldLabel={'Email'}/>
                            <TextError></TextError>
                            <InputField
                                fieldName={'password'}
                                fieldType={'password'}
                                fieldLabel={'Password'}/>
                            <TextError></TextError>
                            <RememberMe>
                                <Checkbox {...methods.register('rememberMe')} style={{marginLeft: '-10px'}}/>
                                Remember me
                            </RememberMe>
                            <TextContainer alignSelf="flex-end" margin="30px 0 30px 0">
                                <Link href={PATH.FORGOT_PASS}>Forgot password?</Link>
                            </TextContainer>
                            <Button type="submit" variant={'contained'} size={'large'} style={{width: '200px'}}>
                                Sign In
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


const RememberMe = styled.div`
display: flex;
align-items: center;
align-self: flex-start;
`
