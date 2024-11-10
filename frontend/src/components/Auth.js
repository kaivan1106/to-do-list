import React, { useState } from 'react';
import { signup, login } from '../services/api';

function Auth({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = isSignup ? await signup(formData) : await login(formData);
      const token = response.data.token;
      localStorage.setItem('token', token);
      onLogin(token); // Update the parent state with the token
    } catch (error) {
      setError(error.response?.data?.error || 'Authentication error');
    }
  };

  return (
    <div className="auth-container">
      <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="input-group">
          <input
            name="username"
            onChange={handleChange}
            placeholder="Username"
            required
            className="auth-input"
          />
        </div>
        <div className="input-group">
          <input
            name="password"
            onChange={handleChange}
            type="password"
            placeholder="Password"
            required
            className="auth-input"
          />
        </div>
        <button type="submit" className="submit-button">{isSignup ? 'Sign Up' : 'Login'}</button>
      </form>
      <button onClick={() => setIsSignup(!isSignup)} className="toggle-button">
        {isSignup ? 'Switch to Login' : 'Switch to Sign Up'}
      </button>
    </div>
  );
}

export default Auth;
