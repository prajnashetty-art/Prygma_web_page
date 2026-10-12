import { useState } from 'react';
import LoginImg from '../assets/LoginImg.png';
import './LoginPage.css';
import './ForgotPasswordPage.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';
const token = new URLSearchParams(window.location.hash.split('?')[1] || '').get('token') || '';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');

    if (!token) {
      setError('This reset link is invalid or has expired. Request a new link.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password, confirmPassword }),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(result.error || `Password reset failed (HTTP ${response.status}). Please request a new link.`);
        return;
      }

      setMessage(result.message || 'Password reset successful. You can now sign in.');
      setPassword('');
      setConfirmPassword('');
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

      <section className="login-right forgot-password-right" aria-labelledby="reset-password-title">
        <div className="heading">
          <h2 id="reset-password-title">Reset Password</h2>
          <p>Choose a new password for your account.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="forgot-password-label" htmlFor="new-password">New Password</label>
          <input
            id="new-password"
            name="password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(event) => { setPassword(event.target.value); setError(''); setMessage(''); }}
            minLength={8}
            required
            aria-describedby="reset-password-hint"
          />
          <span className="forgot-password-hint" id="reset-password-hint">
            At least 8 characters, including an uppercase letter, a number, and a special character.
          </span>

          <label className="forgot-password-label" htmlFor="confirm-new-password">Confirm New Password</label>
          <input
            id="confirm-new-password"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(event) => { setConfirmPassword(event.target.value); setError(''); setMessage(''); }}
            minLength={8}
            required
          />

          {error && <p className="forgot-password-message" role="alert">{error}</p>}
          {message && <p className="forgot-password-success" role="status">{message} <a href="#/login">Sign in</a></p>}
          <button type="submit" className="sibmit-btn" disabled={isSubmitting || Boolean(message)}>
            {isSubmitting ? 'Updating…' : 'Reset Password'}
          </button>
        </form>

        <p className="forgot-password-back"><a href="#/login">Back to Sign In</a></p>
      </section>
    </main>
  );
}
