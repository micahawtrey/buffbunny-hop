import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-info">
      <div className="container-fluid">
        <NavLink to={"/"}>
          <img src="/BUFFBunny_Hop_Logo-nobg.png" alt="A muscular bunny flexing above the company name" className='me-3' width={100}/>
        </NavLink>
        <NavLink className="navbar-brand" to={"/"}>Buffbunny Hop</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to={"/"}>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={"/login"}>Login</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={"/signup"}>Sign Up</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={"/dashboard"}>Dashboard</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={"/routine"}>My Routine</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={"/workouts/create"}>Create Workout </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
