'use client';

import { useState } from 'react';
import supabase from '@/api/supabase/createClient';
import PasswordComplexity from '@/components/PasswordComplexity';
import TextInput from '@/components/TextInput';
import { StyledButton, TextErrorWrapper } from '@/components/TextInput/styles';
import COLORS from '@/styles/colors';
import { H2 } from '@/styles/text';
import { useAuth } from '@/utils/AuthProvider';

export default function SignUp() {
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [samePasswordCheck, setSamePasswordCheck] = useState('');
  const [mismatchError, setMismatchError] = useState('');
  const [isPasswordComplexityMet, setIsPasswordComplexityMet] =
    useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [checkEmailExistsError, setCheckEmailExistsError] = useState('');
  const [checkValidEmailError, setCheckValidEmailError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);

  const isFormValid = email && password && confirmPassword;

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = async (newEmail: string) => {
    setEmail(newEmail);

    // Validate email format
    if (!isValidEmail(newEmail)) {
      setIsEmailValid(false);
      setCheckValidEmailError('Please enter a valid email address');
    } else {
      setIsEmailValid(true);
      setCheckValidEmailError('');
    }
    // Check if the email already exists
    try {
      const { data, error } = await supabase
        .from('auth.users')
        .select('email')
        .eq('email', newEmail.toLowerCase())
        .single();

      console.log('Data:', data);
      console.log('Error:', error);

      if (data) {
        // If data exists, show the error
        setCheckEmailExistsError('Account already exists for this email');
      } else {
        // If no data, clear the error
        setCheckEmailExistsError('');
      }
    } catch (queryError) {
      console.error('Error checking email:', queryError);
      // Optionally handle unexpected errors
      setCheckEmailExistsError('Error checking email. Please try again.');
    }
  };

  // Handles input to password
  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword);

    if (!newPassword || !confirmPassword) {
      setMismatchError('');
      setSamePasswordCheck('');
      return;
    }

    // Set mismatch error if passwords do not match
    if (newPassword !== confirmPassword) {
      setMismatchError('✗ Passwords do not match');
      setSamePasswordCheck('');
    } else {
      setMismatchError('');
      setSamePasswordCheck('✓ Passwords match');
    }

    validateIsPasswordComplexityMet(newPassword);
  };

  // Handles input to confirm password
  const handleConfirmPasswordChange = (newConfirmPassword: string) => {
    setConfirmPassword(newConfirmPassword);

    // Clear mismatch error if either field is empty
    if (!password || !newConfirmPassword) {
      setMismatchError('');
      setSamePasswordCheck('');
      return;
    }

    // Set mismatch error if passwords do not match
    if (password !== newConfirmPassword) {
      setMismatchError('✗ Passwords do not match');
      setSamePasswordCheck('');
    } else {
      setMismatchError('');
      setSamePasswordCheck('✓ Passwords match');
    }
  };

  // Set password complexity error if requirements are not met
  const validateIsPasswordComplexityMet = (password: string | null) => {
    const hasLowerCase = /[a-z]/.test(password || '');
    const hasNumber = /\d/.test(password || '');
    const longEnough = (password || '').length >= 8;

    if (password && hasLowerCase && hasNumber && longEnough) {
      setIsPasswordComplexityMet(true);
    } else {
      setIsPasswordComplexityMet(false);
    }
  };

  const handleSignUp = async () => {
    setIsSubmitted(true);

    if (!isValidEmail(email)) {
      setCheckValidEmailError('Please enter a valid email address');
    } else {
      setCheckValidEmailError(''); // Clear email format error if valid
    }

    try {
      await signUp(email, password);
    } catch (error) {
      console.error('Sign up failed:', error);
      alert('There was an error during sign up. Please try again.');
    }
  };

  return (
    <form
      onSubmit={handleSignUp}
      style={{
        backgroundColor: COLORS.whitegray,
        padding: '1.5rem',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <H2 style={{ color: COLORS.shrub }}>Sign Up</H2>
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
          {checkEmailExistsError && (
            <p style={{ color: COLORS.error, marginTop: '0' }}>
              {checkEmailExistsError}
            </p>
          )}
          {!isEmailValid && isSubmitted && (
            <p style={{ color: COLORS.error, marginTop: '0' }}>
              {checkValidEmailError}
            </p>
          )}
        </div>
        <TextErrorWrapper>
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
        </TextErrorWrapper>
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
            <p style={{ color: '#0D8817', marginTop: '0' }}>
              {samePasswordCheck}
            </p>
          )}

          {isSubmitted && !samePasswordCheck && (
            <p style={{ color: COLORS.error, marginTop: '0' }}>
              {mismatchError}
            </p>
          )}
          {/* Conditional password validation error message */}
        </div>
        <StyledButton
          type="button"
          onClick={handleSignUp}
          disabled={!isFormValid}
        >
          Sign up
        </StyledButton>{' '}
        {/* Sign up button */}
      </div>
    </form>
  );
}
