import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: '',
    password: '',
}

export const logoutSlice = createSlice ({
    name: 'logout',
    initialState,
    reducers: {
        reset: (state) => {
            state.username = ''
            state.password = ''
        },
        setLogout: (state, action) => {
            state.username = action.payload
            state.password = action.payload
        }
    }
})

export const { reset, setLogin } = logoutSlice.actions

export default logoutSlice.reducer;
