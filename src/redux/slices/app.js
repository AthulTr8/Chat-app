import { createSlice } from "@reduxjs/toolkit";
// 
import { dispatch } from "../store";

const initialState = {
    sidebar: {
        open: false,
        type: "CONTACT" // can be CONTACT, STARRED and Shared
    }
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
        }
    }
})

export default slice.reducer


export function toggleSideBar() {
    return async () => {
        dispatch(slice.actions.toggleSideBar())
    }
}

export function updateSideBar(type) {
    return async () => {
        dispatch(slice.actions.updateSideBar({
            type
        }))
    }
}

