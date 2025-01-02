import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';
import styles from './Login.module.css'; 

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user); 
      alert('Login successful');
      navigate('/dashboard', { state: { userName: res.data.user.name } }); // Pass userName to Dashboard
    } catch (err) {
      alert('Error: ' + (err.response?.data?.message || 'Something went wrong'));
    }
  };

  const handleRegister = () => navigate('/register'); // Navigate to Register page

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Login</h2>
        <input
          type="email"
          name="email"
          className={styles.input}
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          className={styles.input}
          placeholder="Password"
          onChange={handleChange}
        />
        <button type="submit" className={styles.button}>Login</button>
        <button type="button" onClick={handleRegister} className={styles.button}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Login;
