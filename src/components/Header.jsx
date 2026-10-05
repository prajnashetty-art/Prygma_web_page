import React from 'react';
import { FaHome, FaBook, FaList, FaInfoCircle, FaEnvelope, FaSearch, FaUser, FaUserPlus, FaShoppingCart } from 'react-icons/fa';
import './Header.css';
import logo from '../assets/Logo.png';

export default function Header() {
  return (
    <nav className="navbar navbar-expand-sm site-navbar">
      <div className="container-fluid px-3">
        <div className="header-logo-group">
          <a className="navbar-brand d-flex align-items-center text-black" href="#">
            <img src={logo} alt="Platform Logo" width= "100" height="42"/>
          </a>
        </div>

        <div className="navbar-collapse header-right-group">
          <ul className="navbar-nav mb-2 mb-lg-0 gap-lg-2">
            <li className="nav-item">
              <a className="nav-link active" href="#"><FaHome className="me-2" />Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#"><FaBook className="me-2" />Courses</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#"><FaList className="me-2" />Categories</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#"><FaInfoCircle className="me-2" />About Us</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#"><FaEnvelope className="me-2" />Contact Us</a>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-2 flex-wrap ms-lg-3">
            <form className="d-flex me-2" role="search">
              <input className="form-control" style={{ width: '320px' }} type="search" placeholder="Search..." aria-label="Search" />
              <button className="btn btn-light ms-2" type="submit"><FaSearch /></button>
            </form>
            <a className="nav-link" href="#"><FaUser className="me-2" />Login</a>
            <a className="nav-link" href="#"><FaUserPlus className="me-2" />Sign Up</a>
            <a className="btn btn-outline-dark rounded-pill px-3" href="#">
              <FaShoppingCart className="me-2" />Cart
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
