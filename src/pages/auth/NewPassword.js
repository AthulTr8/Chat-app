import { Link, Stack, Typography } from '@mui/material'
import { CaretLeft } from 'phosphor-react'
import React from 'react'
import { NavLink } from 'react-router-dom'
import NewPasswordForm from '../../Sections/Auth/NewPasswordForm'

const NewPassword = () => {
    return (
        <>
            <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
                <Typography variant='h3' paragraph>Reset Password</Typography>
                <Typography sx={{ color: "text.secondary", mb: 5 }}>
                    Please set ypur new password
                </Typography>
            </Stack>
            {/* New password form */}
            <NewPasswordForm/>
            <Link component={NavLink} to="/auth/login" color={"inherit"} variant='subtitle2'
                sx={{ mt: 3, mx: "auto", alignItems: 'center', display: "inline-flex" }}>
                <CaretLeft />
                Return to Sign in
            </Link>
        </>
    )
}

export default NewPassword
