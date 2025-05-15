import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
//import { toast } from "react-toastify";
import '../styles/Signup.css';

export default function Signup() {
  const { signup } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: '',
    firstname: '',
    lastname: '',
    dob: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    if (error) setError(null); // Clear the error if user starts
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, firstname, lastname, dob, password } = formValues;

    if (!email.trim()) return setError('Email is required');
    if (!firstname.trim()) return setError('First Name is required');
    if (!dob.trim()) return setError('Date of Birth is required');
    if (!password.trim()) return setError('Password is required');

    setLoading(true);
    try {
      await signup(email, firstname, lastname, dob, password);
      setFormValues({ email: '', firstname: '', lastname: '', dob: '', password: '' }); // Clear the form
    } catch (error) {
      const errorMessage = error.response ? error.response.data.error : error.message;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='signup'>
      <form className='signup__form' onSubmit={handleSubmit}>
        <h2 className='signup__title'>Create an account</h2>
        <label htmlFor='email'>Email Address</label>
        <input
          id='email'
          name='email'
          type='email'
          value={formValues.email}
          onChange={handleInputChange}
          autoComplete="email"
        />

        <label htmlFor='firstname'>First Name</label>
        <input
          id='firstname'
          name='firstname'
          type='text'
          value={formValues.firstname}
          onChange={handleInputChange}
          autoComplete="name"
        />

        <label htmlFor="lastname">Last Name</label>
        <input
          id="lastname"
          name="lastname"
          type="text"
          value={formValues.lastname}
          onChange={handleInputChange}
          autoComplete="name"
          placeholder="optional"
        />

        <label htmlFor="dob">Date of Birth</label>
        <input
          id="dob"
          name="dob"
          type="date"
          value={formValues.dob}
          onChange={handleInputChange}
          autoComplete="dob"
        />

        <label htmlFor='password'>Password</label>
        <input
          id='password'
          type='password'
          name='password'
          value={formValues.password}
          onChange={handleInputChange}
        />

        {error && <p className="signup__error">{error}</p>}

        <button type="submit" className='signupButton' disabled={loading}>
          {loading ? <div className="spinner"></div> : 'Sign up'}
        </button>
        <p style={{ textAlign: "center", marginTop: "30px" }}>
          Already have an account?{" "}
          <Link className='link' to='/login'>
            Sign in
          </Link>
        </p>
      </form>
    </main>
  );
};