'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BigButton, StyledLinkButton } from '@/components/Buttons';
import Icon from '@/components/Icon';
import TextInput from '@/components/TextInput';
import CONFIG from '@/lib/configs';
import COLORS from '@/styles/colors';
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
  const [loginButtonText, setLoginButtonText] = useState('Log In');
  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

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
      setLoginButtonText('Loading...');
      setIsLoginButtonDisabled(true);
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
      router.push(`${CONFIG.viewPlants}`);
    } catch (err) {
      console.error('Login Error:', err);
      setInvalidEmailError('An unexpected error occurred. Please try again.');
      setLoginButtonText('Log In');
      setIsLoginButtonDisabled(false);
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
        <LoginLeftDivText style={{ zIndex: 10 }}>
          Let&apos;s grow together.
        </LoginLeftDivText>
        <div style={{ position: 'absolute', bottom: '15.5rem', left: '0rem' }}>
          <Icon type="bigShovel" />
        </div>
        <div style={{ position: 'absolute', bottom: '2rem', left: '0rem' }}>
          <Icon type="bigTomato" />
        </div>
        {/* hide carrot icon for now, positioning bugs */}
        <div
          style={{
            position: 'absolute',
            bottom: '0rem',
            left: '7.5rem',
            display: 'none',
          }}
        >
          <Icon type="bigCarrot" />
        </div>
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
              disabled={!canSubmitForm || isLoginButtonDisabled}
            >
              <BigButtonText $color="white">{loginButtonText}</BigButtonText>
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
