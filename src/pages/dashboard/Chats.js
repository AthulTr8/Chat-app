import {
    Box, IconButton, Stack, Typography,
    InputBase, Button, Divider, Avatar, Badge
} from '@mui/material'
import { styled, alpha, useTheme } from '@mui/material/styles'
import React, { useState } from 'react'
import { ArchiveBox, CircleDashed, MagnifyingGlass, Users } from 'phosphor-react'
import { ChatList } from '../../data';
// import { SimpleBarStyle } from '../../components/Scrollbar'
import { StyledBadge } from '../../components/StyleBadge';
import Friends from '../../Sections/main/Friends';
import { useDispatch } from 'react-redux';
import { ChatElement } from '../../components/ChatElement';
// FIX 1: Pass the { data } prop directly into the component parameters
// const ChatElement = ({ data }) => {
//     const dispatch = useDispatch()
//     const theme = useTheme();
//     return (
//         <Box sx={{
//             width: "100%",
//             background: theme.palette.mode === "light" ? "#fff" : theme.palette.background.paper,
//             borderRadius: 1,
//             mb: 1.5 // Added a bottom margin to separate items in the list cleanly
//         }}
//             p={2}
//         >
//             <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//                 <Stack direction={'row'} spacing={2}>
//                     <StyledBadge
//                         overlap="circular"
//                         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//                         variant="dot"
//                         invisible={!data.online} // Dynamic status toggle indicator flag
//                     >

//                         {/* <Avatar
//                             src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${data?.name || "User"}`}
//                         /> */}
//                         {/* <Avatar src={`https://i.pravatar.cc/150?u=${data?.name}`} /> */}
//                         <Avatar
//                             src={`https://api.dicebear.com/9.x/initials/svg?seed=${data?.name || "User"}`}
//                         />
//                         {/* console.log(faker.image.avatar()); */}
//                     </StyledBadge>

//                     <Stack spacing={0.3}>
//                         {/* FIX 3: Dynamic Data mapping assertions */}
//                         <Typography variant='subtitle2'>
//                             {data.name}
//                         </Typography>
//                         <Typography variant='caption'>
//                             {data.msg}
//                         </Typography>
//                     </Stack>

//                 </Stack>
//                 <Stack spacing={1.5} alignItems={'center'}>
//                     <Typography sx={{ fontWeight: 600 }} variant='caption'>
//                         {data.time}
//                     </Typography>
//                     {/* FIX 4: Only show badge structure if there are actual unread messages */}
//                     {data.unread > 0 && (
//                         <Badge color='primary' badgeContent={data.unread} max={99} />
//                     )}
//                 </Stack>

//             </Stack>
//         </Box>
//     )
// };


// const ChatElement = () => {
//     return (
//         <Box sx={{
//             width: "100%",
//             background: "#fff",
//             borderRadius: 1,
//             // height: 60
//         }}
//             p={2}
//         >
//             <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//                 <Stack direction={'row'} spacing={2}>
//                     <StyledBadge
//                         overlap="circular"
//                         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//                         variant="dot">
//                         <Avatar src={faker.image.avatar()} />
//                     </StyledBadge>

//                     <Stack spacing={0.3}>
//                         <Typography variant='subtitle2'>
//                             Fuad P P
//                         </Typography>
//                         <Typography variant='caption'>
//                             how are you?
//                         </Typography>
//                     </Stack>

//                 </Stack>
//                 <Stack spacing={2} alignContent={'center'}>
//                     <Typography sx={{ fontWeight: 600 }} variant='caption'>
//                         9.36
//                     </Typography>
//                     <Badge color='primary' badgeContent={2}>

//                     </Badge>
//                 </Stack>

//             </Stack>


//         </Box>
//     )
// };


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: 20,
    backgroundColor: alpha(theme.palette.background.default, 1),
    //   '&:hover': {
    //     backgroundColor: alpha(theme.palette.common.white, 0.25),
    //   },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    //   [theme.breakpoints.up('sm')]: {
    //     marginLeft: theme.spacing(3),
    //     width: 'auto',
    //   },
}));


const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));


