import React, { useState } from 'react'
import Formprovider, { RHFTextField } from '../../components/hook-form'
import * as Yup from "yup"
import {  useForm } from "react-hook-form" //reactForm,
import { yupResolver } from "@hookform/resolvers/yup"
import { Alert, Button, IconButton, InputAdornment, Link, Stack } from '@mui/material'
import { Eye, EyeClosed, EyeSlash } from 'phosphor-react'
import { Link as RouterLink } from 'react-router-dom'
const LoginForm = () => {
// const theme = useTheme()
  const [showPassword, setShowPassword] = useState(false);

  const loginSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Invalid Email"),
    password: Yup.string().required("Password is required")
  })

  const defaultValue = {
    email: "demo@tawk.com",
    password: "demo1234"
  }

  const methods = useForm({
    resolver: yupResolver(loginSchema),
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
      </Stack>
      <Stack  alignItems={'flex-end'} sx={{my:3}}>
        <Link component={RouterLink} to="/auth/reset-password" variant='body2' color={'inherit'} underline='always'>Forgot password?</Link>
      </Stack>
      <Button fullWidth type='submit' color='inherit' size='large' variant='contained'
      sx={{bgcolor:'text.primary', color:(theme) => theme.palette.mode ==="light"? "common.white":"grey.800",
        "&:hover":{
          bgcolor:'text.primary', color:(theme) => theme.palette.mode ==="light"? "common.white":"grey.800"
        }
      }}>Login</Button>
    </Formprovider>
  )
}

export default LoginForm
