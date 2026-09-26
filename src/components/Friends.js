import { Avatar, Box, Button, IconButton, Stack, styled, Typography, useTheme } from '@mui/material'
import React from 'react'
import {StyledBadge} from "./StyleBadge"
import {socket} from "../socket"
import { Chat } from 'phosphor-react';
const StyledChatBox = styled(Box)(({ theme }) => ({
    "&:hover": {
        cursor: "pointer",
    },
}));



const UserComponent = ({ firstName, lastName, _id, online, img }) => {
    const theme = useTheme()
    const user_id = window.localStorage.getItem("user_id")
    const name = `${firstName} ${lastName}`
    return (
        <>
            <StyledChatBox
                sx={{ width: "100%", borderRadius: 1, background: theme.palette.background.paper }} p={2}>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Stack direction={'row'} alignItems={'center'} spacing={2}>
                        {" "}
                        {online ? (
                            <StyledBadge
                                overlap="circular"
                                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                                variant="dot"
                            >
                                <Avatar alt={name} src={img} />
                            </StyledBadge>
                        ) : (
                            <Avatar alt={name} src={img} />
                        )}
                        <Stack spacing={0.3}>
                            <Typography variant="subtitle2">{name}</Typography>
                        </Stack>
                    </Stack>
                    <Stack direction={"row"} spacing={2} alignItems={"center"}>
                        <Button
                            onClick={() => {
                                socket.emit("friend_request", { to: _id, from: user_id }, () => {
                                    alert("request sent");
                                });
                            }}
                        >
                            Send Request
                        </Button>
                    </Stack>
                </Stack>
            </StyledChatBox>
        </>
    )
}

const FriendsRequestComponent = ({ firstName, lastName, _id, online, img, id }) => {
    const theme = useTheme()
    // const user_id = window.localStorage.getItem("user_id")
    const name = `${firstName} ${lastName}`
    return (
        <>
            <StyledChatBox
                sx={{ width: "100%", borderRadius: 1, background: theme.palette.background.paper }} p={2}>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Stack direction={'row'} alignItems={'center'} spacing={2}>
                        {" "}
                        {online ? (
                            <StyledBadge
                                overlap="circular"
                                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                                variant="dot"
                            >
                                <Avatar alt={name} src={img} />
                            </StyledBadge>
                        ) : (
                            <Avatar alt={name} src={img} />
                        )}
                        <Stack spacing={0.3}>
                            <Typography variant="subtitle2">{name}</Typography>
                        </Stack>
                    </Stack>
                    <Stack direction={"row"} spacing={2} alignItems={"center"}>
                        <Button
                            onClick={() => {
                                socket.emit("accept_request", { request_id: id }, () => {
                                    alert("request sent");
                                });
                            }}
                        >
                            Accept Request
                        </Button>
                    </Stack>
                </Stack>
            </StyledChatBox>
        </>
    )
}

const FriendsComponent = ({ firstName, lastName, _id, online, img, id }) => {
    const theme = useTheme()
    const user_id = window.localStorage.getItem("user_id")
    const name = `${firstName} ${lastName}`
    return (
        <>
            <StyledChatBox
                sx={{ width: "100%", borderRadius: 1, background: theme.palette.background.paper }} p={2}>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Stack direction={'row'} alignItems={'center'} spacing={2}>
                        {" "}
                        {online ? (
                            <StyledBadge
                                overlap="circular"
                                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                                variant="dot"
                            >
                                <Avatar alt={name} src={img} />
                            </StyledBadge>
                        ) : (
                            <Avatar alt={name} src={img} />
                        )}
                        <Stack spacing={0.3}>
                            <Typography variant="subtitle2">{name}</Typography>
                        </Stack>
                    </Stack>
                    <Stack direction={"row"} spacing={2} alignItems={"center"}>
                        <IconButton onClick={()=>{
                            // Start new conversation
                            socket.emit("Start_conversation",{to: _id, from: user_id})
                        }}>
                            <Chat />
                        </IconButton>
                    </Stack>
                </Stack>
            </StyledChatBox>
        </>
    )
}


export { UserComponent, FriendsRequestComponent, FriendsComponent }
