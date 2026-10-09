import { useState } from 'react';
import LoginImg from '../assets/LoginImg.png';
import './LoginPage.css';
import './RegisterPage.css';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const NAME_REGEX = /^\p{L}+(?:\s+\p{L}+)*$/u;
// Allows digits only, with an optional leading +. Adjust for a specific numbering plan.
const MOBILE_NUMBER_REGEX = /^\+?\d+$/;
const FIELD_NAMES = ['firstName', 'lastName', 'email', 'mobile', 'password', 'confirmPassword', 'terms'];
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';

function validateField(name, values) {
  const value = values[name];

  if (name === 'firstName' || name === 'lastName') {
    const label = name === 'firstName' ? 'First name' : 'Last name';
    if (!value.trim()) return `${label} is required.`;
    if (!NAME_REGEX.test(value.trim())) return `Use letters only in the ${label.toLowerCase()}.`;
  }

  if (name === 'email') {
    if (!value.trim()) return 'Email address is required.';
    if (!EMAIL_REGEX.test(value.trim())) return 'Enter a valid email address.';
  }

  if (name === 'mobile' && value && !MOBILE_NUMBER_REGEX.test(value)) {
    return 'Use digits only, with an optional + at the beginning.';
  }

  if (name === 'password') {
    const issues = [];
    if (value.length < 8) issues.push('at least 8 characters');
    if (!/[A-Z]/.test(value)) issues.push('an uppercase letter');
    if (!/\d/.test(value)) issues.push('a number');
    if (!/[^A-Za-z0-9]/.test(value)) issues.push('a special character');
    if (issues.length) return `Password must contain ${issues.join(', ')}.`;
  }

  if (name === 'confirmPassword') {
    if (!value) return 'Please confirm your password.';
    if (value !== values.password) return 'Passwords do not match.';
  }

  if (name === 'terms' && !value) return 'You must accept the Terms & Conditions.';
  return '';
}

export default function RegisterPage() {
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [message, setMessage] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const nextValues = { ...values, [name]: type === 'checkbox' ? checked : value };
    setValues(nextValues);
    setMessage('');
    setSubmitError('');

    const fieldsToValidate = [name];
    if (name === 'password' && touched.confirmPassword) {
      fieldsToValidate.push('confirmPassword');
    }

    if (fieldsToValidate.some((field) => touched[field] || nextValues[field] !== '')) {
      setErrors((currentErrors) => {
        const nextErrors = { ...currentErrors };
        fieldsToValidate.forEach((field) => {
          const fieldError = validateField(field, nextValues);
          if (fieldError) nextErrors[field] = fieldError;
          else delete nextErrors[field];
        });
        return nextErrors;
      });
    }
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((currentTouched) => ({ ...currentTouched, [name]: true }));
    const fieldError = validateField(name, values);
    setErrors((currentErrors) => {
      const nextErrors = { ...currentErrors };
      if (fieldError) nextErrors[name] = fieldError;
      else delete nextErrors[name];
      return nextErrors;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextTouched = Object.fromEntries(FIELD_NAMES.map((field) => [field, true]));
    const nextErrors = Object.fromEntries(
      FIELD_NAMES
        .map((field) => [field, validateField(field, values)])
        .filter(([, error]) => error)
    );

    setTouched(nextTouched);
    setErrors(nextErrors);
    setMessage('');
    setSubmitError('');
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: values.firstName.trim(),
          lastName: values.lastName.trim(),
          email: values.email.trim(),
          mobile: values.mobile.trim(),
          password: values.password,
          confirmPassword: values.confirmPassword,
          termsAccepted: values.terms,
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        setSubmitError(result.error || 'Registration failed. Please try again.');
        return;
      }

      setMessage(result.message || 'Registration successful.');
      setValues({
        firstName: '', lastName: '', email: '', mobile: '',
        password: '', confirmPassword: '', terms: false,
      });
      setErrors({});
      setTouched({});
    } catch {
      setSubmitError('Could not reach the registration service. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="login-container register-container">
      <div className="login-left">
        <img src={LoginImg} alt="" className="left-image" />
      </div>

      <section className="login-right register-right" aria-labelledby="register-title">
        <div className="heading">
          <h1 id="register-title">Create your account</h1>
          <p>Already have an account? <a href="#/login">Sign in</a></p>
        </div>

        <form className="register-form" onSubmit={handleSubmit} noValidate>
          <div className="register-name-fields">
            <label>
              First Name
              <input name="firstName" type="text" autoComplete="given-name" value={values.firstName} onChange={handleChange} onBlur={handleBlur} required aria-invalid={Boolean(errors.firstName)} aria-describedby={errors.firstName ? 'first-name-error' : undefined} />
              {errors.firstName && <span className="field-error" id="first-name-error">{errors.firstName}</span>}
            </label>
            <label>
              Last Name
              <input name="lastName" type="text" autoComplete="family-name" value={values.lastName} onChange={handleChange} onBlur={handleBlur} required aria-invalid={Boolean(errors.lastName)} aria-describedby={errors.lastName ? 'last-name-error' : undefined} />
              {errors.lastName && <span className="field-error" id="last-name-error">{errors.lastName}</span>}
            </label>
          </div>

          <label>
            Email Address
            <input name="email" type="email" autoComplete="email" value={values.email} onChange={handleChange} onBlur={handleBlur} required aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />
            {errors.email && <span className="field-error" id="email-error">{errors.email}</span>}
          </label>

          <label>
            Mobile Number <span className="optional-label">(optional)</span>
            <input name="mobile" type="tel" inputMode="tel" autoComplete="tel" value={values.mobile} onChange={handleChange} onBlur={handleBlur} aria-invalid={Boolean(errors.mobile)} aria-describedby={errors.mobile ? 'mobile-error' : 'mobile-hint'} />
            {errors.mobile ? <span className="field-error" id="mobile-error">{errors.mobile}</span> : <span className="field-hint" id="mobile-hint">Enter whole digits, optionally starting with +.</span>}
          </label>

          <label>
            Password
            <input name="password" type="password" autoComplete="new-password" value={values.password} onChange={handleChange} onBlur={handleBlur} required aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? 'password-error' : 'password-hint'} />
            {errors.password ? <span className="field-error" id="password-error">{errors.password}</span> : <span className="field-hint" id="password-hint">At least 8 characters, including an uppercase letter, a number, and a special character.</span>}
          </label>

          <label>
            Confirm Password
            <input name="confirmPassword" type="password" autoComplete="new-password" value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur} required aria-invalid={Boolean(errors.confirmPassword)} aria-describedby={errors.confirmPassword ? 'confirm-password-error' : undefined} />
            {errors.confirmPassword && <span className="field-error" id="confirm-password-error">{errors.confirmPassword}</span>}
          </label>

          <label className="terms-label">
            <input name="terms" type="checkbox" checked={values.terms} onChange={handleChange} onBlur={handleBlur} required aria-invalid={Boolean(errors.terms)} aria-describedby={errors.terms ? 'terms-error' : undefined} />
            <span>I agree to the Terms &amp; Conditions</span>
          </label>

          {errors.terms && <p className="field-error" id="terms-error" role="alert">{errors.terms}</p>}
          {submitError && <p className="field-error" role="alert">{submitError}</p>}
          {message && <p className="register-message" role="status">{message}</p>}

          <button type="submit" className="sibmit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Creating account…' : 'Register'}
          </button>
        </form>
      </section>
    </main>
  );
}
