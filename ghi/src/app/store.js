import { configureStore } from '@reduxjs/toolkit'
// import { loginReducer } from './loginSlice'
import { accountApi } from './accountAPI'
import { routineAPI } from './routineAPI'
import { workoutAPI } from './workoutAPI'

export const store = configureStore({
    reducer: {
        [accountApi.reducerPath]: accountApi.reducer,
        [routineAPI.reducerPath]: routineAPI.reducer,
        [workoutAPI.reducerPath]: workoutAPI.reducer,
        // query: loginReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            accountApi.middleware,
            routineAPI.middleware,
            workoutAPI.middleware,
            ),

})
