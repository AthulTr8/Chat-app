import {  Box, Stack } from '@mui/material'
import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Message from './Message'
const Conversation = () => {
    // const theme = useTheme();


    return (

        <Stack direction={'column'} sx={{ height: "100%", maxHeight: "100vh", width: "auto" }}>

            {/* Header */}
            <Header/>
            {/* conversation -Text Area*/}
            <Box sx={{ flexGrow: 1, width: "100%" , overflowY:"scroll", height: "100%"}}>
                <Message/>
            </Box>
            {/* footer */}
            <Footer/>
        </Stack>
    )
}

export default Conversation
