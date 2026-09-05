import { Avatar, Badge, Box, Stack, Typography, useTheme } from "@mui/material";
import { StyledBadge } from "./StyleBadge";
import { useDispatch } from "react-redux";
import { SelectConversation } from "../redux/slices/app";

export const ChatElement = ({ data }) => {
    const theme = useTheme();
    const dispatch = useDispatch()
    return (
        <Box
        onClick = {()=>{
            dispatch(SelectConversation({room_id: data.id}))
        }}
        sx={{
            width: "100%",
            background: theme.palette.mode === "light" ? "#fff" : theme.palette.background.paper,
            borderRadius: 1,
            mb: 1.5 // Added a bottom margin to separate items in the list cleanly
        }}
            p={2}
        >
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <Stack direction={'row'} spacing={2}>
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                        invisible={!data.online} // Dynamic status toggle indicator flag
                        // invisible = "true"
                    >

                        {/* <Avatar
                            src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${data?.name || "User"}`}
                        /> */}
                        {/* <Avatar src={`https://i.pravatar.cc/150?u=${data?.name}`} /> */}
                        <Avatar
                            src={`https://api.dicebear.com/9.x/initials/svg?seed=${data?.name || "User"}`}
                        />
                        {/* console.log(faker.image.avatar()); */}
                    </StyledBadge>

                    <Stack spacing={0.3}>
                        {/* FIX 3: Dynamic Data mapping assertions */}
                        <Typography variant='subtitle2'>
                            {data.name}
                        </Typography>
                        <Typography variant='caption'>
                            {data.msg}
                        </Typography>
                    </Stack>

                </Stack>
                <Stack spacing={1.5} alignItems={'center'}>
                    <Typography sx={{ fontWeight: 600 }} variant='caption'>
                        {data.time}
                    </Typography>
                    {/* FIX 4: Only show badge structure if there are actual unread messages */}
                    {data.unread > 0 && (
                        <Badge color='primary' badgeContent={data.unread} max={99} />
                    )}
                </Stack>

            </Stack>
        </Box>
    )
};
