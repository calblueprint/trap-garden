'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BigButton, StyledLinkButton } from '@/components/Buttons';
import TextInput from '@/components/TextInput';
import COLORS from '@/styles/colors';
import { Flex } from '@/styles/containers';
import { P3 } from '@/styles/text';
import { useAuth } from '../../../utils/AuthProvider';
import {
  BigButtonText,
  LoginFormWrapper,
  LoginLeftDiv,
  LoginLeftDivText,
  LoginPageContainer,
  ResetLinkButton,
  ResponsiveH2,
  ResponsiveP3,
  ResponsiveP3Lexend,
  StyledForm,
} from '../styles';

export default function Login() {
  const { signIn } = useAuth(); // Use `signIn` function from AuthProvider
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [invalidEmailError, setInvalidEmailError] = useState('');
  const [invalidPasswordError, setInvalidPasswordError] = useState('');

  const canSubmitForm = email && password;

  const router = useRouter();

  const handleEmailChange = async (newEmail: string) => {
    setEmail(newEmail);
    setInvalidEmailError('');
    setInvalidPasswordError('');
  };

  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword);
  };

  const handleLogin = useCallback(async () => {
    try {
      const { error } = await signIn(email, password);

      if (error) {
        setInvalidEmailError(error.message);
        // TODO: use error.code rather than error.messsage
        // if (error.message.includes('Invalid login credentials')) {
        //   setInvalidEmailError('Invalid email address');
        //   setInvalidPasswordError('Invalid password');
        // }
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
  }, [email, password, router, signIn]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      if (email.length > 0 && password.length > 0) {
        if (key === 'Enter') {
          handleLogin();
        }
      }
    };

    //add listener for keydown events
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [email, password, handleLogin]);

  return (
    <LoginPageContainer>
      <LoginLeftDiv>
        <LoginLeftDivText>Let's grow together.</LoginLeftDivText>
      </LoginLeftDiv>
      <LoginFormWrapper>
        <StyledForm onSubmit={handleLogin}>
          <ResponsiveH2 $color={COLORS.shrub} style={{ marginBottom: '12px' }}>
            Log In
          </ResponsiveH2>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
            }}
          >
            <ResponsiveP3 as="span" $color={COLORS.midgray}>
              Don’t have an account?
              <StyledLinkButton href="/signup" style={{ padding: '4px' }}>
                Sign up
              </StyledLinkButton>
            </ResponsiveP3>
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
            <BigButton
              type="button"
              onClick={handleLogin}
              $primaryColor={COLORS.shrub}
              disabled={!canSubmitForm}
            >
              <BigButtonText $color="white">Log In</BigButtonText>
            </BigButton>
            {/* Sign in button */}
            <ResponsiveP3Lexend
              as="span"
              $color={COLORS.midgray}
              style={{ textAlign: 'center' }}
            >
              Forgot Password?
              <ResetLinkButton href="/forgot-password">
                Reset Here
              </ResetLinkButton>
            </ResponsiveP3Lexend>
          </div>
        </StyledForm>
      </LoginFormWrapper>
    </LoginPageContainer>
  );
}
