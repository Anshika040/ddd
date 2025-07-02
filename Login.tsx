import { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    alert(`Logging in with ${email}`);
  };

  const handleGoogleSignIn = () => {
    alert('Google Sign-In clicked');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Get Started</h1>
        <p className="login-subtext">Welcome back! Please login to your account.</p>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />

        <div className="login-links">
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <Link to="/forgot-password" className="login-link">Forgot password</Link>
        </div>

        <button className="login-button" onClick={handleLogin}>Sign in</button>
        <button className="login-google" onClick={handleGoogleSignIn}>Sign in with Google</button>

        <p className="signup-link">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
