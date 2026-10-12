import bcrypt from 'bcryptjs';
import cors from 'cors';
import { createHash, randomBytes } from 'node:crypto';
import dotenv from 'dotenv';
import express from 'express';
import { OAuth2Client } from 'google-auth-library';
import nodemailer from 'nodemailer';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getUsersCollection } from './db.js';

const serverDirectory = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(serverDirectory, '.env') });

const port = Number(process.env.PORT || 5001);/* reads the port from .env or defaults to 5001 if not specified */
const allowedOrigins = (process.env.FRONTEND_ORIGINS || 'http://localhost:5173,http://127.0.0.1:5173')
  .split(',')
  .map((origin) => origin.trim())/*Removes whitespaces around URIs*/
  .filter(Boolean); /* Removes any empty strings from the array of origins */

const app = express();
app.use(cors({ origin: allowedOrigins }));/*Enables CORS for allowed origins*/
app.use(express.json({ limit: '16kb' })); /*Parses JSON request bodies*/

const users = await getUsersCollection();
const googleAuthClient = new OAuth2Client();

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const nameRegex = /^\p{L}+(?:\s+\p{L}+)*$/u;
const mobileNumberRegex = /^\+?\d+$/;
const passwordMeetsPolicy = (password) => typeof password === 'string'
  && password.length >= 8
  && /[A-Z]/.test(password)
  && /\d/.test(password)
  && /[^A-Za-z0-9]/.test(password);

function getSmtpSettings() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || user;

  const hasPlaceholder = [host, user, pass, from].some((value) => (
    !value
    || /^your[-_]/i.test(value)
    || /(?:^|\.)example\.com$/i.test(value)
    || /^smtp\.example\.com$/i.test(value)
  ));

  if (hasPlaceholder || !Number.isInteger(port) || port < 1 || port > 65535) {
    return null;
  }

  const secure = process.env.SMTP_SECURE
    ? process.env.SMTP_SECURE.toLowerCase() === 'true'
    : port === 465;

  return { host, port, user, pass, from, secure };
}

