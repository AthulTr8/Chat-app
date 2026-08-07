import React from 'react'
import { faker } from '@faker-js/faker'
import { Avatar, Box, Divider, IconButton, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { StyledBadge } from '../../components/StyleBadge'
import { CaretDown, MagnifyingGlass, PhoneCall, VideoCamera } from 'phosphor-react'
// import { dispatch } from '../../redux/store'
import { toggleSideBar } from '../../redux/slices/app'
import { useDispatch } from 'react-redux'

const Header = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
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
                            <Avatar alt={faker.name.fullName()} src={`https://api.dicebear.com/9.x/initials/svg?seed=${"User"}`} />
                        </StyledBadge>

                    </Box>
                    <Stack>
                        <Typography variant='subtitle2'>{faker.name.fullName()}</Typography>
                        <Typography variant='caption'>Online</Typography>
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