const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        width: '100%',

    },
}));


const Chats = () => {
    const [openDialog, setOpenDialog] = useState(false)
    const handleCloseDialog = ()=>{
        setOpenDialog(false)
    }
    const handleOpenDialog = ()=>{
        setOpenDialog(true)
    }

    const theme = useTheme();
    return (

        <>
            {/* <Box sx={{
                position: "relative",
                width: 330,
                height: "100vh",
                background: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background.main,
                boxShadow: "0px 0px 2px rgba(0, 0, 0, .25)"
                
            }}> */}
            <Box sx={{
                position: "relative",
                width: 330,
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                background:
                    theme.palette.mode === "light"
                        ? "#F8FAFF"
                        : theme.palette.background.main,
                boxShadow: "0px 0px 2px rgba(0,0,0,.25)",
            }}>
                <Stack p={3} spacing={2}
                    sx={{
                        flex: 1,
                        minHeight: 0,
                    }}>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Typography variant="h5">
                            Chats
                        </Typography>
                        <Stack direction={'row'}>
                            <IconButton onClick={()=>{
                                handleOpenDialog()
                            }}>
                                <Users size={24} />
                            </IconButton>
                            <IconButton>
                                <CircleDashed size={24} />
                            </IconButton>
                        </Stack>

                    </Stack>

                    <Stack sx={{ width: "100%" }}>
                        <Search>
                            <SearchIconWrapper>
                                <MagnifyingGlass color={theme.palette.mode === "light" ? '#709ce6' : theme.palette.primary.main} />
                            </SearchIconWrapper>
                            <StyledInputBase placeholder='Search...' inputProps={{ "aria-label": "search" }} />


                        </Search>
                    </Stack>
                    <Stack spacing={1}>
                        <Stack direction={"row"} alignItems={'center'} spacing={1}>
                            <ArchiveBox size={24} />
                            <Button dir>
                                Archieve
                            </Button>
                        </Stack>
                        <Divider />
                    </Stack>
                    {/* <Stack spacing={1}  sx={{ flexGrow: 1, overflowY: "auto",
                            overflowX: "hidden", height: "100%" }}>
                        <Stack spacing={2} direction={'column'}   >
                            <SimpleBarStyle timeout={500} clickOnTrack={false} sx={{ height: "100%", width: "100%"  }} > */}
                    {/* <SimpleBarStyle
                        timeout={500}
                        clickOnTrack={false}
                        sx={{
                            flex: 1,
                            minHeight: 0,
                            overflowX: "hidden",
                        }}
                    >
                        <Stack>
                            <Typography variant='subtitle2' sx={{ color: "#676767" }}>Pinned</Typography>
                            {ChatList.filter((el) => el.pinned).map((ek) => {
                                // return <ChatElement />
                                return <ChatElement key={ek.id} data={ek} />
                            })}

                        </Stack>

                        <Stack>
                            <Typography variant='subtitle2' sx={{ color: "#676767" }}>All Chats</Typography>
                            {ChatList.filter((el) => !el.pinned).map((ek) => {
                                // return <ChatElement />
                                return <ChatElement key={ek.id} data={ek} />
                            })}

                        </Stack>
                    </SimpleBarStyle> */}
                    {/* </Stack>
                    </Stack> */}
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
                            <Stack>
                                <Typography
                                    variant="subtitle2"
                                    sx={{ color: "#676767", mb: 1 }}
                                >
                                    Pinned
                                </Typography>

                                {ChatList.filter((el) => el.pinned).map((ek) => (
                                    <ChatElement key={ek.id} data={ek} />
                                ))}
                            </Stack>

                            <Stack>
                                <Typography
                                    variant="subtitle2"
                                    sx={{ color: "#676767", mb: 1 }}
                                >
                                    All Chats
                                </Typography>

                                {ChatList.filter((el) => !el.pinned).map((ek) => (
                                    <ChatElement key={ek.id} data={ek} />
                                ))}
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>


            </Box>
            {openDialog && <Friends open={openDialog} handleClose={handleCloseDialog}/>}
        </>
    )
}

export default Chats
