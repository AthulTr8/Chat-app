import React, { useState } from 'react'
import Formprovider, { RHFTextField } from '../../components/hook-form'
import * as Yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Alert, Button, IconButton, InputAdornment, Stack } from '@mui/material'
import { Eye, EyeSlash } from 'phosphor-react'
// import { Link as RouterLink } from 'react-router-dom'
const NewPasswordForm = () => {
    // const theme = useTheme()
    const [showPassword, setShowPassword] = useState(false);

    const NewPasswordSchema = Yup.object().shape({
        newpassword: Yup.string().min(6, "Password must contain atleast 6 character")
            .required("Password is required"),
        confirmPassword: Yup.string().required("Confirm password is needed")
            .oneOf([Yup.ref("newpassword"), null], "Password don't match")
    })

    const defaultValue = {
        newpassword: "",
        confirmPassword: ""
    }

    const methods = useForm({
        resolver: yupResolver(NewPasswordSchema),
        defaultValue,
    })

    const { reset, setError, handleSubmit, formState: { errors, isSubmitting, isSubmittingSuccessfull } } = methods

    const onsubmit = async (data) => {
        try {

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

                <RHFTextField name={'newpassword'} label="New Password" type={showPassword ? "text" : "password"}
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
                <RHFTextField name={'confirmPassword'} label="Confirm Password" type={"password"}
                // InputProps={{
                //     endAdornment: (
                //         <InputAdornment>
                //             <IconButton onClick={() => {
                //                 setShowPassword(!showPassword);
                //             }}>
                //                 {showPassword ? <EyeSlash /> : <Eye />}
                //             </IconButton>
                //         </InputAdornment>
                //     )
                // }}
                />
                <Button fullWidth type='submit' color='inherit' size='large' variant='contained'
                    sx={{
                        bgcolor: 'text.primary', color: (theme) => theme.palette.mode === "light" ? "common.white" : "grey.800",
                        "&:hover": {
                            bgcolor: 'text.primary', color: (theme) => theme.palette.mode === "light" ? "common.white" : "grey.800"
                        }
                    }}>Submit</Button>
            </Stack>


        </Formprovider>
    )
}

export default NewPasswordForm
