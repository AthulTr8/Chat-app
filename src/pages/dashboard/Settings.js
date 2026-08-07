import React, { useState } from 'react'
import { Avatar, Box, Divider, IconButton, Stack, Typography, useTheme } from '@mui/material'
import { Bell, CaretLeft, Image, Info, Key, Keyboard, Lock, Note, PencilCircle } from 'phosphor-react'
import { faker } from '@faker-js/faker'
import Shortcuts from '../../Sections/Settings/Shortcuts'

const Settings = () => {
    const theme = useTheme()
    // const [openTheme, setOpenTheme] = useState(false);

    // const handleOpenTheme = () => {
    //     setOpenTheme(true);
    // };

    // // const handleCloseTheme = () => {
    // //     setOpenTheme(false);
    // };
    const [openShortcuts, setOpenShortcuts] = useState(false);

    const handleOpenShortcuts = () => {
        setOpenShortcuts(true);
    };

    const handleCloseShortcuts = () => {
        setOpenShortcuts(false);
    };
    const list = [
        {
            key: 0,
            icon: <Bell size={20} />,
            title: "Notifications",
            onclick: () => { },
        },
        {
            key: 1,
            icon: <Lock size={20} />,
            title: "Privacy",
            onclick: () => { },
        },
        {
            key: 2,
            icon: <Key size={20} />,
            title: "Security",
            onclick: () => { },
        },
        {
            key: 3,
            icon: <PencilCircle size={20} />,
            title: "Theme",
            // onclick: handleOpenTheme,
        },
        {
            key: 4,
            icon: <Image size={20} />,
            title: "Chat Wallpaper",
            onclick: () => { },
        },
        {
            key: 5,
            icon: <Note size={20} />,
            title: "Request Account Info",
            onclick: () => { },
        },
        {
            key: 6,
            icon: <Keyboard size={20} />,
            title: "Keyboard Shortcuts",
            onclick: handleOpenShortcuts,
        },
        {
            key: 7,
            icon: <Info size={20} />,
            title: "Help",
            onclick: () => { },
        },
    ];

    return (
        <>
            <Stack direction={'row'} sx={{ width: "100vw", height: "100vh" }}>
                {/* LeftPanel */}
                <Box sx={{
                    width: 320
                    , height: "100%",
                    background: theme.palette.mode === "light" ? "#f8faff" : theme.palette.background,
                    overflowY: "auto", boxShadow: "0 0 2px rgba(0, 0, 0, .25)"
                }}>
                    <Stack p={3} spacing={3}>
                        <Stack direction={'row'} spacing={2} alignItems={'center'}>
                            <IconButton>
                                <CaretLeft size={24} color='#4b4b4b' />
                            </IconButton>
                            <Typography variant='h6'>Settings</Typography>
                        </Stack>
                        <Stack direction={'row'} spacing={2} alignItems={'center'}>
                            <Avatar src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${faker.name.fullName() || "User"}`}
                                alt={faker.name.fullName()} sx={{ width: 56, height: 56 }} />
                            <Stack spacing={.5}>
                                <Typography variant='article'>{faker.name.fullName()}</Typography>
                                <Typography variant='caption'>{faker.random.words()}</Typography>
                                {/* variant= {body2} */}
                            </Stack>
                        </Stack>
                        
                        <Stack spacing={2}>
                            {list.map(({ key, icon, title, onclick }) =>
                                <>
                                    <Stack key={key} spacing={2} sx={{ cursor: "pointer" }} onClick={onclick}>
                                        <Stack direction={'row'} spacing={2} alignItems={'center'}>
                                            <IconButton>{icon}</IconButton>
                                            <Typography variant='body2'>{title}</Typography>
                                        </Stack>
                                        {key !== 7 && <Divider/>}
                                    </Stack>
                                    
                                </>)}
                        </Stack>
                    </Stack>
                </Box>
                {/* Right Panel */}
                {openShortcuts && <Shortcuts open={openShortcuts} handleClose={handleCloseShortcuts}/> }
                
            </Stack>
        </>
    )
}

export default Settings
