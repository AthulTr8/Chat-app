import { Box, Stack } from '@mui/material'
import React from 'react'
import { Chat_History } from '../../data'
import { TimeLine, TestMsg, MediaMsg, ReplyMsg, LinkMsg, Docmsg } from './MsgTypes'

const Message = () => {
    return (
        <Box p={3} >
            <Stack spacing={3}>
                {Chat_History.map((el) => {
                    switch (el.type) {
                        case "divider":
                            // Timeline
                            return <TimeLine el={el} />

                        case "msg":
                            switch (el.subtype) {
                                case "img":
                                    //image
                                    return <MediaMsg el = {el}/>
                                case "doc":
                                    // Document
                                    return <Docmsg el ={el}/>
                                case "video":
                                    //Video
                                    return <></>
                                case "link":
                                    //Link
                                    return <LinkMsg el={el}/>
                                case "reply":
                                    //reply
                                    return <ReplyMsg el = {el}/>

                                default:
                                    //Text message
                                    return <TestMsg el = {el}/>
                            }
                        // break;
                        default:
                            return <></>

                    }
                })}
            </Stack>
        </Box>
    )
}

export default Message
