import React, { useEffect, useState } from 'react';

function LoginForm() {
  const [login, setLogin] = useState([]);

  const [formData, setFormData] = useState({
    user_name: '',
    password: '',
  });

  const fetchData = async () => {
    const url = 'http://localhost:8000/api/clients/';
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        setLogin(data.login);
    }
  };

  useEffect(() => {
      fetchData();
  }, []);

  const handleSubmit = async (event) => {
      event.preventDefault();

      const url = 'http://localhost:8000/api/clients/';
      const fetchOptions = {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
              'Content-Type': 'application/json',
          }
      };

      const response = await fetch(url, fetchOptions);
      if (response.ok) {
        setFormData({
          user_name: '',
          password: '',
        });
      }
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

              <div className="mb-3">
                <input onChange={handleFormChange} value={formData.user_name} placeholder="User Name" required type='text' name='user_name' id='user_name' className='form-control' />
                <label htmlFor="user_name">User Name</label>
              </div>

              <div className="mb-3">
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
