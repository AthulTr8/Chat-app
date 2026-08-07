import { faker } from '@faker-js/faker'
import { Avatar, Box, Typography, useTheme, Stack, IconButton } from '@mui/material'

import React from 'react'
import { StyledBadge } from './StyleBadge'
import { ArrowDownLeft, ArrowUpRight, Phone, VideoCamera } from 'phosphor-react'

const CallLogElement = ({ online , incoming, missed}) => {
    const theme = useTheme()
    return (
        <Box sx={{
            width: "100%",
            background: theme.palette.mode === "light" ? "#fff" : theme.palette.background.paper,
            borderRadius: 1,
            mb: 1.5 // Added a bottom margin to separate items in the list cleanly
        }}
            p={2}
        >
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <Stack direction={'row'} spacing={2}>
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                        // invisible={!data.online} // Dynamic status toggle indicator flag
                        invisible={false}
                    >

                        {/* <Avatar
                            src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${data?.name || "User"}`}
                        /> */}
                        <Avatar src={`https://i.pravatar.cc/150?u=${faker.name.fullName()}`} alt={faker.name.fullName()} />
                        {/* <Avatar
                            src={`https://api.dicebear.com/9.x/initials/svg?seed=${data?.name || "User"}`}
                        /> */}
                        {/* console.log(faker.image.avatar()); */}
                    </StyledBadge>

                    <Stack spacing={0.3}>
                        {/* FIX 3: Dynamic Data mapping assertions */}
                        <Typography variant='subtitle2'>
                            {faker.name.fullName()}
                        </Typography>
                        <Stack direction={'row'} spacing={1.5} alignItems={'center'}>
                            {incoming ? <ArrowDownLeft color={missed ? "red" : "green"} /> : <ArrowUpRight color={missed ? "red" : "green"}/>}
                            
                            <Typography variant='caption'>
                                Yesterday 21:55
                            </Typography>
                        </Stack>

                    </Stack>


                </Stack>
                <Stack>
                    <IconButton>
                        <Phone  color='green'/>
                    </IconButton>
                </Stack>


            </Stack>
        </Box>
    )
}

const CallElement = () => {
    const theme = useTheme()
    return (
        <>
         <Box sx={{
            width: "100%",
            background: theme.palette.mode === "light" ? "#f8faff" : theme.palette.background.paper,
            borderRadius: 1,
            mb: 1.5 // Added a bottom margin to separate items in the list cleanly
        }}
            p={2}
        >
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <Stack direction={'row'} spacing={2}>
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                        // invisible={!data.online} // Dynamic status toggle indicator flag
                        invisible={false}
                    >

                        {/* <Avatar
                            src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${data?.name || "User"}`}
                        /> */}
                        <Avatar src={`https://i.pravatar.cc/150?u=${faker.name.fullName()}`} alt={faker.name.fullName()} />
                        {/* <Avatar
                            src={`https://api.dicebear.com/9.x/initials/svg?seed=${data?.name || "User"}`}
                        /> */}
                        {/* console.log(faker.image.avatar()); */}
                    </StyledBadge>

                    <Stack spacing={0.3}>
                        {/* FIX 3: Dynamic Data mapping assertions */}
                        <Typography variant='subtitle2'>
                            {faker.name.fullName()}
                        </Typography>
                        

                    </Stack>


                </Stack>
                <Stack direction={'row'} spacing={1.5}>
                    <IconButton>
                        <Phone  color='green'/>
                       
                    </IconButton>
                    <IconButton> <VideoCamera  color='green'/></IconButton>
                </Stack>


            </Stack>
        </Box>
        </>
    )
}

export {
    CallElement,
    CallLogElement
}
