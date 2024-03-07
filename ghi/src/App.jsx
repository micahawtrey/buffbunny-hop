import Sidebar from './components/Sidebar'
import './App.css'
import Nav from './components/Nav'
import { Outlet } from "react-router-dom"


function App() {
    return (
        <div>
            <Nav />
            <Sidebar />
            <Outlet />
        </div>
    )
}

export default App