app.post('/api/login', async (request, response) => {
  const email = typeof request.body?.email === 'string'
    ? request.body.email.trim().toLowerCase()
    : '';
  const password = typeof request.body?.password === 'string'
    ? request.body.password
    : '';

  if (!emailRegex.test(email) || !password) {
    return response.status(400).json({ error: 'Enter a valid email address and password.' });
  }

  try {
    const user = await users.findOne({ email });
    if (!user) {
      return response.status(404).json({ error: 'User is not registered.' });
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash || '');
    if (!passwordMatches) {
      return response.status(401).json({ error: 'Incorrect password.' });
    }

    return response.status(200).json({
      message: 'Login successful.',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Login failed:', error);
    return response.status(500).json({ error: 'Unable to log in right now. Please try again.' });
  }
});

app.post('/api/auth/google', async (request, response) => {
  if (request.get('X-Requested-With') !== 'XMLHttpRequest') {
    return response.status(400).json({ error: 'Invalid sign-in request.' });
  }

  const googleClientId = process.env.GOOGLE_CLIENT_ID;
  const credential = typeof request.body?.credential === 'string' ? request.body.credential : '';
  const mode = request.body?.mode;
  const termsAccepted = request.body?.termsAccepted === true;

  if (!googleClientId) {
    return response.status(503).json({ error: 'Google sign-in is not configured on the server.' });
  }
  if (!credential || credential.length > 8192 || !['login', 'register'].includes(mode)) {
    return response.status(400).json({ error: 'Invalid Google sign-in details.' });
  }
  if (mode === 'register' && !termsAccepted) {
    return response.status(400).json({ error: 'Accept the Terms & Conditions to register.' });
  }

  let profile;
  try {
    const ticket = await googleAuthClient.verifyIdToken({ idToken: credential, audience: googleClientId });
    profile = ticket.getPayload();
  } catch (error) {
    console.error('Google credential verification failed:', error);
    return response.status(401).json({ error: 'Google sign-in could not be verified. Please try again.' });
  }

  const email = profile?.email?.trim().toLowerCase();
  const googleId = profile?.sub;
  if (!email || !emailRegex.test(email) || !googleId || profile.email_verified !== true) {
    return response.status(401).json({ error: 'Google did not return a verified email address.' });
  }

  try {
    if (mode === 'register') {
      const existingUser = await users.findOne({ $or: [{ googleId }, { email }] });
      if (existingUser) {
        return response.status(409).json({ error: 'An account with this email already exists. Please sign in.' });
      }

      const firstName = String(profile.given_name || profile.name?.split(/\s+/)[0] || 'Google').trim();
      const lastName = String(profile.family_name || profile.name?.split(/\s+/).slice(1).join(' ') || 'User').trim();
      const user = {
        firstName,
        lastName,
        email,
        mobile: null,
        googleId,
        googlePicture: profile.picture || null,
        emailVerified: true,
        termsAccepted: true,
        termsAcceptedAt: new Date(),
        createdAt: new Date(),
      };

      const result = await users.insertOne(user);
      return response.status(201).json({
        message: 'Registration successful.',
        user: { id: result.insertedId, firstName, lastName, email },
      });
    }

    let user = await users.findOne({ googleId });
    if (!user) {
      user = await users.findOne({ email });
      if (!user) {
        return response.status(404).json({ error: 'No account was found for this Google email. Please register first.' });
      }
      if (user.googleId && user.googleId !== googleId) {
        return response.status(409).json({ error: 'This email is linked to a different Google account.' });
      }

      await users.updateOne(
        { _id: user._id, $or: [{ googleId: { $exists: false } }, { googleId: null }, { googleId }] },
        { $set: { googleId, googlePicture: profile.picture || null, emailVerified: true } },
      );
      user = await users.findOne({ googleId });
      if (!user) {
        return response.status(409).json({ error: 'Could not link this Google account. Please try again.' });
      }
    }

    return response.status(200).json({
      message: 'Login successful.',
      user: { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email },
    });
  } catch (error) {
    if (error?.code === 11000) {
      return response.status(409).json({ error: 'An account with this email already exists. Please sign in.' });
    }
    console.error('Google account handling failed:', error);
    return response.status(500).json({ error: 'Unable to complete Google sign-in right now. Please try again.' });
  }
});

app.post('/api/forgot-password', async (request, response) => {
  const email = typeof request.body?.email === 'string'
    ? request.body.email.trim().toLowerCase()
    : '';

  if (!emailRegex.test(email)) {
    return response.status(400).json({ error: 'Enter a valid email address.' });
  }

  try {
    const user = await users.findOne({ email });
    if (!user) {
      return response.status(404).json({ error: 'This email address is not registered.' });
    }

    const smtpSettings = getSmtpSettings();
    if (!smtpSettings) {
      return response.status(503).json({ error: 'Password reset email is not configured on the server.' });
    }

    const token = randomBytes(32).toString('base64url');
    const tokenHash = createHash('sha256').update(token).digest('hex');
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

    await users.updateOne(
      { _id: user._id },
      { $set: { resetTokenHash: tokenHash, resetTokenExpiresAt: expiresAt } },
    );

    const transporter = nodemailer.createTransport({
      host: smtpSettings.host,
      port: smtpSettings.port,
      secure: smtpSettings.secure,
      auth: { user: smtpSettings.user, pass: smtpSettings.pass },
      ...(smtpSettings.secure ? {} : { requireTLS: true }),
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 20000,
    });
    const frontendUrl = (process.env.FRONTEND_URL || 'http://localhost:5173').replace(/\/+$/, '');
    const resetUrl = `${frontendUrl}/#/reset-password?token=${encodeURIComponent(token)}`;

    try {
      await transporter.sendMail({
        from: smtpSettings.from,
        to: email,
        subject: 'Reset your password',
        text: `Use this link to reset your password. It expires in 30 minutes and can only be used once:\n\n${resetUrl}\n\nIf you did not request a password reset, you can ignore this email.`,
        html: `<p>Use the link below to reset your password. It expires in 30 minutes and can only be used once.</p><p><a href="${resetUrl}">Reset your password</a></p><p>If you did not request a password reset, you can ignore this email.</p>`,
      });
    } catch (error) {
      await users.updateOne(
        { _id: user._id, resetTokenHash: tokenHash },
        { $unset: { resetTokenHash: '', resetTokenExpiresAt: '' } },
      );
      console.error('Password reset email delivery failed:', error);
      return response.status(502).json({ error: 'Could not send the reset email. Check the SMTP settings and try again.' });
    } finally {
      transporter.close();
    }

    return response.status(200).json({ message: 'Password reset link sent. Check your email.' });
  } catch (error) {
    console.error('Password reset request failed:', error);
    return response.status(500).json({ error: 'Unable to process the reset request right now.' });
  }
});

app.post('/api/reset-password', async (request, response) => {
  const token = typeof request.body?.token === 'string' ? request.body.token : '';
  const password = typeof request.body?.password === 'string' ? request.body.password : '';
  const confirmPassword = typeof request.body?.confirmPassword === 'string'
    ? request.body.confirmPassword
    : '';

  if (!/^[A-Za-z0-9_-]{43}$/.test(token)) {
    return response.status(400).json({ error: 'This reset link is invalid or has expired.' });
  }
  if (!passwordMeetsPolicy(password)) {
    return response.status(400).json({
      error: 'Password must be at least 8 characters and include an uppercase letter, a number, and a special character.',
    });
  }
  if (password !== confirmPassword) {
    return response.status(400).json({ error: 'Passwords do not match.' });
  }

  try {
    const tokenHash = createHash('sha256').update(token).digest('hex');
    const passwordHash = await bcrypt.hash(password, 12);
    const result = await users.updateOne(
      { resetTokenHash: tokenHash, resetTokenExpiresAt: { $gt: new Date() } },
      {
        $set: { passwordHash, passwordUpdatedAt: new Date() },
        $unset: { resetTokenHash: '', resetTokenExpiresAt: '' },
      },
    );

    if (result.modifiedCount !== 1) {
      return response.status(400).json({ error: 'This reset link is invalid or has expired.' });
    }

    return response.status(200).json({ message: 'Password reset successful. You can now sign in.' });
  } catch (error) {
    console.error('Password reset failed:', error);
    return response.status(500).json({ error: 'Unable to reset the password right now.' });
  }
});

app.post('/api/register', async (request, response) => {
  const {
    firstName = '',
    lastName = '',
    email = '',
    mobile = '',
    password = '',
    confirmPassword = '',
    termsAccepted = false,
  } = request.body || {};

  const normalizedFirstName = String(firstName).trim();
  const normalizedLastName = String(lastName).trim();
  const normalizedEmail = String(email).trim().toLowerCase();
  const normalizedMobile = String(mobile).trim();

  if (!normalizedFirstName || !nameRegex.test(normalizedFirstName)) {
    return response.status(400).json({ error: 'Enter a valid first name using letters and spaces only.' });
  }
  if (!normalizedLastName || !nameRegex.test(normalizedLastName)) {
    return response.status(400).json({ error: 'Enter a valid last name using letters and spaces only.' });
  }
  if (!emailRegex.test(normalizedEmail)) {
    return response.status(400).json({ error: 'Enter a valid email address.' });
  }
  if (normalizedMobile && !mobileNumberRegex.test(normalizedMobile)) {
    return response.status(400).json({ error: 'Mobile number must contain digits and may start with +.' });
  }
  if (typeof password !== 'string' || password.length < 8 || !/[A-Z]/.test(password) || !/\d/.test(password) || !/[^A-Za-z0-9]/.test(password)) {
    return response.status(400).json({ error: 'Password does not meet the required policy.' });
  }
  if (password !== confirmPassword) {
    return response.status(400).json({ error: 'Passwords do not match.' });
  }
  if (termsAccepted !== true) {
    return response.status(400).json({ error: 'Accept the Terms & Conditions to register.' });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 12);
    const user = {
      firstName: normalizedFirstName,
      lastName: normalizedLastName,
      email: normalizedEmail,
      mobile: normalizedMobile || null,
      passwordHash,
      termsAccepted: true,
      termsAcceptedAt: new Date(),
      createdAt: new Date(),
    };
    const result = await users.insertOne(user);

    return response.status(201).json({
      message: 'Registration successful.',
      user: {
        id: result.insertedId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    if (error?.code === 11000) {
      return response.status(409).json({ error: 'An account with this email already exists.' });
    }
    console.error('Registration failed:', error);
    return response.status(500).json({ error: 'Unable to register right now. Please try again.' });
  }
});

app.listen(port, () => {
  console.log(`Registration API listening on http://localhost:${port}`);
});
