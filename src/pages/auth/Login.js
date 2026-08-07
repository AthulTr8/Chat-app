import { Link, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import AuthSocial from '../../Sections/Auth/AuthSocial'
import LoginForm from '../../Sections/Auth/LoginForm'
const Login = () => {
  return (
    <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
      <Typography variant='h4'>Login to Tawk</Typography>
      <Stack spacing={0.5} direction={'row'}>
        <Typography variant='body2'>New user?</Typography>
        <Link variant='subtitle2' to={"/auth/register"} component={RouterLink}>Create an account</Link>
      </Stack>
      {/* Login form */}
      <LoginForm />
      {/* Auth Social */}
      <AuthSocial />
    </Stack>
  )
}

export default Login
