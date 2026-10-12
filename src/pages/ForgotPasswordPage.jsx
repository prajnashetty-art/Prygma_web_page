import { useState } from 'react';
import LoginImg from '../assets/LoginImg.png';
import './LoginPage.css';
import './ForgotPasswordPage.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(result.error || `Password reset request failed (HTTP ${response.status}). Please restart the API server and try again.`);
        return;
      }

      setMessage(result.message || 'Password reset link sent. Check your email.');
    } catch {
      setError('Could not reach the password reset service. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="login-container forgot-password-container">
      <div className="login-left">
        <img src={LoginImg} alt="" className="left-image" />
      </div>

      <section className="login-right forgot-password-right" aria-labelledby="forgot-password-title">
        <div className="heading">
          <h2 id="forgot-password-title">Forgot Password?</h2>
          <p>Enter your email address to request a password reset link.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="forgot-password-label" htmlFor="reset-email">Email Address</label>
          <input
            id="reset-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Enter email address"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setMessage('');
              setError('');
            }}
            required
          />
          {error && <p className="forgot-password-message" role="alert">{error}</p>}
          {message && <p className="forgot-password-success" role="status">{message}</p>}
          <button type="submit" className="sibmit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Sending…' : 'Send Reset Link'}
          </button>
        </form>

        <p className="forgot-password-back"><a href="#/login">Back to Sign In</a></p>
      </section>
    </main>
  );
}
