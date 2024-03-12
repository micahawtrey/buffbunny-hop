import Sidebar from './components/Sidebar'
import './App.css'
import Nav from './components/Nav'
import { Outlet } from "react-router-dom"


function App() {
    return (
        <div>
            <Nav />
            <div className='row'>
                <div className='d-flex flex-column flex-shrink-0 p-3 text-white bg-dark' style={{maxWidth: 275}}>
                    <Sidebar />
                </div>
                <div className='col'>
                    <Outlet />
                </div>
            </div>


        </div>
    )
}

export default App
