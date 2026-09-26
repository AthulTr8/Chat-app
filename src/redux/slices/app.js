import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// 
// import { dispatch } from "../store";

const initialState = {
    sidebar: {
        open: false,
        type: "CONTACT" // can be CONTACT, STARRED and Shared
    },
    snackbar: {
        open: null,
        message: null,
        severity: null
    },
    users: [],
    friends: [],
    friendRequests: [],
    chat_type: null,
    room_id: null,
}

const slice = createSlice({
    name: "app",
    initialState,
    reducers: {
        // Toggle sidebar
        toggleSideBar(state) {
            state.sidebar.open = !state.sidebar.open
        },
        updateSideBar(state, action) {
            state.sidebar.type = action.payload.type
        },
        openSnackBar(state, action) {
            state.snackbar.open = true
            state.snackbar.severity = action.payload.severity
            state.snackbar.message = action.payload.message
        },
        closeSnackBar(state) {
            state.snackbar.open = false
            state.snackbar.severity = null
            state.snackbar.message = null
        },
        updateUsers(state, action) {
            state.users = action.payload.users
        },
        updateFriends(state, action) {
            state.friends = action.payload.friends
        },
        updateFriendRequests(state, action) {
            state.friendRequests = action.payload.requests
        },
        selectConversation(state, action){
            state.chat_type = "individual"
            state.room_id = action.payload.room_id
        }
    }
})

export default slice.reducer


export function toggleSideBar() {
    return async (dispatch, getState) => {
        dispatch(slice.actions.toggleSideBar())
    }
}

export function updateSideBar(type) {
    return async (dispatch, getState) => {
        dispatch(slice.actions.updateSideBar({
            type
        }))
    }
}

export function showSnackBar({ severity, message }) {
    return async (dispatch, getState) => {
        dispatch(slice.actions.openSnackBar({
            severity, message
        }))

        setTimeout(() => {
            dispatch(slice.actions.closeSnackBar())
        }, 4000);
    }

}

export const closeSnackBar = () => async (dispatch, getState) => {
    dispatch(slice.actions.closeSnackBar());
}

export const fetchUsers =  () => {
    return async (dispatch, getState) => {
        await axios.get("/user/get-all", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer${getState().auth.token}`
            }
        }).then((response) => {
            console.log(response)
            dispatch(slice.actions.updateUsers({users: response.data.data}))
        }).catch((error) => {
            console.log(error)
        })
    }
}
export const fetchFriends = () => {
    return async (dispatch, getState) => {
        await axios.get("/user/get-friends", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer${getState().auth.token}`
            }
        }).then((response) => {
            console.log(response)
            dispatch(slice.actions.updateFriends({friends: response.data.data}))
        }).catch((error) => {
            console.log(error)
        })
    }
}
export const fetchFriendRequests =  () => {
    return async (dispatch, getState) => {
        await axios.get("/user/get-friend-requests", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer${getState().auth.token}`
            }
        }).then((response) => {
            console.log(response)
            dispatch(slice.actions.updateFriendRequests({requests: response.data.data}))
        }).catch((error) => {
            console.log(error)
        })
    }
}

export const SelectConversation = ({room_id})=>{
    return (dispatch, getState)=>{
        dispatch(slice.actions.selectConversation({room_id}))
    }
}