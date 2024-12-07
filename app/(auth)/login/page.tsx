'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TextInput from '@/components/TextInput';
import { StyledButton, TextErrorWrapper } from '@/components/TextInput/styles';
import COLORS from '@/styles/colors';
import { H2 } from '@/styles/text';
import { useAuth } from '../../../utils/AuthProvider';

export default function Login() {
  const { signIn } = useAuth(); // Use `signIn` function from AuthProvider
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [invalidEmailError, setInvalidEmailError] = useState('');
  const [invalidPasswordError, setInvalidPasswordError] = useState('');

  const isFormValid = email && password;

  const { push } = useRouter();
  const handleLogin = async () => {
    try {
      const { error } = await signIn(email, password);
      push('/');

      if (error) {
        // Match error messages from Supabase
        if (error.message.includes('Invalid login credentials')) {
          setInvalidEmailError('Invalid email address');
          setInvalidPasswordError('Invalid password');
        }
        return;
      }

      // Clear errors on success
      setInvalidEmailError('');
      setInvalidPasswordError('');
    } catch (err) {
      console.error('Login Error:', err);
      setInvalidEmailError('An unexpected error occurred. Please try again.');
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
        <TextErrorWrapper>
          <TextInput
            id="email-input"
            type="email"
            label="Email"
            onChange={setEmail}
            value={email}
            error={!!invalidEmailError}
          />
          {/* Email input*/}
          <p style={{ color: COLORS.error, marginTop: '0' }}>
            {invalidEmailError}
          </p>
        </TextErrorWrapper>
        <TextErrorWrapper>
          <TextInput
            id="password-input"
            label="Password"
            type="password"
            onChange={setPassword}
            value={password}
            isVisible={showPassword}
            toggleVisibility={() => setShowPassword(!showPassword)}
            error={!!invalidPasswordError}
          />
          <p style={{ color: COLORS.error, marginTop: '0' }}>
            {invalidPasswordError}
          </p>
          {/* Password input*/}
        </TextErrorWrapper>
        <StyledButton
          type="button"
          onClick={handleLogin}
          disabled={!isFormValid}
        >
          Log in
        </StyledButton>{' '}
        {/* Sign in button */}
      </div>
    </form>
  );
}
