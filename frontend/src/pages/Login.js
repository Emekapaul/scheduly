import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
//import { toast } from "react-toastify";
import '../styles/Login.css';

export default function Login() {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    if (error) setError(null); // Clear the error if user starts
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const { email, password } = formValues;

    if (!email.trim() || !password.trim()) {
      return setError('Email and password are required');
    }

    setLoading(true);
    try {
      await login(email, password);
      setFormValues({ email: '', password: '' }); // Clear the form
    } catch (error) {
      const errorMessage = error.response ? error.response.data.error : error.message;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className='login'>
      <form className="login__form" onSubmit={handleLogin}>
        <h2 className="login__title">Log into your account</h2>
        <label htmlFor="email">Email</label>
        <input
          id='email'
          name='email'
          type='email'
          autoComplete="email"
          value={formValues.email}
          onChange={(handleInputChange)}
          className="username"
        />

        <label htmlFor="password">Password</label>
        <input
          id='password'
          type='password'
          name='password'
          value={formValues.password}
          onChange={(handleInputChange)}
          className="password"
        />
        {error && <p className="login__error">{error}</p>}
        <button type="submit" className="login__button" disabled={loading}>
          {loading ? <div className="spinner"></div> : 'Sign in'}
        </button>
        <p style={{ textAlign: 'center', marginTop: '30px' }}>
          Don't have an account?{' '}
          <Link className="Link" to='/register'>
            Create an account
          </Link>
        </p>
      </form>
    </main>
  )
}