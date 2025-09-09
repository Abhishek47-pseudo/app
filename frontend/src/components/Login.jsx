import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; 
import '../css/Login.css'; 

console.log("Login.css loaded successfully.");

const Login = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Logging in...");
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        setStatus("Login successful!");
        onLoginSuccess(result.token); // Pass the token to the parent
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed.');
      }
    } catch (err) {
      console.error("Login error:", err);
      setStatus(`Error: ${err.message}`);
    }
  };

  return (
    <section id="login" className="login-section">
      <div className="container login-card">
        <h2 className="section-title">Login to AidFlow AI</h2>
        <p>
          Access your account to contribute and monitor disaster relief.
        </p>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-field"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-field"
            />
          </div>

          <button type="submit" className="cta-button-secondary">
            Login
          </button>
          {status && <p style={{ marginTop: '1rem' }}>{status}</p>}
        </form>
        <p className="mt-4 text-sm">
          Don't have an account? <Link to="/register" className="text-blue-500">Register here</Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
