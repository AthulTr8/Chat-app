import { createSlice } from "@reduxjs/toolkit";
// 
// import { dispatch } from "../store";

const initialState = {
    sidebar: {
        open: false,
        type: "CONTACT" // can be CONTACT, STARRED and Shared
    },
    snackbar:{
        open: null,
        message: null,
        severity: null
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
        },
        openSnackBar(state, action){
            state.snackbar.open = true
            state.snackbar.severity = action.payload.severity
            state.snackbar.message = action.payload.message
        },
        closeSnackBar(state){
            state.snackbar.open = false
            state.snackbar.severity = null
            state.snackbar.message = null
        }
    }
})

export default slice.reducer


export function toggleSideBar(dispatch, getState) {
    return async () => {
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

export function showSnackBar({severity, message}){
    return async (dispatch, getState)=>{
        dispatch(slice.actions.openSnackBar({
            severity, message
        }))

        setTimeout(() => {
            dispatch(slice.actions.closeSnackBar())
        }, 4000);
    }

}

export const closeSnackBar =()=> async(dispatch, getState)=>{
    dispatch(slice.actions.closeSnackBar());
}

