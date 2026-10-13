import { useState } from 'react';
import { FaArrowRight, FaCartShopping } from 'react-icons/fa6';
import './Header.css';
import logo from '../assets/Logo.png';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const currentRoute = window.location.hash
    .replace(/^#\/?/, '')
    .split('?')[0]
    .replace(/\/$/, '')
    .toLowerCase();
  const homeIsCurrent = !currentRoute || currentRoute === 'home';
  const coursesIsCurrent = currentRoute === 'courses' || currentRoute.startsWith('courses/');
  const isCurrentRoute = (route) => currentRoute === route;

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
              <a className={`nav-link${homeIsCurrent ? ' is-current' : ''}`} href="#" aria-current={homeIsCurrent ? 'page' : undefined} onClick={closeMenu}>Home</a>
              <a className={`nav-link${coursesIsCurrent ? ' is-current' : ''}`} href="#/courses" aria-current={coursesIsCurrent ? 'page' : undefined} onClick={closeMenu}>Courses</a>
              <a className={`nav-link${isCurrentRoute('categories') ? ' is-current' : ''}`} href="#categories" aria-current={isCurrentRoute('categories') ? 'page' : undefined} onClick={closeMenu}>Categories</a>
              <a className={`nav-link${isCurrentRoute('about') ? ' is-current' : ''}`} href="#about" aria-current={isCurrentRoute('about') ? 'page' : undefined} onClick={closeMenu}>About</a>
              <a className={`nav-link${isCurrentRoute('contact') ? ' is-current' : ''}`} href="#contact" aria-current={isCurrentRoute('contact') ? 'page' : undefined} onClick={closeMenu}>Contact</a>
            </div>
            <div className="site-nav-actions">
              <a className={`site-cart${isCurrentRoute('cart') ? ' is-current' : ''}`} href="#/cart" aria-current={isCurrentRoute('cart') ? 'page' : undefined} onClick={closeMenu}><FaCartShopping aria-hidden="true" /> Shopping Cart</a>
              <a className={`site-login${isCurrentRoute('login') ? ' is-current' : ''}`} href="#/login" aria-current={isCurrentRoute('login') ? 'page' : undefined} onClick={closeMenu}>Log in</a>
              <a className={`site-signup${isCurrentRoute('register') ? ' is-current' : ''}`} href="#/register" aria-current={isCurrentRoute('register') ? 'page' : undefined} onClick={closeMenu}>Sign Up <FaArrowRight aria-hidden="true" /></a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
