'use client';

import { useState } from 'react';
import PasswordComplexity from '@/app/utils/PasswordComplexity';
import TextInput from '@/components/TextInput';
import { useAuth } from '../../utils/AuthProvider';

export default function SignUp() {
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState<string | null>(null);
  const [confirmPassword, setConfirmPassword] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState('');
  const [passwordComplexityError, setPasswordComplexityError] = useState<
    string | null
  >(null);
  const [passwordComplexity, setPasswordComplexity] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Handles input to password
  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword);
    validatePasswords(newPassword, confirmPassword);
    validatePasswordComplexity(newPassword);
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
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match.');
    } else {
      setPasswordError(''); // Clear error when passwords match
    }
  };

  // Set password complexity error if requirements are not met
  const validatePasswordComplexity = (password: string | null) => {
    const hasLowerCase = /[a-z]/.test(password || '');
    const hasNumber = /\d/.test(password || '');
    const longEnough = (password || '').length >= 8;

    if (password && hasLowerCase && hasNumber && longEnough) {
      setPasswordComplexity(true);
      setPasswordComplexityError(null); // Clear error if all conditions are met
    } else if (password) {
      setPasswordComplexity(false);
      setPasswordComplexityError('Password must meet complexity requirements');
    } else {
      setPasswordComplexity(false);
      setPasswordComplexityError(null); // Clear error if password is empty
    }
  };

  const handleSignUp = async () => {
    if (password) {
      await signUp(email, password);
    } 
  };

  return (
    <div
      style={{
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <header>
        <h1 style={{ color: '#1F5A2A' }}>Sign Up</h1>
      </header>
      <TextInput
        id="email-input"
        label="Email"
        type="email"
        onChange={setEmail}
        value={email}
        placeholder="Email"
      />
      {/* Email input*/}
      <TextInput
        id="password-input"
        type="password"
        value={password || ''}
        onChange={handlePasswordChange}
        placeholder="Password"
        isVisible={showPassword}
        toggleVisibility={() => setShowPassword(!showPassword)}
        label="Password"
      />
      {/* Password input with toggle visibility */}
      <TextInput
        id="confirm-password-input"
        type="password"
        value={confirmPassword || ''}
        onChange={handleConfirmPasswordChange}
        placeholder="Confirm Password"
        isVisible={showConfirmPassword}
        toggleVisibility={() => setShowConfirmPassword(!showConfirmPassword)}
        label="Confirm Password"
      />
      {/* Confirm password input with toggle visibility */}
      <button
        type="button"
        onClick={handleSignUp}
        disabled={!email || !!passwordError || !!passwordComplexityError}
      >
        Sign up
      </button>{' '}
      {/* Sign up button */}
      {confirmPassword && passwordError && (
        <p style={{ color: 'red' }}>{passwordError}</p>
      )}
      {/* Conditional password validation error message */}
      <PasswordComplexity
        password={password || ''} // Set default value if password is null
      />
      {/* Password complexity requirements */}
      {password && !passwordComplexity && passwordComplexityError && (
        <p style={{ color: 'red' }}>{passwordComplexityError}</p>
      )}
      {/* Password complexity error message */}
    </div>
  );
}
