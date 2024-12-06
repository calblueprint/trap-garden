'use client';

import { useState } from 'react';
import PasswordComplexity from '@/components/PasswordComplexity';
import TextInput from '@/components/TextInput';
import {
  StyledButton,
  StyledPasswordComplexity,
} from '@/components/TextInput/styles';
import COLORS from '@/styles/colors';
import { H2 } from '@/styles/text';
import { useAuth } from '@/utils/AuthProvider';

export default function SignUp() {
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [samePasswordCheck, setSamePasswordCheck] = useState('');
  const [passwordComplexityError] = useState<string | null>(null);
  const [isPasswordComplexityMet, setIsPasswordComplexityMet] =
    useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [blankEmailError, setBlankEmailError] = useState('');
  const [blankPasswordError, setBlankPasswordError] = useState('');
  const [blankConfirmPasswordError, setBlankConfirmPasswordError] =
    useState('');

  const isFormValid =
    email && password && confirmPassword && password === confirmPassword;
  // Handles input to password
  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword);
    validatePasswords(newPassword, confirmPassword);
    validateIsPasswordComplexityMet(newPassword);
  };

  // Handles input to confirm password
  const handleConfirmPasswordChange = (newConfirmPassword: string) => {
    setConfirmPassword(newConfirmPassword);
    validatePasswords(password, newConfirmPassword);
  };

  // Checks if passwords match and sets error
  const validatePasswords = (
    password: string | null,
    confirmPassword: string | null,
  ) => {
    if (!password || !confirmPassword) {
      setSamePasswordCheck(''); // Clear message if either field is empty
    } else if (password !== confirmPassword) {
      setSamePasswordCheck('✗ Passwords do not match');
    } else {
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
    } else if (password) {
      setIsPasswordComplexityMet(false);
    } else {
      setIsPasswordComplexityMet(false);
    }
  };

  const handleSignUp = async () => {
    let isValid = true;

    // Validate email
    if (!email) {
      setBlankEmailError('Please enter a valid email address');
      isValid = false;
    } else {
      setBlankEmailError('');
    }

    // Validate password
    if (!password) {
      setBlankPasswordError('Please enter a password');
      setBlankConfirmPasswordError(''); // Clear confirm password error
      isValid = false;
    } else {
      setBlankPasswordError('');
    }

    // Validate confirm password
    if (!confirmPassword && password) {
      setBlankConfirmPasswordError('Please confirm password');
      isValid = false;
    } else if (password !== confirmPassword) {
      setSamePasswordCheck('✗ Passwords do not match');
      isValid = false;
    } else {
      setSamePasswordCheck('');
      setBlankConfirmPasswordError('');
    }

    if (!isValid) return;

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
        <TextInput
          id="email-input"
          label="Email"
          type="email"
          onChange={setEmail}
          value={email}
          error={!!blankEmailError}
        />
        {/* Email input*/}
        {blankEmailError && (
          <p style={{ color: COLORS.error, fontSize: '0.875rem' }}>
            {blankEmailError}
          </p>
        )}
        <TextInput
          id="password-input"
          type="password"
          value={password || ''}
          onChange={handlePasswordChange}
          isVisible={showPassword}
          toggleVisibility={() => setShowPassword(!showPassword)}
          label="Password"
          error={!!blankPasswordError}
        />
        {/* Password input*/}
        {blankPasswordError && (
          <p style={{ color: COLORS.error, fontSize: '0.875rem' }}>
            {blankPasswordError}
          </p>
        )}
        <StyledPasswordComplexity>
          <PasswordComplexity
            password={password} // Set default value if password is null
          />
        </StyledPasswordComplexity>
        {/* Password complexity requirements */}
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
            error={!!blankConfirmPasswordError}
          />
        )}
        {/* Confirm password input with toggle visibility */}
        {blankConfirmPasswordError && (
          <p style={{ color: COLORS.error, fontSize: '0.875rem' }}>
            {blankConfirmPasswordError}
          </p>
        )}
        {samePasswordCheck && (
          <p style={{ color: COLORS.error, fontSize: '0.875rem' }}>
            {samePasswordCheck}
          </p>
        )}
        <StyledPasswordComplexity>
          {confirmPassword && samePasswordCheck && (
            <p style={{ color: '#0D8817' }}>{samePasswordCheck}</p>
          )}
          {/* Conditional password validation error message */}
        </StyledPasswordComplexity>
        <StyledButton type="button" onClick={handleSignUp}>
          Sign up
        </StyledButton>{' '}
        {/* Sign up button */}
      </div>
    </form>
  );
}
