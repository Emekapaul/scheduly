import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import '../styles/Signup.css';

export default function Signup() {
  const { signup } = useContext(AuthContext);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: '',
    firstName: '',
    lastName: '',
    dob: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    if (error) setError(null); // Clear the error if user starts
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, firstName, lastName, dob, password } = formValues;

    if (!email.trim()) {
      return setError('Email is required');
    }
    if (!firstName.trim()) {
      return setError('First Name is required');
    }
    if (!dob.trim()) {
      return setError('Date of Birth is required');
    }
    if (!password.trim()) {
      return setError('Password is required');
    }

    setLoading(true);
    try {
      await signup(email, firstName, lastName, dob, password);
      setFormValues({ email: '', firstName: '', lastName: '', dob: '', password: '' }); // Clear the form
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

        <label htmlFor='firstName'>First Name</label>
        <input
          id='firstName'
          name='firstName'
          type='text'
          value={formValues.firstName}
          onChange={handleInputChange}
          autoComplete="name"
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          value={formValues.lastName}
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
        <button className='signupButton'>REGISTER</button>
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