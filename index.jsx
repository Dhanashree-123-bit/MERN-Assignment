import React, { useState } from 'react';
import axios from 'axios';

function Registration() {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    mobile_number: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/users', form);
      alert('Registration Successful');
      window.location.href = '/login';
    } catch (err) {
      console.error(err);
      alert('Registration Failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="first_name" placeholder="First Name" onChange={handleChange} />
      <input name="last_name" placeholder="Last Name" onChange={handleChange} />
      <input name="mobile_number" placeholder="Mobile Number" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <button type="submit">Register</button>
    </form>
  );
}

export default Registration;
