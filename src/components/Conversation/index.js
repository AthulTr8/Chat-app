import { Box, Stack, } from '@mui/material'
import React, { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import Message from './Message'
import { useDispatch, useSelector } from 'react-redux'
import { socket } from '../../socket'
import { FetchCurrentMessages } from '../../redux/slices/conversation'


const Conversation = () => {
    // const theme = useTheme();
    const dispatch = useDispatch()
    const { room_id } = useSelector((state) => state.app)
    useEffect(() => {
        if (!room_id) return;

        console.log(`Fetching message logs for active room ID string: ${room_id}`);

        // Emit request and pass the callback confirmation function receipt to catch history logs instantly
        socket.emit("get_messages", { conversation_id: room_id }, (messagesArray) => {
            console.log("Message log history dataset loaded safely from backend server:", messagesArray);

            // Save the logs array straight down into your memory slice store using your preferred code fashion wrapper
            dispatch(FetchCurrentMessages({ messages: messagesArray }));
        });
    }, [room_id, dispatch]);
    return (

        <Stack direction={'column'} sx={{ height: "100%", maxHeight: "100vh", width: "auto" }}>

            {/* Header */}
            <Header />
            {/* conversation -Text Area*/}
            <Box sx={{ flexGrow: 1, width: "100%", overflowY: "scroll", height: "100%", overflowX:"hidden"}}>
                <Message menu={true} />
            </Box>
            {/* footer */}
            <Footer />
        </Stack>
    )
}

export default Conversation
