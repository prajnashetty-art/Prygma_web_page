import { useEffect, useRef, useState } from 'react';
import './GoogleSignInButton.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
let gisScriptPromise;

function loadGoogleIdentityServices() {
  if (window.google?.accounts?.id) return Promise.resolve(window.google);
  if (gisScriptPromise) return gisScriptPromise;

  gisScriptPromise = new Promise((resolve, reject) => {
    let script = document.querySelector('script[data-google-identity-services]');
    const shouldAppend = !script;
    if (!script) {
      script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.dataset.googleIdentityServices = 'true';
    }

    script.addEventListener('load', () => resolve(window.google), { once: true });
    script.addEventListener('error', () => reject(new Error('Google sign-in could not load. Check your connection and try again.')), { once: true });
    if (shouldAppend) document.head.appendChild(script);
    if (window.google?.accounts?.id) resolve(window.google);
  }).catch((error) => {
    gisScriptPromise = undefined;
    throw error;
  });

  return gisScriptPromise;
}

export default function GoogleSignInButton({ mode, termsAccepted = false, onSuccess }) {
  const buttonRef = useRef(null);
  const onSuccessRef = useRef(onSuccess);
  const modeRef = useRef(mode);
  const termsAcceptedRef = useRef(termsAccepted);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    onSuccessRef.current = onSuccess;
    modeRef.current = mode;
    termsAcceptedRef.current = termsAccepted;
  }, [mode, onSuccess, termsAccepted]);

  useEffect(() => {
    let isMounted = true;
    const buttonElement = buttonRef.current;

    if (!GOOGLE_CLIENT_ID) {
      setError('Google sign-in is not configured yet. Set VITE_GOOGLE_CLIENT_ID and restart the site.');
      return () => { isMounted = false; };
    }

    loadGoogleIdentityServices()
      .then((google) => {
        if (!isMounted || !buttonElement) return;

        google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: async ({ credential }) => {
            if (!credential || !isMounted) return;
            setError('');

            if (modeRef.current === 'register' && !termsAcceptedRef.current) {
              setError('Accept the Terms & Conditions before continuing with Google.');
              return;
            }

            setIsSubmitting(true);
            try {
              const response = await fetch(`${API_BASE_URL}/api/auth/google`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'X-Requested-With': 'XMLHttpRequest',
                },
                  body: JSON.stringify({
                    credential,
                    mode: modeRef.current,
                    termsAccepted: termsAcceptedRef.current,
                  }),
              });
              const result = await response.json().catch(() => ({}));
              if (!response.ok) throw new Error(result.error || 'Google sign-in failed. Please try again.');
              onSuccessRef.current?.(result);
            } catch (requestError) {
              if (isMounted) setError(requestError.message || 'Could not reach the sign-in service. Try again later.');
            } finally {
              if (isMounted) setIsSubmitting(false);
            }
          },
          auto_select: false,
          use_fedcm_for_button: true,
        });

        const width = Math.max(200, Math.min(400, Math.floor(buttonElement.getBoundingClientRect().width)));
        google.accounts.id.renderButton(buttonElement, {
          type: 'standard',
          theme: 'outline',
          size: 'large',
          text: 'continue_with',
          shape: 'rectangular',
          width,
          logo_alignment: 'left',
        });
      })
      .catch((loadError) => {
        if (isMounted) setError(loadError.message || 'Google sign-in could not be loaded.');
      });

    return () => {
      isMounted = false;
      if (buttonElement) buttonElement.replaceChildren();
    };
  }, []);

  return (
    <div className="google-signin-wrap" aria-busy={isSubmitting}>
      <div className={`google-signin-button${isSubmitting ? ' is-loading' : ''}`} ref={buttonRef} />
      {isSubmitting && <p className="google-signin-status" role="status">Verifying your Google account...</p>}
      {error && <p className="google-signin-error" role="alert">{error}</p>}
    </div>
  );
}
