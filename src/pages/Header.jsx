import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  NavLink,
  useNavigate,
} from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  const handleChange = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light py-3 fixed-top'>
      <div className='container'>
        <Link to='/dashboard' className='navbar-brand'>
          My Blog
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon' />
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav ms-auto'>
            <li className='nav-item'>
              <NavLink to='/dashboard' className='nav-link'>
                Home
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink to='/post' className='nav-link'>
                Post
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink to='/about' className='nav-link'>
                About
              </NavLink>
            </li>
            <li className='nav-item mx-4'>
              <button
                type='button'
                className='btn btn-primary px-2'
                onClick={handleChange}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
