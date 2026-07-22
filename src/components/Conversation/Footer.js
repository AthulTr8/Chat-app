import React from 'react'
import { Box, Fab, IconButton, InputAdornment, Stack, TextField, Tooltip } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import {
    LinkSimple,
    PaperPlaneTilt,
    Smiley,
    Camera,
    File,
    Image,
    Sticker,
    User,
} from 'phosphor-react'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'


const StyledInput = styled(TextField)(({ theme }) => ({
    "& .muiInputBase-Input": {
        padding: ".5px 0 .5px 0",
        borderRadius: 2
    }
}));

const ChatInput = ({ setOpenPicker }) => {
    const [openAction, setOpenAction] = React.useState(false);
    return (

        <StyledInput sx={{ borderRadius: 2.5 }} fullWidth placeholder='Write a message...' variant='filled' InputProps={{
            disableUnderline: true,
            startAdornment: (
                <Stack sx={{ width: "max-contents" }}>
                    <Stack sx={{ position: "relative", display: openAction ? "inline-block" : "none" }}>
                        {Actions.map((el) => (
                             <Tooltip placement='right' title={el.title}>
      
    
                            <Fab sx={{position: "absolute", top: -el.y, background: el.color}}>
                                {el.icon}
                               
                            </Fab>
                             </Tooltip>
                        ))}
                    </Stack>
                    <InputAdornment>
                        <IconButton 
                        onClick={() =>{
                            setOpenAction((prev) => !prev);
                        }}>
                            <LinkSimple />
                        </IconButton>
                    </InputAdornment>
                </Stack>),
            endAdornment: <InputAdornment>
                <IconButton
                    onClick={() => {
                        setOpenPicker((prev) => (!prev));
                    }}
                ><Smiley /></IconButton>
            </InputAdornment>
        }} />
    )
}

const Actions = [
    {
        color: "#4da5fe",
        icon: <Image size={24} />,
        y: 102,
        title: "Photo/Video",
    },
    {
        color: "#1b8cfe",
        icon: <Sticker size={24} />,
        y: 172,
        title: "Stickers",
    },
    {
        color: "#0172e4",
        icon: <Camera size={24} />,
        y: 242,
        title: "Image",
    },
    {
        color: "#0159b2",
        icon: <File size={24} />,
        y: 312,
        title: "Document",
    },
    {
        color: "#013f7f",
        icon: <User size={24} />,
        y: 382,
        title: "Contact",
    },
];


const Footer = () => {
    const theme = useTheme();
    const [openPicker, setOpenPicker ] = React.useState(false);

    return (
        <Box p={1} sx={{

            width: "100%", background:
                theme.palette.mode === "light" ? "#f8faff"
                    : theme.palette.background.paper, boxShadow: "0 0 2px rgba(0, 0, 0, .25)"
        }} >
            {/* Chat Input */}
            <Stack direction={'row'} alignItems={'center'} spacing={3}>
                <Stack sx={{ width: "100%" }}>
                    <Box sx={{ display: openPicker ? "inline" : "none", zIndex: 10, position: "fixed", bottom: 81, right: 100 }}>
                        <Picker
                            theme={theme.palette.mode} data={data} onEmojiSelect={console.log} />
                    </Box>

                    <ChatInput setOpenPicker={setOpenPicker}  />
                </Stack>



                <Box sx={{ height: "40px", width: 40, background: theme.palette.primary.main, borderRadius: 1.5 }}>
                    <Stack sx={{ height: "100%", width: "100%" }} alignItems={'center'} justifyContent={'center'}>
                        <IconButton>
                            <PaperPlaneTilt color='#fff' />
                        </IconButton>
                    </Stack>

                </Box>

            </Stack>
        </Box>

    )
}

export default Footer
