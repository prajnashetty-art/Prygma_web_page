import { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import './Header.css';
import logo from '../assets/Logo.png';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <nav className="navbar navbar-expand-lg site-navbar" aria-label="Main navigation">
        <div className="container-xl">
          <a className="navbar-brand site-brand" href="#" aria-label="Prygma home" onClick={closeMenu}>
            <img src={logo} alt="Prygma" />
          </a>
          <button
            className="navbar-toggler site-nav-toggle"
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="site-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className={`collapse navbar-collapse${menuOpen ? ' show' : ''}`} id="site-navigation">
            <div className="navbar-nav site-nav-links ms-lg-auto">
              <a className="nav-link is-current" href="#" onClick={closeMenu}>Home</a>
              <a className="nav-link" href="#courses" onClick={closeMenu}>Courses</a>
              <a className="nav-link" href="#categories" onClick={closeMenu}>Categories</a>
              <a className="nav-link" href="#about" onClick={closeMenu}>About</a>
              <a className="nav-link" href="#contact" onClick={closeMenu}>Contact</a>
            </div>
            <div className="site-nav-actions">
              <a className="site-login" href="#/login" onClick={closeMenu}>Log in</a>
              <a className="site-signup" href="#/register" onClick={closeMenu}>Get started <FaArrowRight aria-hidden="true" /></a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
