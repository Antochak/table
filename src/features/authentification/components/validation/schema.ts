import * as yup from "yup";


export const schema = (isRegistration: boolean = false)=> yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(7).max(32).required(),
    ...(isRegistration ? { confirmPassword: yup.string()
            .required('Password is mendatory')
            .oneOf([yup.ref('password')], 'Passwords does not match')} : undefined),
})