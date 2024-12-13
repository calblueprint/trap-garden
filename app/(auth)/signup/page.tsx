'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BigButton, StyledLinkButton } from '@/components/Buttons';
import Icon from '@/components/Icon';
import PasswordComplexity from '@/components/PasswordComplexity';
import TextInput from '@/components/TextInput';
import COLORS from '@/styles/colors';
import { H2, P3 } from '@/styles/text';
import { useAuth } from '@/utils/AuthProvider';
import { StyledForm } from '../styles';

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
  const [checkEmailExistsError, setCheckEmailExistsError] = useState('');
  const [checkValidEmailError, setCheckValidEmailError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const router = useRouter();
  const passwordsMatch = password === confirmPassword;
  const canSubmitForm = email && password && confirmPassword && passwordsMatch;

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = async (newEmail: string) => {
    setEmail(newEmail);
    // Clear out the email errors when user starts typing again
    setCheckEmailExistsError('');
    setCheckValidEmailError('');

    // If not first try, validate email format as user types
    if (isSubmitted) {
      setCheckValidEmailError(
        !isValidEmail(newEmail) ? 'Please enter a valid email address' : '',
      );
    }
  };

  // Handles input to password
  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword);
  };

  // Handles input to confirm password
  const handleConfirmPasswordChange = (newConfirmPassword: string) => {
    setConfirmPassword(newConfirmPassword);
  };

  const handleSignUp = async () => {
    setIsSubmitted(true);

    if (!isValidEmail(email)) {
      setCheckValidEmailError('Please enter a valid email address');
      return;
    } else {
      setCheckValidEmailError(''); // Clear email format error if valid
    }

    try {
      const result = await signUp(email, password);
      if (result.error) {
        // Handle the specific error (e.g., duplicate email)
        setCheckEmailExistsError(result.error.message);
      } else {
        // Handle successful sign-up (e.g., navigate to another page)
        setCheckEmailExistsError('');
        router.push('/onboarding');
      }
    } catch (error) {
      console.error('Sign up failed:', error);
      alert('There was an error during sign up. Please try again.');
    }
  };

  return (
    <StyledForm onSubmit={handleSignUp}>
      <H2 $color={COLORS.shrub} style={{ marginBottom: '8px' }}>
        Sign Up
      </H2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <P3 as="span" $color={COLORS.midgray}>
          Already have an account?
          <StyledLinkButton href="/login" style={{ padding: '4px' }}>
            Log in
          </StyledLinkButton>
        </P3>
        <div>
          <TextInput
            id="email-input"
            label="Email"
            type="email"
            onChange={handleEmailChange}
            value={email}
            error={!!checkEmailExistsError}
          />
          {/* Email input*/}
          {checkEmailExistsError && isSubmitted && (
            <P3 $color={COLORS.errorRed}>{checkEmailExistsError}</P3>
          )}
          {checkValidEmailError && isSubmitted && (
            <P3 $color={COLORS.errorRed}>{checkValidEmailError}</P3>
          )}
        </div>
        <div>
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
          {/* Password input*/}

          <PasswordComplexity
            password={password} // Set default value if password is null
            setPasswordComplexityMet={setIsPasswordComplexityMet}
          />

          {/* Password complexity requirements */}
        </div>
        <div>
          {password && (
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
          )}
          {/* Confirm password input with toggle visibility */}

          {password && passwordsMatch && (
            <P3 as="span" $color="#0D8817">
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Icon type="check" />
                Passwords match
              </div>
            </P3>
          )}

          {isSubmitted && !passwordsMatch && !!password && (
            <P3 as="span" $color={COLORS.errorRed}>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Icon type="x" />
                Passwords do not match
              </div>
            </P3>
          )}
          {/* Conditional password validation error message */}
        </div>
        <BigButton
          type="button"
          onClick={handleSignUp}
          disabled={!canSubmitForm}
        >
          <P3 $color="white">Sign Up</P3>
        </BigButton>{' '}
        {/* Sign up button */}
      </div>
    </StyledForm>
  );
}
