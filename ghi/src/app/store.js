import { configureStore } from '@reduxjs/toolkit'
import { accountApi } from './accountAPI'
import { routineAPI } from './routineAPI'
import { workoutAPI } from './workoutAPI'
import { exerciseAPI } from './exerciseAPI'
import { recentWorkoutsAPI } from './recentWorkoutsAPI'

export const store = configureStore({
    reducer: {
        [accountApi.reducerPath]: accountApi.reducer,
        [routineAPI.reducerPath]: routineAPI.reducer,
        [workoutAPI.reducerPath]: workoutAPI.reducer,
        [exerciseAPI.reducerPath]: exerciseAPI.reducer,
        [recentWorkoutsAPI.reducerPath]: recentWorkoutsAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            accountApi.middleware,
            routineAPI.middleware,
            workoutAPI.middleware,
            exerciseAPI.middleware,
            recentWorkoutsAPI.middleware
            ),

})
