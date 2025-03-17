import React from 'react'
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import NavBar from '../components/NavBar'
import { useState } from 'react';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Call your API to log in the user
    const response = await fetch('https://mern-cloud-bitcoin-mining-backend.onrender.com/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
      }),
    });

    const data = await response.json();

    if (data.token) {
      // Store the JWT token and username in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', formData.username);

      // Redirect to the home page or dashboard after successful login
      navigate('/'); // Navigate to home or dashboard page
    } else {
      setErrorMessage(data.message || 'Invalid credentials');
    }
  };
  
  return (
    <div className='flex flex-col items-center'>
      <NavBar />
      <div className='bg-[#363a6b] p-6 max-w-md w-full rounded-lg mt-6 text-white flex justify-center flex-col'>
        <h1 className='font-bold text-5xl mb-6'>Login</h1>
        
        <h3 className='font-semibold text-2xl'>Username</h3>
        <input value={formData.username}
            onChange={handleChange}
            required
            name='username'
            className='p-1 rounded-md my-2 pl-2 text-black' placeholder='John Doe'></input>
        <h3 className='font-semibold text-2xl mt-2'>Password</h3>
        <input value={formData.password}
            onChange={handleChange}
            required
            name='password'
            className='p-1 rounded-md my-2 pl-2 text-black' placeholder='123456'></input>

        <button onClick={handleSubmit} className='bg-[#4e5496] p-1 w-full text-center text-xl font-bold rounded-lg mt-6'>Login</button>
        {errorMessage&&<p className="text-red-400 text-center mt-1">{errorMessage}</p>}
        <p className='flex gap-1 justify-center mt-1 text-lg'>Need an account? <button onClick={() => navigate("/signup")}  className='font-bold'>sign up</button></p>
      </div>
    </div>
  )
}

export default Login
