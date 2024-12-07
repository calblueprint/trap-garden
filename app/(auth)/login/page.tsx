'use client';

import { useState } from 'react';
// import { useRouter } from 'next/navigation';
import TextInput from '@/components/TextInput';
import { StyledButton, StyledForm } from '@/components/TextInput/styles';
import COLORS from '@/styles/colors';
import { H2, P3 } from '@/styles/text';
import { useAuth } from '../../../utils/AuthProvider';

export default function Login() {
  const { signIn } = useAuth(); // Use `signIn` function from AuthProvider
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [invalidEmailError, setInvalidEmailError] = useState('');
  const [invalidPasswordError, setInvalidPasswordError] = useState('');

  const isFormValid = email && password;

  // const { push } = useRouter();
  const handleLogin = async () => {
    try {
      const { error } = await signIn(email, password);
      // push('/');

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
    <StyledForm onSubmit={handleLogin}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <H2 style={{ color: COLORS.shrub }}>Log In</H2>
        <div>
          <TextInput
            id="email-input"
            type="email"
            label="Email"
            onChange={setEmail}
            value={email}
            error={!!invalidEmailError}
          />
          {/* Email input*/}
          <P3 $color={COLORS.errorRed}>{invalidEmailError}</P3>
        </div>
        <div>
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
          <P3 $color={COLORS.errorRed}>{invalidPasswordError}</P3>
          {/* Password input*/}
        </div>
        <StyledButton
          type="button"
          onClick={handleLogin}
          disabled={!isFormValid}
        >
          Log in
        </StyledButton>{' '}
        {/* Sign in button */}
      </div>
    </StyledForm>
  );
}
