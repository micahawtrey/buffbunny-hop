import { useEffect, useState } from 'react';
import { useCreateAccountMutation } from '../app/accountAPI';
import { useNavigate } from 'react-router-dom';
import buffBunnyLogo from './BUFFBunny_Hop_Logo-nobg.png'; // Import the logo image

function SignupForm() {
  const [createAccount, createAccountStatus] = useCreateAccountMutation();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    full_name: '',
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  useEffect(() => {
    if (createAccountStatus.isSuccess) navigate("/dashboard");
    if (createAccountStatus.isError) {
      setErrorMessage(createAccountStatus.error.data.detail);
    }
  }, [createAccountStatus, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.password === formData.password_confirmation) {
      createAccount(formData);
    } else {
      setErrorMessage("Passwords do not match.");
    }
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const formContainerStyle = {
    padding: '2rem',
    maxWidth: '600px',
    margin: '0 auto',
    backgroundImage: `url(${buffBunnyLogo})`, // Set the logo image as background
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'black',
    textShadow: "2px 2px 7px black"
  };

  return (
    <div style={formContainerStyle} className="my-5 container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow mx-auto">
            <div className="card-body">
              <h1 className="card-title text-center">Sign Up</h1>
              {errorMessage && <div className='alert alert-danger'>{errorMessage}</div>}
              <form onSubmit={handleSubmit} id="signup-form">
                <div className="mb-3 form-floating">
                  <input onChange={handleFormChange} value={formData.full_name} required type='text' name='full_name' id='full_name' className='form-control' />
                  <label htmlFor="full_name">Name</label>
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
