import { NavLink } from 'react-router-dom';
import { useGetTokenQuery, useLogoutMutation } from '../app/accountAPI';
import { useNavigate } from 'react-router-dom';

function Nav() {
  const { data, isLoading } = useGetTokenQuery()
  const [logout, logoutStatus] = useLogoutMutation()
  const navigate = useNavigate()


  if (isLoading) {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-info">
        <div className="container-fluid d-flex justify-content-start">
          <NavLink to={"/"}>
            <img src="/BUFFBunny_Hop_Logo-nobg.png" alt="A muscular bunny flexing above the company name" className='me-3' width={100}/>
          </NavLink>
          <NavLink className="navbar-brand" to={"/"}>Buffbunny Hop</NavLink>
        </div>
      </nav>
    )
  }

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
            {!data &&
            <li className="nav-item">
              <NavLink className="nav-link" to={"/login"}>Login</NavLink>
            </li>}
            {!data &&
            <li className="nav-item">
              <NavLink className="nav-link" to={"/signup"}>Sign Up</NavLink>
            </li>}
            {data &&
            <li className="nav-item">
              <NavLink className="nav-link" to={"/dashboard"}>Dashboard</NavLink>
            </li>}
            {data &&
            <li className="nav-item">
              <NavLink className="nav-link" to={"/routines"}>Routines</NavLink>
            </li>}
            {data &&
            <li className="nav-item">
              <NavLink className="nav-link" to={"/workouts/create"}>Create Workout </NavLink>
            </li>}
            {data &&
            <li className="nav-item">
              <NavLink className="nav-link" to={"routines/create"}>Create Routine</NavLink>
            </li>}
          </ul>
          {data &&
          <button
            className='btn btn-danger me-5'
            onClick={() => {
            logout()
            navigate("/")
            }}>
              Logout
          </button>}
        </div>
      </div>
    </nav>
  )
}

export default Nav;
