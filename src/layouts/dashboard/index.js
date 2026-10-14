// import React, { useEffect } from "react";
// import { Stack } from "@mui/material";
// import { Navigate, Outlet } from "react-router-dom";
// import SideBar from "./SideBar";
// import { useDispatch, useSelector } from "react-redux";
// import { connectSocket, socket } from "../../socket";
// import { SelectConversation, showSnackBar } from "../../redux/slices/app";
// import { AddDirectConversation, UpdateDirectConversation } from "../../redux/slices/conversation";


// const DashboardLayout = () => {

//   const dispatch = useDispatch()
//   const { isLoggedIn } = useSelector((state) => state.auth)
//   const { conversations } = useSelector((state) => state.conversation.direct_chat)
//   const user_id = window.localStorage.getItem("user_id")

//   useEffect(() => {
//     if (isLoggedIn) {
//       window.onload = function () {
//         if (!window.location.hash) {
//           window.location += '#loaded'
//           window.location.reload()
//         }
//       }
//       // window.onload()
//       if (!socket) {
//         connectSocket(user_id)
//       }
//       // New friend request

//       socket.on("new_friend_request", (data) => {
//         dispatch(showSnackBar({ severity: "success", message: data.message }))
//       })
//       socket.on("request_accepted", (data) => {
//         dispatch(showSnackBar({ severity: "success", message: data.message }))
//       })
//       socket.on("request_sent", (data) => {
//         dispatch(showSnackBar({ severity: "success", message: data.message }))
//       })
//       socket.on("start_chat", (data) => {
//         // 
//         console.log(data)
//         const existing_conversation = conversations.find((el) => el.id === data._id)
//         if (existing_conversation) {
//           dispatch(UpdateDirectConversation({ conversation: data }))
//         } else {
//           // add direct conversation
//           dispatch(AddDirectConversation({ conversation: data }))
//         }
//         dispatch(SelectConversation({room_id: data._id}))
//       })
//     }
//     return () => {
//       socket?.off("new_friend_request")
//       socket?.off("request_accepted")
//       socket?.off("request_sent")
//       socket?.off("start_chat")
//     }
//   }, [isLoggedIn, socket])

//   if (!isLoggedIn) {
//     return <Navigate to={"/auth/login"} />
//   }

//   return (
//     <>
//       <Stack direction="row" sx={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
//         {/* SideBar */}
//         <SideBar />
//         <Outlet />
//       </Stack>
//     </>
//   );
// };

// export default DashboardLayout;
import React, { useEffect } from "react";
import { Stack } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import { connectSocket, socket } from "../../socket";
import { SelectConversation, showSnackBar } from "../../redux/slices/app";
import { AddDirectConversation, AddDirectMessage, UpdateDirectConversation } from "../../redux/slices/conversation";

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { conversations } = useSelector((state) => state.conversation.direct_chat);
  const user_id = window.localStorage.getItem("user_id");
  const { room_id } = useSelector((state) => state.app)
  useEffect(() => {
    if (isLoggedIn) {
      if (!socket) {
        connectSocket(user_id);
      }

      socket.on("new_friend_request", (data) => {
        dispatch(showSnackBar({ severity: "success", message: data.message }));
      });
      socket.on("request_accepted", (data) => {
        dispatch(showSnackBar({ severity: "success", message: data.message }));
      });
      socket.on("request_sent", (data) => {
        dispatch(showSnackBar({ severity: "success", message: data.message }));
      });

      socket.on("start_chat", (data) => {
        console.log("start_chat incoming data event payload:", data);

        // This execution loop evaluates perfectly because 'conversations' is tracked dynamically now
        const existing_conversation = conversations.find((el) => el.id === data._id);

        if (existing_conversation) {
          dispatch(UpdateDirectConversation({ conversation: data }));
        } else {
          dispatch(AddDirectConversation({ conversation: data }));
        }
        dispatch(SelectConversation({ room_id: data._id }));
      });
      socket.on("new_message", (data) => {
        console.log("Real-time live message arrived over socket:", data);

        // data structure from backend: { conversation_id, message: { _id, from, to, text, ... } }
        dispatch(UpdateDirectConversation({
          conversation_id: data.conversation_id,
          message: data.message
        }))
        // Verify if the receiver is physically looking at the exact same chat room right now
        if (room_id === data.conversation_id) {
          // Push it straight into Redux! The receiver's screen will instantly update.
          dispatch(AddDirectMessage({ message: data.message }));
        } else {
          // Optional: You can trigger a notification badge or toast here later!
          console.log("Received a message from a different chat room.");
        }
      });
    }

    return () => {
      socket?.off("new_friend_request");
      socket?.off("request_accepted");
      socket?.off("request_sent");
      socket?.off("start_chat");
      socket?.off("new_message");
    };

    // Fix 2: Added conversations array to the dependency block to eliminate stale closures!
  }, [isLoggedIn, user_id, conversations, room_id, dispatch]);

  if (!isLoggedIn) {
    return <Navigate to={"/auth/login"} />;
  }

  return (
    <Stack direction="row" sx={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <SideBar />
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
