import { configureStore } from '@reduxjs/toolkit'
// import { loginReducer } from './loginSlice'
import { accountApi } from './accountAPI'

export const store = configureStore({
    reducer: {
        [accountApi.reducerPath]: accountApi.reducer,
        // query: loginReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(accountApi.middleware)
})
