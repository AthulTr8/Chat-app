import { io } from "socket.io-client";

let socket

// const connectSocket = (user_id) => {
//     socket = io("http://localhost:3030", {
//         query: `user_id=${user_id}`
//     })
// }
const connectSocket = (user_id) => {
  // Block connections if the ID is missing or evaluates to the literal string "null"
  if (!user_id || user_id === "null") {
    console.warn("Socket connection blocked: user_id is null.");
    return;
  }

  socket = io("http://localhost:3030", {
    query: { user_id },
  });
};

export { socket, connectSocket }