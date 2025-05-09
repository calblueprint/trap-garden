'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BigButton, StyledLinkButton } from '@/components/Buttons';
import Icon from '@/components/Icon';
import PasswordComplexity, {
  Requirement,
} from '@/components/PasswordComplexity';
import TextInput from '@/components/TextInput';
import COLORS from '@/styles/colors';
import { P3 } from '@/styles/text';
import { useAuth } from '@/utils/AuthProvider';
import { isValidEmail } from '@/utils/helpers';
import {
  BigButtonText,
  LoginFormWrapper,
  LoginLeftDiv,
  LoginLeftDivText,
  LoginPageContainer,
  ResponsiveH2,
  ResponsiveP3,
  StyledForm,
} from '../styles';

export default function SignUp() {
  const { signUp } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isPasswordComplexityMet, setIsPasswordComplexityMet] =
    useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [signupError, setSignupError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const router = useRouter();
  const passwordsMatch = password === confirmPassword;
  const canSubmitForm =
    email && password && passwordsMatch && isPasswordComplexityMet;

  const handleEmailChange = async (newEmail: string) => {
    setEmail(newEmail);
    // Clear out the email errors when user starts typing again
    setSignupError('');

    // TODO: decide if we want to validate email as user is typing
    // if (isSubmitted) {
    //   setCheckValidEmailError(
    //     !isValidEmail(newEmail) ? 'Please enter a valid email address' : '',
    //   );
    // }
  };

  // Handles input to password
  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword);
  };

  // Handles input to confirm password
  const handleConfirmPasswordChange = (newConfirmPassword: string) => {
    setConfirmPassword(newConfirmPassword);
  };

  const handleSignUp = useCallback(async () => {
    setIsSubmitted(true);

    if (!isValidEmail(email)) {
      setSignupError('Please enter a valid email address');
      return;
    }

    try {
      const result = await signUp(email, password);
      if (result.error) {
        setSignupError(result.error.message);
      } else {
        // Handle successful sign-up (e.g., navigate to another page)
        setSignupError('');
        router.push('/onboarding');
      }
    } catch (error) {
      console.error('Sign up failed:', error);
      alert('There was an error during sign up. Please try again.');
    }
  }, [email, password, router, signUp]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      if (
        email.length > 0 &&
        password.length > 0 &&
        passwordsMatch &&
        isPasswordComplexityMet
      ) {
        if (key === 'Enter') {
          handleSignUp();
        }
      }
    };

    //add listener for keydown events
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [email, password, passwordsMatch, isPasswordComplexityMet, handleSignUp]);

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
        <StyledForm onSubmit={handleSignUp}>
          <ResponsiveH2 $color={COLORS.shrub} style={{ marginBottom: '12px' }}>
            Sign Up
          </ResponsiveH2>

          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
          >
            <ResponsiveP3 as="span" $color={COLORS.midgray}>
              Already have an account?
              <StyledLinkButton href="/login" style={{ padding: '4px' }}>
                Log in
              </StyledLinkButton>
            </ResponsiveP3>
            <div>
              {/* Email input*/}
              <TextInput
                id="email-input"
                label="Email"
                type="email"
                onChange={handleEmailChange}
                value={email}
                error={!!signupError}
              />
              {signupError && isSubmitted && (
                <P3 $color={COLORS.errorRed}>{signupError}</P3>
              )}
            </div>
            <div>
              {/* Password input*/}
              <TextInput
                id="password-input"
                type="password"
                value={password || ''}
                onChange={handlePasswordChange}
                isVisible={showPassword}
                toggleVisibility={() => setShowPassword(!showPassword)}
                label="Password"
                error={isSubmitted && !isPasswordComplexityMet}
              />
              {/* Password complexity requirements */}
              <PasswordComplexity
                password={password} // Set default value if password is null
                setPasswordComplexityMet={setIsPasswordComplexityMet}
              />
            </div>
            <div>
              {/* Confirm password input with toggle visibility */}
              {password && (
                <>
                  <TextInput
                    id="confirm-password-input"
                    type="password"
                    value={confirmPassword || ''}
                    onChange={handleConfirmPasswordChange}
                    isVisible={showConfirmPassword}
                    toggleVisibility={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    label="Confirm Password"
                    error={isSubmitted && !passwordsMatch}
                  />
                  {confirmPassword && (
                    <Requirement
                      met={passwordsMatch}
                      text={`Passwords ${passwordsMatch ? '' : 'do not'} match`}
                    />
                  )}
                </>
              )}
            </div>
            {/* Sign up button */}
            <BigButton
              type="button"
              onClick={handleSignUp}
              $primaryColor={COLORS.shrub}
              disabled={!canSubmitForm}
            >
              <BigButtonText $color="white">Sign Up</BigButtonText>
            </BigButton>
          </div>
        </StyledForm>
      </LoginFormWrapper>
    </LoginPageContainer>
  );
}
