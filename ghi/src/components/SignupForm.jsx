import React, { useEffect, useState } from 'react';
import { useCreateAccountMutation } from '../app/accountAPI';
import { useNavigate } from 'react-router-dom';


function SignupForm() {
  const [createAccount, createAccountStatus] = useCreateAccountMutation()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState("")

  const [formData, setFormData] = useState({
    full_name: '',
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  useEffect(() => {
    if (createAccountStatus.isSuccess) navigate("/dashboard")
    if (createAccountStatus.isError) {
    setErrorMessage(createAccountStatus.error)
  }
  }, [createAccountStatus, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.password === formData.password_confirmation) {
      createAccount(formData)
    }else{
      setErrorMessage("Passwords do not match");
    }
  };

  const handleFormChange = (event) => {
    const value = event.target.value;
    const inputName = event.target.name;

    setFormData({
      ...formData,
      [inputName]: value,
    });
  };

  return (
    <div className="my-5 container">
      <div className="row">
        <div className="col col-sm-auto">
          <img width="300" className="bg-white rounded shadow d-block mx-auto mb-4" src="" alt="" />
        </div>
        <div className="col">
          <div className="card shadow">
            <div className="card-body">
              <h1 className="card-title">Sign Up</h1>
              <form onSubmit={handleSubmit} id="signup-form">
                {errorMessage && <div className='alert alert-danger'>Your signup credentials did not match.</div>}
                <div className="mb-3">
                  <input onChange={handleFormChange} value={formData.name} required type='text' name='name' id='name' className='form-control' />
                  <label htmlFor="name">Name</label>
                </div>
                <div className="mb-3">
                  <input onChange={handleFormChange} value={formData.user_name} required type='text' name='user_name' id='user_name' className='form-control' />
                  <label htmlFor="user_name">User Name</label>
                </div>
                <div className="mb-3">
                  <input onChange={handleFormChange} value={formData.email_address} required type='email' name='email_address' id='email_address' className='form-control' />
                  <label htmlFor="email_address">Email Address</label>
                </div>
                <div className="mb-3">
                  <input onChange={handleFormChange} value={formData.password} required type='password' name='password' id='password' className='form-control' />
                  <label htmlFor="password">Password</label>
                </div>
                <div className="mb-3">
                  <input onChange={handleFormChange} value={formData.password_confirmation} required type='password' name='password_confirmation' id='password_confirmation' className='form-control' />
                  <label htmlFor="password_confirmation">Password Confirmation</label>
                </div>
                <button type="submit" className="btn btn-primary">Hop In</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
