import React, { useState } from 'react';
import { AlertCircle, User, Lock, LogIn, UserCheck } from 'lucide-react';
import './Login.css';

const LoginSystem = ({ onLoginSuccess }) => {

  const validCredentials = {
    username: import.meta.env.VITE_USERNAME,
    password: import.meta.env.VITE_PWD
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: '' });


  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (username === validCredentials.username && password === validCredentials.password) {
      showToast('Login successful ', 'success');
    
      setTimeout(() => {
        onLoginSuccess(username);
      }, 1000);
    } else {
      showToast('Incorrect username or password!', 'error');
    }
  };

 
  const showToast = (message, type) => {
    setToast({ show: true, message, type });

  
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 3000);
  };

  return (
    <div className="container">
   
      {toast.show && (
        <div className={`toast ${toast.type === 'error' ? 'toast-error' : 'toast-success'}`}>
          {toast.type === 'error' ? (
            <AlertCircle className="toast-icon" />
          ) : (
            <UserCheck className="toast-icon" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

    
      <div className="login-card">
        <h1 className="login-title">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="username">
              Username
            </label>
            <div className="input-container">
              <div className="input-icon-wrapper">
                <User className="input-icon" />
              </div>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-input"
                placeholder="Enter your username"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <div className="input-container">
              <div className="input-icon-wrapper">
                <Lock className="input-icon" />
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            <LogIn className="btn-icon" />
            Login
          </button>
        </form>
      
      </div>
    </div>
  );
};

export default LoginSystem;
