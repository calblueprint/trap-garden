'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BigButton, StyledLinkButton } from '@/components/Buttons';
import TextInput from '@/components/TextInput';
import COLORS from '@/styles/colors';
import { Flex } from '@/styles/containers';
import { H2, P3 } from '@/styles/text';
import { useAuth } from '../../../utils/AuthProvider';
import {
  LoginFormImage,
  LoginFormWrapper,
  LoginImage,
  LoginPageContainer,
  ResetLinkButton,
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
      <LoginImage src="/images/login.png" alt="trap garden logo" />
      <LoginFormWrapper>
        <StyledForm onSubmit={handleLogin}>
          <Flex $align="center" $justify="center">
            <LoginFormImage
              src="/images/growtogether.png"
              alt="trap garden logo"
            />
          </Flex>
          <H2 $color={COLORS.shrub} style={{ marginBottom: '8px' }}>
            Log In
          </H2>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
            }}
          >
            <P3 as="span" $color={COLORS.midgray}>
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
            <BigButton
              type="button"
              onClick={handleLogin}
              $primaryColor={COLORS.shrub}
              disabled={!canSubmitForm}
            >
              Log In
            </BigButton>
            {/* Sign in button */}
            <P3
              as="span"
              $color={COLORS.midgray}
              style={{ textAlign: 'center' }}
            >
              Forgot Password?
              <ResetLinkButton href="/forgot-password">
                Reset Here
              </ResetLinkButton>
            </P3>
          </div>
        </StyledForm>
      </LoginFormWrapper>
    </LoginPageContainer>
  );
}
