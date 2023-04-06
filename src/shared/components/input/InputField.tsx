import React, {useState} from 'react';
import {useFormContext, Controller} from "react-hook-form";
import TextField from "@mui/material/TextField";
import {FormValuesType} from "../../../features/authentification/pages/login/LoginForm";
import {ShowPassword} from "../../../features/authentification/components/showPassword/ShowPassword";
import {TextError} from "../..";

type InputFieldsPropsType = {
    fieldName: 'email' | 'password' | 'confirmPassword'
    fieldType: 'text' | 'password'
    fieldLabel: string
}
export const InputField = ({fieldName, fieldType, fieldLabel}: InputFieldsPropsType) => {
    const [showPassword, setShowPassword] = useState(fieldType);
    const {control, formState: {errors}} = useFormContext<FormValuesType>()
    return (
        <Controller
            name={fieldName}
            control={control}
            defaultValue={''}
            render={({field}) => (
                <TextField
                    {...field}
                    label={fieldLabel}
                    variant={'standard'}
                    style={{width: '300px'}}
                    type={showPassword === 'password' ? 'password' : 'text'}
                    error={!!errors[fieldName]}
                    helperText={!!errors[fieldName] ? <TextError>{errors[fieldName]?.message}</TextError> :
                        <TextError/>}
                    InputProps={{
                        endAdornment: (
                            fieldType === 'password' && <ShowPassword
                                setShowPassword={setShowPassword}
                                showPassword={showPassword}/>
                        )
                    }}
                />
            )}
        />
    )
}
