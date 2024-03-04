import { NavLink } from "react-router-dom"

export default function Sidebar() {
    return (
        <div className="d-flex justify-content-center text-center">
            <div>
                <button className="btn btn-primary">Favorite Workouts Dropdown</button>
                <ul className="list-group">
                    <li>
                        <NavLink className="nav-link" to="/dashboard">User Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink className="nav-link" to="/exercises">Exercises</NavLink>
                    </li>
                    <li>
                        <NavLink className="nav-link" to="/routine">Routine</NavLink>
                    </li>
                </ul>
            </div>

        </div>
    )
}
