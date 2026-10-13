import { useEffect, useState } from 'react';
import HomePage from './pages/HomePage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailsPage from './pages/CourseDetailsPage';
import CartPage from './pages/CartPage';

function getCurrentRoute() {
  return window.location.hash
    .replace(/^#\/?/, '')
    .split('?')[0]
    .replace(/\/$/, '')
    .toLowerCase();
}

function App() {
  const [currentPage, setCurrentPage] = useState(getCurrentRoute);

  useEffect(() => {
    const updatePage = () => setCurrentPage(getCurrentRoute());
    window.addEventListener('hashchange', updatePage);
    return () => window.removeEventListener('hashchange', updatePage);
  }, []);

  if (currentPage === 'login') return <LoginPage />;
  if (currentPage === 'register') return <RegisterPage />;
  if (currentPage === 'cart') return <CartPage />;
  if (currentPage === 'forgot-password') return <ForgotPasswordPage />;
  if (currentPage === 'reset-password') return <ResetPasswordPage />;
  if (currentPage.startsWith('courses/')) return <CourseDetailsPage courseSlug={currentPage.slice('courses/'.length)} />;
  if (currentPage === 'courses') return <CoursesPage />;
  return <HomePage />;
}

export default App
