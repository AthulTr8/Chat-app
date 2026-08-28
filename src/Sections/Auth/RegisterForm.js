import React, { useState } from 'react'
import * as Yup from "yup"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Formprovider, { RHFTextField } from '../../components/hook-form';
import { Alert, Button, IconButton, InputAdornment, Stack } from '@mui/material';
import { Eye, EyeSlash } from 'phosphor-react';
import { useDispatch } from 'react-redux';
import { RegisterUser } from '../../redux/slices/auth';

const RegisterForm = () => {
    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState(false);

    const RegisterSchema = Yup.object().shape({
        firstName: Yup.string().required("First Name is Required"),
        lastName: Yup.string().required("Last Name is Required"),
        email: Yup.string().required("Email is required").email("Invalid Email"),
        password: Yup.string().required("Password is required")
    })

    const defaultValue = {
        firstName: "",
        lastName: "",
        email: "demo@tawk.com",
        password: "demo1234"
    }

    const methods = useForm({
        resolver: yupResolver(RegisterSchema),
        defaultValue,
    })

    const { reset, setError, handleSubmit, formState: { errors } } = methods

    const onsubmit = async (data) => {
        try {
            dispatch(RegisterUser(data))
        } catch (error) {
            console.log(error)
            reset();
            setError("afterSubmit", {
                ...error,
                message: error.message
            })
        }
    }
    return (
        <>
            <Formprovider methods={methods} onsubmit={handleSubmit(onsubmit)}>
                <Stack spacing={3}>
                    {!!errors.afterSubmit && <Alert severity='error'>
                        {errors.afterSubmit.message}
                    </Alert>}
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                        <RHFTextField name={"firstName"} label="First Name" />
                        <RHFTextField name={"lastName"} label="Last Name" />

                    </Stack>
                    <RHFTextField name={'email'} label="Email address" />

                    <RHFTextField name={'password'} label="Password" type={showPassword ? "text" : "password"}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment>
                                    <IconButton onClick={() => {
                                        setShowPassword(!showPassword);
                                    }}>
                                        {showPassword ? <EyeSlash /> : <Eye />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <Button fullWidth type='submit' color='inherit' size='large' variant='contained'
                        sx={{
                            bgcolor: 'text.primary', color: (theme) => theme.palette.mode === "light" ? "common.white" : "grey.800",
                            "&:hover": {
                                bgcolor: 'text.primary', color: (theme) => theme.palette.mode === "light" ? "common.white" : "grey.800"
                            }
                        }}>Create Account</Button>
                        
                </Stack>

            </Formprovider>
        </>
    )
}

export default RegisterForm
