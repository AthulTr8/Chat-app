import { Box, Stack, Typography } from "@mui/material";
import Chats from "./Chats";
import Conversation from "../../components/Conversation";
import { useTheme } from "@mui/material/styles"
import Contacts from "../../components/Contacts";
import { useSelector } from "react-redux";
import SharedMessages from "../../components/SharedMessages";
import StarredMessage from "../../components/StarredMessage";
import NoChatSVG from "../../assets/Illustration/NoChat"
const GeneralApp = () => {
  const theme = useTheme();
  const { sidebar, chat_type, room_id } = useSelector((store) => store.app)
  return (

    <Stack direction={"row"} sx={{ width: "100%" }}>
      <Chats />


      <Box sx={{
        width: sidebar.open ? "calc(100vw - 50%)" : "calc(100vw - 420px)",
        height: "100%",
        background: theme.palette.mode === "light" ? "#f0fafa" : theme.palette.background.default
      }}>

        {/* Conversation */}
        {room_id !== null && chat_type === "individual" ? <Conversation /> : <>
          <Stack spacing={2} sx={{
            height: "100%", width: "100%"
          }} alignItems={"center"} justifyContent={"center"}>
            <NoChatSVG />
            <Typography variant="subtitle2">Select a conversation or start a new one</Typography>
          </Stack>
        </>}

      </Box>
      {sidebar.open && (() => {
        switch (sidebar.type) {
          case "CONTACT":
            return <Contacts />
          case "SHARED":
            return <SharedMessages />
          case "STARRED":
            return <StarredMessage />
          default:
            return <></>
        }
      })()}

    </Stack>
  );
};

export default GeneralApp;
