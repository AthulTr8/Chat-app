import { Stack, Typography } from '@mui/material'
import React from 'react'
import VerifyForm from '../../Sections/Auth/VerifyForm'

const Verify = () => {
    return (
        <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
            <Typography variant='h4'>Please verify OTP</Typography>
            <Stack direction={'row'} spacing={0.5}>
                <Typography variant='body2'>Send email to {"Trathul@gmail.com"}</Typography>
                {/* VerifyForm */}
               
            </Stack>
             <VerifyForm />
        </Stack>
    )
}

export default Verify
