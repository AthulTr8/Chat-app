import { Box, Stack } from "@mui/material";
import Chats from "./Chats";
import Conversation from "../../components/Conversation";
import {useTheme} from "@mui/material/styles"
const GeneralApp = () => {
const theme = useTheme();
  return (

    <Stack direction={"row"} sx={{ width: "100%" }}>
      <Chats />


      <Box sx={{
        width: "calc(100vw - 430px)",
        height: "100%",
        background: theme.palette.mode === "light" ? "#f0fafa": theme.palette.background.default
      }}>

        {/* Conversation */}
        <Conversation/>
      </Box>
    </Stack>
  );
};

export default GeneralApp;
