'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BigButton, StyledLinkButton } from '@/components/Buttons';
import TextInput from '@/components/TextInput';
import { StyledForm } from '@/components/TextInput/styles';
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

  const router = useRouter();

  const handleEmailChange = async (newEmail: string) => {
    setEmail(newEmail);
    setInvalidEmailError('');
    setInvalidPasswordError('');
  };

  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword);
  };

  const handleLogin = async () => {
    try {
      const { error } = await signIn(email, password);

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
      router.push('/view-plants');
    } catch (err) {
      console.error('Login Error:', err);
      setInvalidEmailError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <StyledForm onSubmit={handleLogin}>
      <H2 $color={COLORS.shrub} style={{ marginBottom: '8px' }}>
        Log In
      </H2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <P3 $color={COLORS.midgray}>
          Don’t have an account?
          <StyledLinkButton href="/signup" style={{ padding: '4px' }}>
            Sign up
          </StyledLinkButton>
        </P3>
        <div>
          <TextInput
            id="email-input"
            type="email"
            label="Email"
            onChange={handleEmailChange}
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
            onChange={handlePasswordChange}
            value={password}
            isVisible={showPassword}
            toggleVisibility={() => setShowPassword(!showPassword)}
            error={!!invalidPasswordError}
          />
          <P3 $color={COLORS.errorRed}>{invalidPasswordError}</P3>
          {/* Password input*/}
        </div>
        <BigButton type="button" onClick={handleLogin} disabled={!isFormValid}>
          Log In
        </BigButton>{' '}
        {/* Sign in button */}
      </div>
    </StyledForm>
  );
}
