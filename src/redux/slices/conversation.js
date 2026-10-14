
import { faker } from "@faker-js/faker";
import { createSlice } from "@reduxjs/toolkit";

function formatTimestamp(isoString) {
    const date = new Date(isoString);
    const now = new Date();

    // Calculate difference in milliseconds
    const diffTime = now - date;

    // Convert time differences to days
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    // 1. Within the same calendar day -> Show Time (e.g., "14:17" or "2:17 PM")
    if (date.toDateString() === now.toDateString()) {
        return date.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    }

    // 2. Beyond 1 day but within 7 days -> Show Weekday + Time (e.g., "Monday, 14:17")
    if (diffDays < 7) {
        const weekday = date.toLocaleDateString('en-IN', { weekday: 'long' });
        const time = date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
        return `${weekday}, ${time}`;
    }

    // 3. Beyond 1 week -> Show Date + Month (e.g., "08 Oct")
    return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short'
    });
}


const initialState = {
    direct_chat: {
        conversations: [],
        current_conversation: null,
        current_messages: [] // Tracks active text bubbles stream
    },
    group_chat: {}
};

const slice = createSlice({
    name: "conversation",
    initialState,
    reducers: {
        fetchDirectConversation(state, action) {
            const user_id = window.localStorage.getItem("user_id");

            const list = action.payload.conversations.map((el) => {
                const this_user = el.participants.find((elm) => elm._id.toString() !== user_id) || { firstName: "User", lastName: "", status: "offline" };

                // Extract text from the last message object in the history array if it exists
                const hasMessages = el.messages && el.messages.length > 0;
                const lastMessageObj = hasMessages ? el.messages[el.messages.length - 1] : null;
                const latestText = lastMessageObj ? (lastMessageObj.text || lastMessageObj.message) : "Click to start chatting...";
                const latestMessageTime = lastMessageObj ? (lastMessageObj.created_at) : null
                return {
                    id: el._id,
                    user_id: this_user._id,
                    name: `${this_user.firstName} ${this_user.lastName || ""}`.trim(),
                    online: this_user.status?.toLowerCase() === "online",
                    img: faker.image.avatar(),
                    msg: latestText,
                    time: formatTimestamp(latestMessageTime),
                    unread: 0,
                    pinned: false,
                };
            });
            state.direct_chat.conversations = list;
        },

        selectConversation(state, action) {
            state.direct_chat.current_conversation = action.payload.room_id;
        },

        // updateDirectConversation(state, action) {
        //     const user_id = window.localStorage.getItem("user_id");
        //     // const payload = action.payload
        //     const this_conversation = action.payload;

        //     state.direct_chat.conversations = state.direct_chat.conversations.map((el) => {
        //         if (el.id !== this_conversation.conversation_id) {
        //             return el;
        //         } else {
        //             // const user = this_conversation.participants.find((elm) => elm._id.toString() !== user_id) || { firstName: "User", lastName: "", status: "offline" };
        //             const user = this_conversation.message.to
        //             // const hasMessages = this_conversation.messages && this_conversation.messages.length > 0;
        //             // const lastMessageObj = hasMessages ? this_conversation.messages[this_conversation.messages.length - 1] : null;
        //             // const latestText = lastMessageObj ? (lastMessageObj.text || lastMessageObj.message) : "Click to start chatting...";
        //             const latestText = this_conversation.message.text
        //             // const latestMessageTime = lastMessageObj ? (lastMessageObj.created_at) : null
        //             const latestMessageTime = this_conversation.message.createdAt

        //             return {
        //                 // id: this_conversation._id,
        //                 // user_id: user._id,
        //                 // name: `${user.firstName} ${user.lastName || ""}`.trim(),
        //                 // online: user.status?.toLowerCase() === "online",
        //                 ...el,
        //                 img: el.img,
        //                 msg: latestText,
        //                 time: formatTimestamp(latestMessageTime),
        //                 unread: el.unread,
        //                 pinned: el.pinned,
        //             };
        //         }
        //     });
        // },
        updateDirectConversation(state, action) {
            // 1. Destructure the exact real-time properties from the network packet payload
            console.log("inside update direct conversation")
            console.log("payload", action.payload)
            const { conversation_id, message } = action.payload;
            if (!conversation_id || !message) return;
             console.log("conversationid:",conversation_id)
             console.log("message:",message)
            // 2. Locate the existing chat card index position inside the sidebar list array
            const targetIndex = state.direct_chat.conversations.findIndex(
                (card) => card.id?.toString() === conversation_id.toString()
            );
            console.log("target index: ",targetIndex)
            // 3. Perform the update if the conversation exists in the list
            if (targetIndex !== -1) {
                // Extract a direct reference to the card (Immer handles the tracking automatically)
                const targetCard = state.direct_chat.conversations[targetIndex];

                // Update ONLY the text preview and timestamp fields
                targetCard.msg = message.text || message.message || "Sent an attachment";
                targetCard.time = formatTimestamp(message.createdAt || Date.now());

                // Increment the unread badge tally if the user is looking elsewhere
                if (state.direct_chat.current_conversation !== conversation_id) {
                    targetCard.unread += 1;
                }

                // 4. UX EFFICIENCY: Move the active conversation card to the very top of the list
                if (targetIndex > 0) {
                    // Remove the card from its old vertical slot position
                    state.direct_chat.conversations.splice(targetIndex, 1);
                    // Insert it directly at index 0 so it flashes live at the top of the sidebar
                    state.direct_chat.conversations.unshift(targetCard);
                }
            } else {
                // Fallback for logging unexpected network states
                console.warn(`[Redux] No conversation found matching ID: ${conversation_id}`);
            }
        },


        addDirectConversation(state, action) {
            const user_id = window.localStorage.getItem("user_id");
            const this_conversation = action.payload.conversation;

            const exists = state.direct_chat.conversations.some(el => el.id === this_conversation._id);
            if (exists) return;

            const user = this_conversation.participants.find((elm) => elm._id.toString() !== user_id) || { firstName: "User", lastName: "", status: "offline" };

            const hasMessages = this_conversation.messages && this_conversation.messages.length > 0;
            const lastMessageObj = hasMessages ? this_conversation.messages[this_conversation.messages.length - 1] : null;
            const latestText = lastMessageObj ? (lastMessageObj.text || lastMessageObj.message) : "Click to start chatting...";

            state.direct_chat.conversations.push({
                id: this_conversation._id,
                user_id: user._id,
                name: `${user.firstName} ${user.lastName || ""}`.trim(),
                online: user.status?.toLowerCase() === "online",
                img: faker.image.avatar(),
                msg: latestText, // ✅ Fixed: Read real chat snippet arrays natively
                time: formatTimestamp(Date.now()),
                unread: 0,
                pinned: false,
            });
        },

        fetchCurrentMessages(state, action) {
            state.direct_chat.current_messages = action.payload.messages;
        },

        addDirectMessages(state, action) {

            const alreadyexist = state.direct_chat.current_messages.some((el)=> {
               return el._id === action.payload.message._id.toString()
            })

            // alreadyexist ? null : state.direct_chat.current_messages.push(action.payload.message)
           if(!alreadyexist){
            state.direct_chat.current_messages.push(action.payload.message)
           }
        }



    }
});

export default slice.reducer;

// =============================================================
// ACTIONS CUSTOM fashion WRAPPERS SIGNATURES
// =============================================================

export const FetchDirectConversation = ({ conversations }) => async (dispatch) => {
    dispatch(slice.actions.fetchDirectConversation({ conversations }));
};

export const AddDirectConversation = ({ conversation }) => async (dispatch) => {
    dispatch(slice.actions.addDirectConversation({ conversation }));
};

export const UpdateDirectConversation = ({ conversation_id, message  }) => async (dispatch) => {
    dispatch(slice.actions.updateDirectConversation({ conversation_id, message }));
};

export const FetchCurrentMessages = ({ messages }) => async (dispatch) => {
    dispatch(slice.actions.fetchCurrentMessages({ messages }));
};

export const AddDirectMessage = ({ message }) => async (dispatch) => {
    dispatch(slice.actions.addDirectMessages({ message}));
};
