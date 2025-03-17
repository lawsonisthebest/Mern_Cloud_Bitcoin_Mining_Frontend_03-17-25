import React from 'react'
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import NavBar from '../components/NavBar'
import { useState } from 'react';

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password validation
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    // Call your API to sign up the user
    const response = await fetch('http://localhost:4000/api/signup', {
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

    if (data.message === 'User created successfully') {
      // Store token and username in localStorage on successful sign-up
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', formData.username);

      // Redirect to the login page or home page after successful signup
      navigate('/'); // Redirect to login page after successful sign-up
    } else {
      setErrorMessage(data.message || 'Something went wrong!');
    }
  };


  return (
    <div className='flex flex-col items-center'>
      <NavBar />
      <div className='bg-[#363a6b] p-6 max-w-md w-full rounded-lg mt-6 text-white flex justify-center flex-col'>
        <h1 className='font-bold text-5xl mb-6'>Sign Up</h1>
        
        <h3 className='font-semibold text-2xl'>Username</h3>
        <input value={formData.username}
            name='username'
            required
            onChange={handleChange} className='p-1 rounded-md my-2 pl-2 text-black' placeholder='John Doe'></input>
        <h3 className='font-semibold text-2xl mt-2'>Password</h3>
        <input value={formData.password}
            name='password'
            required
            onChange={handleChange} className='p-1 rounded-md my-2 pl-2 text-black' placeholder='123456'></input>
        <h3 className='font-semibold text-2xl mt-2'>Confirm Password</h3>
        <input value={formData.confirmPassword}
            name='confirmPassword'
            required
            onChange={handleChange} className='p-1 rounded-md my-2 pl-2 text-black' placeholder='123456'></input>

        <button onClick={handleSubmit} className='bg-[#4e5496] p-1 w-full text-center text-xl font-bold rounded-lg mt-6'>Sign Up</button>
        {errorMessage&&<p className="text-red-400 text-center mt-1">{errorMessage}</p>}
        <p className='flex gap-1 justify-center mt-1 text-lg'>Have an account? <button onClick={() => navigate("/login")} className='font-bold'>login</button></p>
      </div>
    </div>
  )
}

export default Signup
