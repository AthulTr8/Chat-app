import { Box, IconButton, Stack, Typography } from '@mui/material'
import { CaretLeft } from 'phosphor-react'
import React from 'react'
import ProfileForm from '../../Sections/Settings/ProfileForm'

const Profile = () => {
    return (
        <>
            <Stack direction={'row'} sx={{ width: "100%" }}>
                {/* Left group Bar */}
                <Box sx={{
                    height: "100vh",
                    background: (theme) => theme.palette.mode === "light" ? "#f8faff" : theme.palette.background,
                    width: "25%",
                    boxShadow: "0px 0px 2px rgba(0, 0, 0, 2.5)",
                }}>
                    <Stack p={4} spacing={5}>
                        <Stack direction={'row'} spacing={1.5} alignItems={'center'} >
                            <IconButton><CaretLeft size={24} color='#4b4b4b' /></IconButton>
                            <Typography variant='h5'>Profile</Typography>
                        </Stack>
                        {/* Profile form */}
                        <ProfileForm/>
                    </Stack>

                </Box>
            </Stack>
        </>
    )
}

export default Profile
