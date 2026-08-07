import { Box, Stack } from "@mui/material";
import Chats from "./Chats";
import Conversation from "../../components/Conversation";
import {useTheme} from "@mui/material/styles"
import Contacts from "../../components/Contacts";
import { useSelector } from "react-redux";
import SharedMessages from "../../components/SharedMessages";
import StarredMessage from "../../components/StarredMessage";
const GeneralApp = () => {
const theme = useTheme();
const {sidebar} = useSelector((store) => store.app)
  return (

    <Stack direction={"row"} sx={{ width: "100%" }}>
      <Chats />


      <Box sx={{
        width: sidebar.open ? "calc(100vw - 50%)" : "calc(100vw - 420px)",
        height: "100%",
        background: theme.palette.mode === "light" ? "#f0fafa": theme.palette.background.default
      }}>

        {/* Conversation */}
        <Conversation/>
      </Box>
      {sidebar.open && (() =>{
        switch (sidebar.type) {
          case "CONTACT":
          return <Contacts/>
          case "SHARED":
            return <SharedMessages/>
            case "STARRED":
            return <StarredMessage/>
          default:
            return<></>
        }
      })() }
      
    </Stack>
  );
};

export default GeneralApp;
