import React, { useState, useEffect } from 'react';
import { useLoginMutation } from '../app/accountAPI';
import { useNavigate } from 'react-router-dom';
import buffBunnyLogo from './BUFFBunny_Hop_Logo-nobg.png'; // Ensure this path is correct

function LoginForm() {
  const [login, { isSuccess, isError, error }] = useLoginMutation();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isSuccess) navigate("/dashboard");
    else if (isError) setErrorMessage(error.data?.message || "An error occurred");
  }, [isSuccess, isError, error, navigate]);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
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
    login(formData);
  };

  const containerStyle = {
    backgroundImage: `url(${buffBunnyLogo})`, // Use the imported image as background
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
    textShadow: "2px 2px 7px black",
  };

  // Adjust the width of the form container here
  const formContainerStyle = {
    maxWidth: '500px', // Set a max-width for larger screens
    width: '60%', // Use 100% of the container width on smaller screens
    padding: '20px', // Add some padding around the form
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional: Add a slight background color to enhance readability
    borderRadius: '15px', // Optional: Round the corners of the form container
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Optional: Add a subtle shadow for depth
  };

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          {errorMessage && <div className='alert alert-danger'>{errorMessage}</div>}
          <div className="mb-3 form-floating">
            <input type="text" name="username" className="form-control" id="username" placeholder="User Name" required value={formData.username} onChange={handleFormChange} />
            <label htmlFor="username">User Name</label>
          </div>
          <div className="mb-3 form-floating">
            <input type="password" name="password" className="form-control" id="password" placeholder="Password" required value={formData.password} onChange={handleFormChange} />
            <label htmlFor="password">Password</label>
          </div>
          <button type="submit" className="btn btn-primary">Hop On</button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
