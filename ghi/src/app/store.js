import { configureStore } from '@reduxjs/toolkit'
// import { loginReducer } from './loginSlice'
import { accountApi } from './accountAPI'
import { routineAPI } from './routineAPI'
import { workoutAPI } from './workoutAPI'
import { exerciseAPI } from './exerciseAPI'

export const store = configureStore({
    reducer: {
        [accountApi.reducerPath]: accountApi.reducer,
        [routineAPI.reducerPath]: routineAPI.reducer,
        [workoutAPI.reducerPath]: workoutAPI.reducer,
        [exerciseAPI.reducerPath]: exerciseAPI.reducer
        // query: loginReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            accountApi.middleware,
            routineAPI.middleware,
            workoutAPI.middleware,
            exerciseAPI.middleware
            ),

})
