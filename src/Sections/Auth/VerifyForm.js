import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from "yup"
import Formprovider from '../../components/hook-form'
import { Button, Stack } from '@mui/material'
import RHFCodes from '../../components/hook-form/RHFCodes'
import { useDispatch, useSelector } from 'react-redux'
import { verifyEmail } from '../../redux/slices/auth'

const VerifyForm = () => {
    const dispatch = useDispatch()

    const {email} = useSelector((state) => state.auth)
    const verifyCodeSchema = Yup.object().shape({
        code1: Yup.string().required("Code is Required"),
        code2: Yup.string().required("Code is Required"),
        code3: Yup.string().required("Code is Required"),
        code4: Yup.string().required("Code is Required"),
        code5: Yup.string().required("Code is Required"),
        code6: Yup.string().required("Code is Required"),
    })

    const defaultValues = {
        code1: "",
        code2: "",
        code3: "",
        code4: "",
        code5: "",
        code6: "",
    }

    const methods = useForm({
        mode: "onChange",
        resolver: yupResolver(verifyCodeSchema),
        defaultValues
    })

    const { handleSubmit, formState } = methods

    const onSubmit = async (data) => {
        try {
            dispatch(verifyEmail({
                email,
                otp:`${data.code1}${data.code2}${data.code3}${data.code4}${data.code5}${data.code6}`
            }))
             console.log("OTP compiled and sent!");
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Formprovider methods={methods} onsubmit={handleSubmit(onSubmit)}>
                <Stack spacing={3}>
                    <RHFCodes keyName='code' input={["code1","code2","code3","code4","code5","code6"]}/>
                    <Button fullWidth type='submit' color='inherit' size='large' variant='contained'
                        sx={{
                            bgcolor: 'text.primary', color: (theme) => theme.palette.mode === "light" ? "common.white" : "grey.800",
                            "&:hover": {
                                bgcolor: 'text.primary', color: (theme) => theme.palette.mode === "light" ? "common.white" : "grey.800"
                            }
                        }}>Verify</Button>
                </Stack>

            </Formprovider>
        </>
    )
}

export default VerifyForm
