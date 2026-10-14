import React from 'react'
import { faker } from '@faker-js/faker'
import { Avatar, Box, Divider, IconButton, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { StyledBadge } from '../../components/StyleBadge'
import { CaretDown, MagnifyingGlass, PhoneCall, VideoCamera } from 'phosphor-react'
// import { dispatch } from '../../redux/store'
import { toggleSideBar } from '../../redux/slices/app'
import { useDispatch, useSelector } from 'react-redux'

const Header = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { room_id } = useSelector((state) => state.app);
     // 2. Fetch your full active conversation list array
    const { conversations } = useSelector((state) => state.conversation.direct_chat);

    // 3. Find the specific conversation item that matches the active room_id
    const currentChat = conversations.find((chat) => chat.id === room_id);
    return (
        <Box sx={{
            width: "100%", background:
                theme.palette.mode === "light" ? "#f8faff"
                    : theme.palette.background.paper, boxShadow: "0 0 2px rgba(0, 0, 0, .25)"
        }} p={2}>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} sx={{ width: "100%" }}>
                <Stack onClick={
                    () => { dispatch(toggleSideBar()) }
                } direction={'row'} spacing={2} >
                    <Box>
                        <StyledBadge>
                            {/* <Avatar alt={faker.name.fullName()} src={`https://api.dicebear.com/9.x/initials/svg?seed=${data?.name || "User"}`}/> */}
                            <Avatar alt={faker.name.fullName()} src={`https://api.dicebear.com/9.x/initials/svg?seed=${currentChat.name}`} />
                        </StyledBadge>

                    </Box>
                    <Stack>
                        <Typography variant='subtitle2'>{currentChat.name}</Typography>
                        <Typography variant='caption'>{currentChat.online? "online": ""}</Typography>
                    </Stack>
                </Stack>
                <Stack direction={'row'} alignItems={'center'} spacing={3}>
                    <IconButton>
                        <VideoCamera />
                    </IconButton>
                    <IconButton>
                        <PhoneCall />
                    </IconButton>
                    <IconButton>
                        <MagnifyingGlass />
                    </IconButton>
                    <Divider orientation='vertical' flexItem />
                    <IconButton>
                        <CaretDown />
                    </IconButton>
                </Stack>
            </Stack>
        </Box>
    )
}

export default Header
