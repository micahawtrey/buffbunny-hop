import { useState, useEffect } from 'react';
import { useCreateAccountMutation } from '../app/accountAPI';
import { useNavigate } from 'react-router-dom';
import buffBunnyLogo from './BUFFBunny_Hop_Logo-nobg.png';

function SignupForm() {
  const [createAccount, { isSuccess, isError, error }] = useCreateAccountMutation();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isSuccess) navigate("/dashboard");
    else if (isError) setErrorMessage(error.data?.message || "An error occurred");
  }, [isSuccess, isError, error, navigate]);

  const [formData, setFormData] = useState({
    full_name: '',
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createAccount(formData);
  };

  const containerStyle = {
    backgroundImage: `url(${buffBunnyLogo})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
    textShadow: "2px 2px 7px black",
  };


  const formContainerStyle = {
    maxWidth: '500px',
    width: '60%',
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '15px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          {errorMessage && <div className='alert alert-danger'>{errorMessage}</div>}
          <div className="mb-3 form-floating">
            <input type="text" name="full_name" className="form-control" id="full_name" placeholder="Full Name" required value={formData.full_name} onChange={handleFormChange} />
            <label htmlFor="full_name">Full Name</label>
          </div>
          <div className="mb-3 form-floating">
            <input type="text" name="username" className="form-control" id="username" placeholder="User Name" required value={formData.username} onChange={handleFormChange} />
            <label htmlFor="username">User Name</label>
          </div>
          <div className="mb-3 form-floating">
            <input type="email" name="email" className="form-control" id="email" placeholder="Email Address" required value={formData.email} onChange={handleFormChange} />
            <label htmlFor="email">Email Address</label>
          </div>
          <div className="mb-3 form-floating">
            <input type="password" name="password" className="form-control" id="password" placeholder="Password" required value={formData.password} onChange={handleFormChange} />
            <label htmlFor="password">Password</label>
          </div>
          <div className="mb-3 form-floating">
            <input type="password" name="password_confirmation" className="form-control" id="password_confirmation" placeholder="Confirm Password" required value={formData.password_confirmation} onChange={handleFormChange} />
            <label htmlFor="password_confirmation">Confirm Password</label>
          </div>
          <button type="submit" className="btn btn-primary">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
