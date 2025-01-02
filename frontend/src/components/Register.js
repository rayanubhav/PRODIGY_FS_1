import React, { useState } from 'react';
import axios from 'axios';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register ', formData);
      alert('Registration successful');
      navigate('/');
    } catch (err) {
      alert('Error: ' + err.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input type="text" name="name" className={styles.input} placeholder="Name" onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" className={styles.input} onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" className={styles.input} onChange={handleChange} />
      <button type="submit" className={styles.button}>Register</button>
    </form>
  );
};

export default Register;
