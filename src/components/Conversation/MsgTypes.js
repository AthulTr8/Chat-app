import { Box, Divider, IconButton, Link, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { DownloadSimple, Image } from 'phosphor-react';
import React from 'react'

const TimeLine = ({ el }) => {

    const theme = useTheme();

    return <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
        {/* <Stack></Stack>
    <Stack></Stack>
    <Stack></Stack> */}
        <Divider sx={{ width: "46%" }} />
        <Typography variant='caption' sx={{ color: theme.palette.text }}>
            {el.text}
        </Typography>
        <Divider sx={{ width: "46%" }} />
    </Stack>

}


const TestMsg = ({ el }) => {
    const theme = useTheme();
    return (
        <Stack direction={'row'} justifyContent={el.incoming ? "start" : "end"}>
            <Box sx={{
                background: el.incoming ? theme.palette.background.default : theme.palette.primary.main,
                borderRadius: 1.5,
                width: "max-contents"
            }} p={1.5}>
                <Typography variant='body2' sx={{ color: el.incoming ? theme.palette.background.text : " #fff" }}>
                    {el.message}
                </Typography>

            </Box>
        </Stack>
    )
}



const MediaMsg = ({ el }) => {
    const theme = useTheme();

    return (
        <Stack direction={'row'} justifyContent={el.incoming ? "start" : "end"}>
            <Box sx={{
                background: el.incoming ? theme.palette.background.default : theme.palette.primary.main,
                borderRadius: 1.5,
                width: "max-contents"
            }} p={1.5}>
                <Stack spacing={1}>
                    <img src={el.img} alt={el.message} style={{ maxHeight: 210, borderRadius: "10px" }} />
                    <Typography variant='body2' sx={{ color: el.incoming ? theme.palette.background.text : " #fff" }}>{el.message}</Typography>
                </Stack>

            </Box>
        </Stack>

    )
}



const ReplyMsg = ({ el }) => {
    const theme = useTheme();
    return (
        <Stack direction={'row'} justifyContent={el.incoming ? "start" : "end"}>
            <Box sx={{
                background: el.incoming ? theme.palette.background.default : theme.palette.primary.main,
                borderRadius: 1.5,
                width: "max-contents"
            }} p={1.5}>
                <Stack spacing={1}>
                    <Stack spacing={3} direction={'column'} alignItems={'center'} p={1}
                        sx={{ background: theme.palette.background.paper, borderRadius: 1 }}>
                        <Typography variant='body2' color={theme.palette.background.text}>{el.message}</Typography>

                    </Stack>
                    <Typography variant='body2' color={el.incoming ? theme.palette.background.text : "#fff"} >
                        {el.reply}
                    </Typography>
                </Stack>
            </Box>
        </Stack>
    )
}



const LinkMsg = ({ el }) => {
    const theme = useTheme();
    return (

        <Stack direction={'row'} justifyContent={el.incoming ? "start" : "end"}>
            <Box sx={{
                background: el.incoming ? theme.palette.background.default : theme.palette.primary.main,
                borderRadius: 1.5,
                width: "max-contents"
            }} p={1.5}>
                <Stack spacing={2}>
                    <Stack p={2} alignItems={'start'} sx={{ background: theme.palette.background.paper, borderRadius: 1 }} >
                        <img src={el.preview} alt={el.message} style={{ maxHeight: 210, borderRadius: 10 }} />
                        <Stack spacing={2}>
                            <Typography variant='subtitle2'>Creating chat app</Typography>
                            <Typography variant='subtitle2' component={Link}
                                sx={{ color: theme.palette.primary.main }}
                                top="//https:www.youtube.com" >www.youtube.com</Typography>
                        </Stack>
                        <Typography variant='body2' color={el.incoming ? theme.palette.text : "#fff"}>
                            {el.message}
                        </Typography>
                    </Stack>
                </Stack>
            </Box>
        </Stack>

    )
}




const Docmsg = (el) => {
    const theme = useTheme();
    return (
        <Stack direction={'row'} justifyContent={el.incoming ? "start" : "end"}>
            <Box sx={{
                background: el.incoming ? theme.palette.background.default : theme.palette.primary.main,
                borderRadius: 1.5,
                width: "max-contents"
            }} p={1.5}>
                <stack spacing={3}>
                    <Stack sx={{ background: theme.palette.background.paper, borderRadius: 1 }} p={2} spacing={3} direction={'row'} alignItems={'center'}>
                        <Image size={48}/>
                        <Typography variant='caption'>Abstract.pdf</Typography>
                        <IconButton>
                            <DownloadSimple/>
                        </IconButton>
                    </Stack>
                    <Typography variant='body2' color={el.incoming ? theme.palette.text : "#fff"}>
                    {el.message}
                    </Typography>
                </stack>
            </Box>
        </Stack>
    )
}









export { TimeLine, TestMsg, MediaMsg, ReplyMsg, LinkMsg, Docmsg }
