import { useState, useEffect } from 'react';
import { useLoginMutation } from '../app/accountAPI';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [login, loginStatus] = useLoginMutation()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState("")

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  useEffect(() => {
    if (loginStatus.isSuccess) navigate("/dashboard")
    if (loginStatus.isError) setErrorMessage(loginStatus.error)
  }, [loginStatus, navigate])

  const handleSubmit = (event) => {
      event.preventDefault();
      login(formData)
  };

  const handleFormChange = (event) => {
    const value = event.target.value;
    const inputName = event.target.name;
    setFormData({
      ...formData,
      [inputName]: value
    });
  };

  return (
      <div className="my-5 container">
    <div className="row">
      <div className="col col-sm-auto">
        <img width="300" className="bg-white rounded shadow d-block mx-auto mb-4" src="" alt=""/>
      </div>
      <div className="col">
        <div className="card shadow">
          <div className="card-body">
            <h1 className="card-title">Login</h1>
            <form onSubmit={handleSubmit} id="login-form">
              {errorMessage && <div className='alert alert-danger'>Invalid credentials.</div>}
              <div className="mb-3 form-floating">
                <input onChange={handleFormChange} value={formData.username} placeholder="User Name" required type='text' name='username' id='username' className='form-control' />
                <label htmlFor="username">User Name</label>
              </div>

              <div className="mb-3 form-floating">
                <input onChange={handleFormChange} value={formData.password} placeholder="Password" required type='password' name='password' id='password' className='form-control' />
                <label htmlFor="password">Password</label>
              </div>
              <button type="submit" className="btn btn-primary">Hop On</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}

export default LoginForm;
