'use client';

import { useState } from 'react';
import TextInput from '@/components/TextInput';
import { StyledButton } from '@/components/TextInput/styles';
import COLORS from '@/styles/colors';
import { H2 } from '@/styles/text';
import { useAuth } from '../../../utils/AuthProvider';

export default function Login() {
  const { signIn } = useAuth(); // Use `signIn` function from AuthProvider
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [blankEmailError, setBlankEmailError] = useState('');
  const [blankPasswordError, setBlankPasswordError] = useState('');

  const handleLogin = async () => {
    // Define handleLogin
    if (!email && !password) {
      setBlankEmailError('Please enter a valid email address');
      setBlankPasswordError('Please enter a password');
      return;
    }

    if (!email) {
      setBlankEmailError('Please enter a valid email address');
    } else {
      setBlankEmailError('');
    }

    if (!password) {
      setBlankPasswordError('Please enter a password');
    } else {
      setBlankPasswordError('');
    }

    try {
      await signIn(email, password);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Login Error:', error.message);
      }
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      style={{
        backgroundColor: COLORS.whitegray,
        minHeight: '100vh',
        padding: '1.25rem',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <H2 style={{ color: COLORS.shrub }}>Log In</H2>
        <TextInput
          id="email-input"
          type="email"
          label="Email"
          onChange={setEmail}
          value={email}
          error={!!blankEmailError}
        />
        {/* Email input*/}
        {blankEmailError && (
          <p style={{ color: COLORS.error, fontSize: '0.875rem' }}>
            {blankEmailError}
          </p>
        )}
        <TextInput
          id="password-input"
          label="Password"
          type="password"
          onChange={setPassword}
          value={password}
          isVisible={showPassword}
          toggleVisibility={() => setShowPassword(!showPassword)}
          error={!!blankPasswordError}
        />
        {/* Password input*/}
        {blankPasswordError && (
          <p style={{ color: COLORS.error, fontSize: '0.875rem' }}>
            {blankPasswordError}
          </p>
        )}
        <StyledButton type="button" onClick={handleLogin}>
          Log in
        </StyledButton>{' '}
        {/* Sign in button */}
      </div>
    </form>
  );
}
