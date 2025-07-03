import React, { useState } from 'react';
import './signup.css';

const Signup = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'student',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Signing up:', form);
  };

  return (
    <div className="auth-wrapper">
      <form className="auth-box" onSubmit={handleSignup}>
        <h2>Sign Up</h2>
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </select>
        <div className="name-row">
          <input type="text" name="firstName" placeholder="First Name" required onChange={handleChange} />
          <input type="text" name="lastName" placeholder="Last Name" required onChange={handleChange} />
        </div>
        <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
        <button type="submit">Sign Up</button>
        <div className="divider">OR</div>
        <button type="button" className="google-btn">Sign up with Google</button>
        <p>Already have an account? <a href="/login">Login</a></p>
      </form>
    </div>
  );
};

export default Signup;
