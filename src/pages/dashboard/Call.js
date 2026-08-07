import { Box, Divider, IconButton, Stack, Typography, useTheme, Link } from '@mui/material'
import React, { useState } from 'react'
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/Search'
import { MagnifyingGlass, Plus } from 'phosphor-react'
import { CallLogElement } from '../../components/CallElement'
import { CallLogs } from '../../data'
import StartCall from '../../Sections/main/StartCall'

const Call = () => {
    const theme = useTheme();
    const [openDialog, setOpenDialog] = useState(false)
    const handleCloseBlock = () => {
        setOpenDialog(false)
    }
    return (
        <>
            <Stack direction={'row'} sx={{ width: "100%" }}>
                {/* Left group Bar */}
                <Box sx={{
                    height: "100vh",
                    background: (theme) => theme.palette.mode === "light" ? "#f8faff" : theme.palette.background,
                    width: "25%",
                    boxShadow: "0px 0px 2px rgba(0, 0, 0, 2.5)"
                }}>
                    <Stack p={3} spacing={3} maxHeight={"100vh"}>
                        <Typography variant='h5'>Call Logs</Typography>
                        <Stack sx={{ width: "100%" }}>
                            <Search>
                                <SearchIconWrapper>
                                    <MagnifyingGlass color={theme.palette.mode === "light" ? '#709ce6' : theme.palette.primary.main} />
                                </SearchIconWrapper>
                                <StyledInputBase placeholder='Search...' inputProps={{ "aria-label": "search" }} />


                            </Search>
                        </Stack>
                        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                            <Typography variant='subtitle2' component={Link} >Start new conversation</Typography>
                            <IconButton onClick={()=> {setOpenDialog(true)}} >
                                <Plus style={{ color: (theme) => theme.palette.primary.main }} />
                            </IconButton>
                        </Stack>
                        <Divider></Divider>
                        {/* Call logs */}
                        <Box
                            sx={{
                                flex: 1,
                                overflowY: "auto",
                                overflowX: "hidden",
                                pr: 1,

                                "&::-webkit-scrollbar": {
                                    width: "3px",
                                    right: 7
                                },

                                "&::-webkit-scrollbar-track": {
                                    background: "transparent",
                                },

                                "&::-webkit-scrollbar-thumb": {
                                    backgroundColor:
                                        theme.palette.mode === "light"
                                            ? "#bdbdbd"
                                            : "#5f6368",
                                    borderRadius: "20px",
                                },

                                "&::-webkit-scrollbar-thumb:hover": {
                                    backgroundColor:
                                        theme.palette.mode === "light"
                                            ? "#9e9e9e"
                                            : "#80868b",
                                },
                            }}
                        >

                            <Stack spacing={2}>

                                {/* <Typography
                                    variant="subtitle2"
                                    sx={{ color: "#676767", mb: 1 }}
                                >
                                    Pinned
                                </Typography> */}
                                {CallLogs.map((el) => <CallLogElement {...el} />)}

                            </Stack>
                        </Box>
                    </Stack>
                </Box>
                {/* Right Conversation */}
            </Stack>
            {openDialog && <StartCall open={openDialog} handleClose={handleCloseBlock}/>}
        </>
    )
}

export default Call
