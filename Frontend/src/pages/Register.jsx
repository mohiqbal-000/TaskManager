import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

export default function Register() {
  const [formData, setFormData] = useState({ username: '', password: '', role: '' });
  const [message, setMessage] = useState('');
    const navigate = useNavigate(); 


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.post('http://localhost:8080/api/register', formData);
      setMessage('Registration successful');
      console.log('Registered user:', response.data);
            navigate('/task'); // Change '/tasks' to your actual route name

    } catch (err) {
      setMessage('Registration failed. Try a different username.');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <input name="role" placeholder="Role" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
