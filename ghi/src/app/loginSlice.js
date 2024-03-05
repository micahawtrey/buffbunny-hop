import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: '',
    password: '',
}

export const loginSlice = createSlice ({
    name: 'login',
    initialState,
    reducers: {
        reset: (state) => {
            state.username = ''
            state.password = ''
        },
        setLogin: (state, action) => {
            state.username = action.payload
            state.password = action.payload
        }
    }
})

export const { reset, setLogin } = loginSlice.actions

export default loginSlice.reducer;
