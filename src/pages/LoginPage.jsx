import { useState } from 'react';
import LoginImg from '../assets/LoginImg.png';
import './LoginPage.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const result = await response.json();

      if (!response.ok) {
        setError(result.error || 'Unable to log in. Please try again.');
        return;
      }

      setError('');
      window.location.hash = '#/';
    } catch {
      setError('Could not reach the login service. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="login-container">
       {/* Left side */}
        <div className = "login-left">
             <img src={LoginImg} alt="Login illustration" className="left-image" />
        </div>


        {/* Right side */}
        <div className = "login-right">
            <div className="heading"><h2>Sign In</h2>
            <p> Or <a href="#/register">Create a new account</a></p> 
            <button className = "google-btn">Continue with Google</button>
            </div>
            

            <form onSubmit = {handleSubmit}>
                <input type ="email"
                         placeholder = "Enter email"
                         value ={email}
                         onChange = {(e) => { setEmail(e.target.value); setError(''); }}
                         required
                         />
                <input type ="password"
                        placeholder = "Enter password"
                        value ={password}
                        onChange = {(e) => { setPassword(e.target.value); setError(''); }}
                        required
                        />
                        {error && <p className="error">{error}</p>}
                
                <div className = "options">
                    <label>
                        <input type = "checkbox"/>Remember me
                     </label>
                     <a href ="#/forgot-password">Forgot your password</a>
                </div>    
                <button type="submit" className ="sibmit-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Signing in…' : 'Sign In'}
                </button>
            </form>
            </div>

    </div>

  );
};
