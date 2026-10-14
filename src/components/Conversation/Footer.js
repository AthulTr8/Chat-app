// import React from 'react'
// import { Box, Fab, IconButton, InputAdornment, Stack, TextField, Tooltip } from '@mui/material'
// import { styled, useTheme } from '@mui/material/styles'
// import {
//     LinkSimple,
//     PaperPlaneTilt,
//     Smiley,
//     Camera,
//     File,
//     Image,
//     Sticker,
//     User,
// } from 'phosphor-react'
// import data from '@emoji-mart/data'
// import Picker from '@emoji-mart/react'
// import { socket } from '../../socket'
// import { useDispatch } from 'react-redux'


// const StyledInput = styled(TextField)(({ theme }) => ({
//     "& .muiInputBase-Input": {
//         padding: ".2px 0 .2px 0",
//         borderRadius: 2
//     }
// }));

// const ChatInput = ({ setOpenPicker }) => {
//     const [openAction, setOpenAction] = React.useState(false);
//     return (

//         <StyledInput
//         value={typedText}
//          onChange={(e) => setTypedText(e.target.value)}
//          onKeyDown={(e) => { if (e.key === "Enter") handleSendMessage(); }}
//         sx={{ borderRadius: 2.5 }} alignItems="center" fullWidth placeholder='Write a message...' variant='filled' InputProps={{
//             disableUnderline: true,
//             alignItems: "center",

//             startAdornment: (
//                 <Stack sx={{ width: "max-contents" }}>
//                     <Stack sx={{ position: "relative", display: openAction ? "inline-block" : "none" }}>
//                         {Actions.map((el) => (
//                             <Tooltip placement='right' title={el.title}>


//                                 <Fab sx={{ position: "absolute", top: -el.y, background: el.color }}>
//                                     {el.icon}

//                                 </Fab>
//                             </Tooltip>
//                         ))}
//                     </Stack>
//                     <InputAdornment>
//                         <IconButton
//                             onClick={() => {
//                                 setOpenAction((prev) => !prev);
//                             }}>
//                             <LinkSimple />
//                         </IconButton>
//                     </InputAdornment>
//                 </Stack>),
//             endAdornment: <InputAdornment>
//                 <IconButton
//                     onClick={() => {
//                         setOpenPicker((prev) => (!prev));
//                     }}
//                 ><Smiley /></IconButton>
//             </InputAdornment>
//         }} />
//     )
// }

// const Actions = [
//     {
//         color: "#4da5fe",
//         icon: <Image size={24} />,
//         y: 102,
//         title: "Photo/Video",
//     },
//     {
//         color: "#1b8cfe",
//         icon: <Sticker size={24} />,
//         y: 172,
//         title: "Stickers",
//     },
//     {
//         color: "#0172e4",
//         icon: <Camera size={24} />,
//         y: 242,
//         title: "Image",
//     },
//     {
//         color: "#0159b2",
//         icon: <File size={24} />,
//         y: 312,
//         title: "Document",
//     },
//     {
//         color: "#013f7f",
//         icon: <User size={24} />,
//         y: 382,
//         title: "Contact",
//     },
// ];


// const Footer = () => {
//     const theme = useTheme();
//     const [openPicker, setOpenPicker] = React.useState(false);
//     const [typedText, setTypedText] = useState("");
//     const dispatch = useDispatch()
//     const handleSendMessage = () => {
//         // Guard check: Stop if the text box is empty or no conversation room window is open
//         if (!typedText.trim() || !room_id) return;

//         // 3. Find the target friend's ID inside the current active chat metadata details
//         const activeChat = conversations.find((chat) => chat.id === room_id);
//         const to_user_id = activeChat ? activeChat.user_id : null;

//         // 4. Construct the precise payload object structure expected by your un-nested backend text_message listener
//         const messagePayload = {
//             to: to_user_id,
//             from: user_id,
//             text: typedText, // Matches your updated text field variable configuration
//             conversation_id: room_id,
//             type: "Text" // Tells your switch block to match case "Text"
//         };

//         // 5. Emit over socket channel and pass the callback function to handle continuation securely
//         socket.emit("text_message", messagePayload, (response) => {
//             // This blocks runs ONLY after the backend executes callback() post-database save!
//             if (response && response.status === "Success") {
//                 console.log("Message successfully saved on server:", response.message);

//                 // Append the single clean database sub-document message object bubble straight onto your viewport stream
//                 dispatch(AddDirectMessage({ message: response.message }));

//                 // Clear the text typing input field container instantly
//                 setTypedText("");
//             }
//         });
//     };
//     return (
//         <Box p={1} sx={{

//             width: "100%", background:
//                 theme.palette.mode === "light" ? "#f8faff"
//                     : theme.palette.background.paper, boxShadow: "0 0 2px rgba(0, 0, 0, .25)"
//         }} >
//             {/* Chat Input */}
//             <Stack direction={'row'} alignItems={'center'} spacing={3}>
//                 <Stack sx={{ width: "100%" }}>
//                     <Box sx={{ display: openPicker ? "inline" : "none", zIndex: 10, position: "fixed", bottom: 81, right: 100 }}>
//                         <Picker
//                             theme={theme.palette.mode} data={data} onEmojiSelect={console.log} />
//                     </Box>

//                     <ChatInput setOpenPicker={setOpenPicker} />
//                 </Stack>



//                 <Box sx={{ height: "40px", width: 40, background: theme.palette.primary.main, borderRadius: 1.5 }}>
//                     <Stack sx={{ height: "100%", width: "100%" }} alignItems={'center'} justifyContent={'center'}>
//                         <IconButton

