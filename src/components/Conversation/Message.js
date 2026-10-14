// import { Box, Stack } from '@mui/material'
// import React from 'react'
// // import { Chat_History } from '../../data'
// import { TimeLine, TestMsg, MediaMsg, ReplyMsg, LinkMsg, Docmsg } from './MsgTypes'
// import { useSelector } from 'react-redux'


// const Message = ({ menu }) => {
//     const {current_messages} = useSelector((state) => state.conversation.direct_chat)
//     return (
//         <Box p={3} >
//             <Stack spacing={3}>
//                 {current_messages.map((el) => {
//                     switch (el.type) {
//                         case "divider":
//                             // Timeline
//                             return <TimeLine el={el} />

//                         case "msg":
//                             switch (el.subtype) {
//                                 case "img":
//                                     //image
//                                     return <MediaMsg el={el} menu={menu} />
//                                 case "doc":
//                                     // Document
//                                     return <Docmsg el={el} menu={menu} />
//                                 case "video":
//                                     //Video
//                                     return <></>
//                                 case "link":
//                                     //Link
//                                     return <LinkMsg el={el} menu={menu} />
//                                 case "reply":
//                                     //reply
//                                     return <ReplyMsg el={el} menu={menu} />

//                                 default:
//                                     //Text message
//                                     return <TestMsg el={el} menu={menu} />
//                             }
//                         // break;
//                         default:
//                             return <></>

//                     }
//                 })}
//             </Stack>
//         </Box>
//     )
// }

// export default Message

import { Box, Stack } from '@mui/material'
import React, { useEffect, useRef } from 'react' // ✅ Added useEffect and useRef hooks
import { TimeLine, TestMsg, MediaMsg, ReplyMsg, LinkMsg, Docmsg } from './MsgTypes'
import { useSelector } from 'react-redux'

const Message = ({ menu }) => {
    const { current_messages } = useSelector((state) => state.conversation.direct_chat)
    
    // 1. Create a reference pointer anchor for the bottom of the list stack
    const messageEndRef = useRef(null);

    // 2. Automatically scroll to this anchor whenever the current_messages array updates!
    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [current_messages]); // 🔥 Triggers automatically when a new text bubble lands inside Redux!

    // Safe fallback handling container array
    const safeMessages = Array.isArray(current_messages) ? current_messages : [];

    return (
        <Box p={3}>
            <Stack spacing={3}>
                {safeMessages.map((el) => {
                    // Extracting a fallback safe key identifier string parameter
                    const elementKey = el._id || el.id;

                    switch (el.type) {
                        case "divider":
                            // Timeline
                            return <TimeLine key={elementKey} el={el} />

                        case "msg":
                            switch (el.subtype) {
                                case "img":
                                    //image
                                    return <MediaMsg key={elementKey} el={el} menu={menu} />
                                case "doc":
                                    // Document
                                    return <Docmsg key={elementKey} el={el} menu={menu} />
                                case "video":
                                    //Video
                                    return <React.Fragment key={elementKey}></React.Fragment>
                                case "link":
                                    //Link
                                    return <LinkMsg key={elementKey} el={el} menu={menu} />
                                case "reply":
                                    //reply
                                    return <ReplyMsg key={elementKey} el={el} menu={menu} />

                                default:
                                    //Text message
                                    return <TestMsg key={elementKey} el={el} menu={menu} />
                            }
                        default:
                            return <React.Fragment key={elementKey}></React.Fragment>
                    }
                })}

                {/* 3. The Invisible Scroll Anchor sitting right below the mapped messages */}
                <div ref={messageEndRef} />
            </Stack>
        </Box>
    )
}

export default Message;
