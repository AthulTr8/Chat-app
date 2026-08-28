import React from 'react'
import Formprovider, { RHFTextField } from '../../components/hook-form'
import * as Yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Alert, Button, Stack } from '@mui/material'
import { forgotPassword } from '../../redux/slices/auth'
import { useDispatch } from 'react-redux'

const ResetPasswordForm = () => {
    // const theme = useTheme()
    const dispatch = useDispatch()

    const ResetPasswordSchema = Yup.object().shape({
        email: Yup.string().required("Email is required").email("Invalid Email"),

    })

    const defaultValue = {
        email: "demo@tawk.com",

    }

    const methods = useForm({
        resolver: yupResolver(ResetPasswordSchema),
        defaultValue,
    })

    const { reset, setError, handleSubmit, formState: { errors, isSubmitting, isSubmittingSuccessfull } } = methods

    const onsubmit = async (data) => {
        try {
            dispatch(forgotPassword(data))
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
        <Formprovider methods={methods} onsubmit={handleSubmit(onsubmit)}>
            <Stack spacing={3}>
                {!!errors.afterSubmit && <Alert severity='error'>
                    {errors.afterSubmit.message}
                </Alert>}

                <RHFTextField name={'email'} label="Email address" />
                <Button fullWidth type='submit' color='inherit' size='large' variant='contained'
                    sx={{
                        bgcolor: 'text.primary', color: (theme) => theme.palette.mode === "light" ? "common.white" : "grey.800",
                        "&:hover": {
                            bgcolor: 'text.primary', color: (theme) => theme.palette.mode === "light" ? "common.white" : "grey.800"
                        }
                    }}>Send request</Button>
            </Stack>


        </Formprovider>
    )
}

export default ResetPasswordForm