//                             onClick={handleSendMessage}>
//                             <PaperPlaneTilt color='#fff' />
//                         </IconButton>
//                     </Stack>

//                 </Box>

//             </Stack>
//         </Box>

//     )
// }

// export default Footer
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
import { socket } from '../../socket'
import { useDispatch, useSelector } from 'react-redux' // Fixed: Added useSelector
import { AddDirectMessage } from '../../redux/slices/conversation' // Fixed: Added missing slice action path import

const StyledInput = styled(TextField)(({ theme }) => ({
    "& .muiInputBase-Input": {
        padding: ".2px 0 .2px 0",
        borderRadius: 2
    }
}));

// Fix 1 & 2: Destructured state props and handlers passed down from parent container scope
const ChatInput = ({ setOpenPicker, typedText, setTypedText, handleSendMessage }) => {
    const [openAction, setOpenAction] = React.useState(false);
    return (
        <StyledInput
            value={typedText}
            onChange={(e) => setTypedText(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleSendMessage(); }}
            sx={{ borderRadius: 2.5 }}
            alignItems="center"
            fullWidth
            placeholder='Write a message...'
            variant='filled'
            InputProps={{
                disableUnderline: true,
                alignItems: "center",
                startAdornment: (
                    <Stack sx={{ width: "max-contents" }}>
                        <Stack sx={{ position: "relative", display: openAction ? "inline-block" : "none" }}>
                            {Actions.map((el, index) => (
                                <Tooltip key={index} placement='right' title={el.title}>
                                    <Fab sx={{ position: "absolute", top: -el.y, background: el.color }}>
                                        {el.icon}
                                    </Fab>
                                </Tooltip>
                            ))}
                        </Stack>
                        <InputAdornment position="start">
                            <IconButton onClick={() => setOpenAction((prev) => !prev)}>
                                <LinkSimple />
                            </IconButton>
                        </InputAdornment>
                    </Stack>
                ),
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={() => setOpenPicker((prev) => !prev)}>
                            <Smiley />
                        </IconButton>
                    </InputAdornment>
                )
            }}
        />
    )
}

const Actions = [
    { color: "#4da5fe", icon: <Image size={24} />, y: 102, title: "Photo/Video" },
    { color: "#1b8cfe", icon: <Sticker size={24} />, y: 172, title: "Stickers" },
    { color: "#0172e4", icon: <Camera size={24} />, y: 242, title: "Image" },
    { color: "#0159b2", icon: <File size={24} />, y: 312, title: "Document" },
    { color: "#013f7f", icon: <User size={24} />, y: 382, title: "Contact" },
];

const Footer = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [openPicker, setOpenPicker] = React.useState(false);

    // Fix 4: Prefixed React namespace hook instantiation wrapper correctly
    const [typedText, setTypedText] = React.useState("");

    // Fix 3: Successfully pulled missing application criteria markers parameters from Redux state
    const { room_id } = useSelector((state) => state.app);
    const { conversations } = useSelector((state) => state.conversation.direct_chat);
    const user_id = window.localStorage.getItem("user_id");

    const handleSendMessage = () => {
        if (!typedText.trim() || !room_id) return;

        const activeChat = conversations.find((chat) => chat.id === room_id);
        const to_user_id = activeChat ? activeChat.user_id : null;

        const messagePayload = {
            to: to_user_id,
            from: user_id,
            message: typedText,
            conversation_id: room_id,
            type: "msg",
            subtype: "text"
        };
        console.log("new_message:", messagePayload)
        socket.emit("text_message", messagePayload, (response) => {
            if (response && response.status === "Success") {
                console.log("Message successfully saved on server:", response.message);
                dispatch(AddDirectMessage({ message: response.message, conversation_id: room_id }));
                setTypedText(""); // Clears text input container cleanly upon acknowledgment feedback loops
            }
        });
        
    };

    // Emoji Append Mechanism
    const handleEmojiSelect = (emoji) => {
        setTypedText((prev) => prev + emoji.native);
    };

    return (
        <Box p={1} sx={{
            width: "100%",
            background: theme.palette.mode === "light" ? "#f8faff" : theme.palette.background.paper,
            boxShadow: "0 0 2px rgba(0, 0, 0, .25)"
        }} >
            <Stack direction={'row'} alignItems={'center'} spacing={3}>
                <Stack sx={{ width: "100%" }}>
                    <Box sx={{ display: openPicker ? "inline" : "none", zIndex: 10, position: "fixed", bottom: 81, right: 100 }}>
                        <Picker theme={theme.palette.mode} data={data} onEmojiSelect={handleEmojiSelect} />
                    </Box>

                    {/* Forward variables states and tracking pointers down cleanly via props */}
                    <ChatInput
                        setOpenPicker={setOpenPicker}
                        typedText={typedText}
                        setTypedText={setTypedText}
                        handleSendMessage={handleSendMessage}
                    />
                </Stack>

                <Box sx={{ height: "40px", width: 40, background: theme.palette.primary.main, borderRadius: 1.5 }}>
                    <Stack sx={{ height: "100%", width: "100%" }} alignItems={'center'} justifyContent={'center'}>
                        <IconButton onClick={handleSendMessage}>
                            <PaperPlaneTilt color='#fff' />
                        </IconButton>
                    </Stack>
                </Box>
            </Stack>
        </Box>
    )
}

export default Footer;
