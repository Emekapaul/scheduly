// src/components/Header.js
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import logo from '../assets/favicon.png';
import '../styles/Header.css'; // For optional styling

function Header() {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Scheduly Logo" />
          </Link>
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/calendar">Calendar</Link>
          </li>
          {/* Show user info and logout if logged in */}
          {user ? (
            <li className='logout'>
              {/*<span>Welcome, {user.username}!</span>*/}
              <button onClick={logout}>Logout</button>
            </li>
          ) : (
            <li>
              <Link to="/login">Login</Link>{'/'}
              <Link to="/register">Signup</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;