import { useEffect, useState } from 'react';
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
    setErrorMessage(createAccountStatus.error.data.detail)
  }
  }, [createAccountStatus, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.password === formData.password_confirmation) {
      createAccount(formData)
    }else{
      setErrorMessage("Passwords do not match.");
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
        <div className="col">
          <div className="card shadow mx-5">
            <div className="card-body">
              <h1 className="card-title">Sign Up</h1>
              <form onSubmit={handleSubmit} id="signup-form">
                {errorMessage && <div className='alert alert-danger'>{errorMessage}</div>}
                <div className="mb-3 form-floating">
                  <input onChange={handleFormChange} value={formData.full_name} required type='text' name='full_name' id='full_name' className='form-control' />
                  <label htmlFor="name">Name</label>
                </div>
                <div className="mb-3 form-floating">
                  <input onChange={handleFormChange} value={formData.username} required type='text' name='username' id='username' className='form-control' />
                  <label htmlFor="user_name">User Name</label>
                </div>
                <div className="mb-3 form-floating">
                  <input onChange={handleFormChange} value={formData.email} required type='email' name='email' id='email' className='form-control' />
                  <label htmlFor="email_address">Email Address</label>
                </div>
                <div className="mb-3 form-floating">
                  <input onChange={handleFormChange} value={formData.password} required type='password' name='password' id='password' className='form-control' />
                  <label htmlFor="password">Password</label>
                </div>
                <div className="mb-3 form-floating">
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
