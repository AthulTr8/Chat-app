import { Box, IconButton, Stack, Typography, useTheme } from '@mui/material'
import { CaretLeft } from 'phosphor-react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { updateSideBar } from '../redux/slices/app'
import Message from './Conversation/Message'

const StarredMessage = () => {
    const theme = useTheme()
    const dispatch = useDispatch()

    return (
        <Box sx={{
            width: "25%",
            height: "100vh",

        }}>
            <Stack sx={{ height: "100%" }}>
                <Box sx={{
                    boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
                    width: "100%",
                    background: theme.palette.mode === "light" ? "#f8faff" : theme.palette.background.paper
                }} alignItems={'center'}>
                    <Stack direction={'row'} p={2} spacing={3} alignItems={'center'} sx={{ height: "100%" }}>
                        <IconButton onClick={() => {
                            dispatch(updateSideBar("CONTACT"))
                        }}>
                            <CaretLeft />
                        </IconButton>
                        <Typography variant='subtitle2'>Starred Messages</Typography>
                    </Stack>
                </Box>

                <Stack sx={{ width: "100%", height: "100%", position: "relative", flexGrow: 1, overflowY: "scroll" }}
                    px={4} py={.5} spacing={2} p={3}>
<Message/>
                </Stack>
            </Stack>
        </Box>

    )
}

export default StarredMessage
