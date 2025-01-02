import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';
import styles from './Login.module.css';

const Dashboard = () => {
  const location = useLocation();
  const userName = location.state?.userName || 'User';
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const [birthDate, setBirthDate] = useState('');
  const [zodiacSign, setZodiacSign] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token
    setUser(null); // Reset user in context
    navigate('/'); // Redirect to login
  };

  const calculateZodiacSign = (date) => {
    const birthDate = new Date(date);
    const month = birthDate.getMonth() + 1; // Months are 0-indexed
    const day = birthDate.getDate();

    let sign = '';
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) sign = 'Aries';
    else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) sign = 'Taurus';
    else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) sign = 'Gemini';
    else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) sign = 'Cancer';
    else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) sign = 'Leo';
    else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) sign = 'Virgo';
    else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) sign = 'Libra';
    else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) sign = 'Scorpio';
    else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) sign = 'Sagittarius';
    else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) sign = 'Capricorn';
    else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) sign = 'Aquarius';
    else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) sign = 'Pisces';

    return sign;
  };

  const handleBDChange = (e) => {
    const date = e.target.value;
    setBirthDate(date);
    if (date) {
      const sign = calculateZodiacSign(date);
      setZodiacSign(sign);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Hello, {userName}!</h1>
      <p>Welcome to your dashboard. Here is some content just for you!</p>
      <div className={styles.content}>
        <div>
          <label htmlFor="birthDate">Enter your birth date:</label>
          <input
            type="date"
            id="birthDate"
            value={birthDate}
            onChange={handleBDChange}
            className={styles.input}
          />
        </div>

        {zodiacSign && (
          <p>Your zodiac sign is: <strong>{zodiacSign}</strong></p>
        )}
      </div>
      <button onClick={handleLogout} className={styles.button}>Logout</button>
    </div>
  );
};

export default Dashboard;
