'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BigButton, StyledLinkButton } from '@/components/Buttons';
import Icon from '@/components/Icon';
import PasswordComplexity from '@/components/PasswordComplexity';
import TextInput from '@/components/TextInput';
import { StyledForm } from '@/components/TextInput/styles';
import COLORS from '@/styles/colors';
import { H2, P3 } from '@/styles/text';
import { useAuth } from '@/utils/AuthProvider';

export default function SignUp() {
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [samePasswordCheck, setSamePasswordCheck] = useState('');
  const [isPasswordComplexityMet, setIsPasswordComplexityMet] =
    useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [checkEmailExistsError, setCheckEmailExistsError] = useState('');
  const [checkValidEmailError, setCheckValidEmailError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);

  const isFormValid = email && password && confirmPassword;
  const router = useRouter();

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = async (newEmail: string) => {
    setEmail(newEmail);
    setCheckEmailExistsError('');

    // Validate email format
    if (!isValidEmail(newEmail)) {
      setIsEmailValid(false);
      setCheckValidEmailError('Please enter a valid email address');
    } else {
      setIsEmailValid(true);
      setCheckValidEmailError('');
    }
    // Check if the email already exists
  };

  // Handles input to password
  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword);

    validateIsPasswordComplexityMet(newPassword);
    if (!newPassword || !confirmPassword) {
      setSamePasswordCheck('');
      return;
    }

    // Set mismatch error if passwords do not match
    if (newPassword !== confirmPassword) {
      setSamePasswordCheck('');
    } else {
      setSamePasswordCheck('✓ Passwords match');
    }
  };

  // Handles input to confirm password
  const handleConfirmPasswordChange = (newConfirmPassword: string) => {
    setConfirmPassword(newConfirmPassword);

    // Clear mismatch error if either field is empty
    if (!password || !newConfirmPassword) {
      setSamePasswordCheck('');
      return;
    }

    // Set mismatch error if passwords do not match
    if (password !== newConfirmPassword) {
      setSamePasswordCheck('');
    } else {
      setSamePasswordCheck('✓ Passwords match');
    }
  };

  // Set password complexity error if requirements are not met
  const validateIsPasswordComplexityMet = (password: string | null) => {
    const hasLowerCase = /[a-z]/.test(password || '');
    const hasNumber = /\d/.test(password || '');
    const longEnough = (password || '').length >= 8;

    setIsPasswordComplexityMet(
      !!password && hasLowerCase && hasNumber && longEnough,
    );
  };

  const handleSignUp = async () => {
    setIsSubmitted(true);

    if (!isValidEmail(email)) {
      setCheckValidEmailError('Please enter a valid email address');
    } else {
      setCheckValidEmailError(''); // Clear email format error if valid
    }

    try {
      const result = await signUp(email, password);
      if (result.error) {
        // Handle the specific error (e.g., duplicate email)
        if (result.error.message === 'Account already exists for this email') {
          setCheckEmailExistsError(result.error.message);
        }
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
            error={!!checkEmailExistsError || (!isEmailValid && isSubmitted)}
          />
          {/* Email input*/}
          {checkEmailExistsError && isSubmitted && (
            <P3 style={{ color: COLORS.errorRed }}>{checkEmailExistsError}</P3>
          )}
          {!isEmailValid && isSubmitted && (
            <P3 style={{ color: COLORS.errorRed }}>{checkValidEmailError}</P3>
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
              error={isSubmitted && !samePasswordCheck}
            />
          )}
          {/* Confirm password input with toggle visibility */}

          {samePasswordCheck && (
            <P3 style={{ color: '#0D8817' }}>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Icon type="check" />
                {'Passwords match'}
              </div>
            </P3>
          )}

          {isSubmitted && !samePasswordCheck && !!password && (
            <P3 style={{ color: COLORS.errorRed }}>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Icon type="x" />
                {'Passwords do not match'}
              </div>
            </P3>
          )}
          {/* Conditional password validation error message */}
        </div>
        <BigButton type="button" onClick={handleSignUp} disabled={!isFormValid}>
          <P3 style={{ color: '#FFF' }}>Sign Up</P3>
        </BigButton>{' '}
        {/* Sign up button */}
      </div>
    </StyledForm>
  );
}
