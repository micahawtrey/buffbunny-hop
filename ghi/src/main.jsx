import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './app/store.js'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Exercise from './components/Exercise'
import LoginForm from './components/LoginForm'
import Main from './components/MainPage'
import Routine from './components/Routines.jsx'
import CreateRoutine from './components/RoutineCreation'
import SignupForm from './components/SignupForm'
import UserDashboard from './components/UserDashboard'
import CreateWorkout from './components/CreateWorkout'
import ErrorElement from './components/errorPage.jsx'


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorElement />,
        children: [
            {index: true, element: <Main />},
            {path: "login", element: <LoginForm />},
            {path: "signup", element: <SignupForm />},
            {path: "dashboard", element: <UserDashboard />},
            {path: "exercises/:exercise_name", element: <Exercise />},
            {path: "workouts/create", element: <CreateWorkout />},
            {path: "routines/", element: <Routine />},
            {path: "routines/create", element: <CreateRoutine />}
            ]
    },
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
)
