import React, { useState } from 'react';
import './login.css';

const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    role: 'student',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Logging in:', form);
  };

  return (
    <div className="auth-wrapper">
      <form className="auth-box" onSubmit={handleLogin}>
        <h2>Login</h2>
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </select>
        <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
        <button type="submit">Login</button>
        <div className="divider">OR</div>
        <button type="button" className="google-btn">Login with Google</button>
        <p>Don’t have an account? <a href="/signup">Sign up</a></p>
      </form>
    </div>
  );
};

export default Login;
