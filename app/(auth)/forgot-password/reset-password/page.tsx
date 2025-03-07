'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/api/supabase/createClient';
import { BigButton } from '@/components/Buttons';
import Icon from '@/components/Icon';
import PasswordComplexity, {
  Requirement,
} from '@/components/PasswordComplexity';
import TextInput from '@/components/TextInput';
import COLORS from '@/styles/colors';
import {
  BackButton,
  ColumnFlexContainer,
  GreenH2,
  StyledForm,
} from '../../styles';

export default function ResetPassword() {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isPasswordComplexityMet, setIsPasswordComplexityMet] =
    useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const router = useRouter();
  const passwordsMatch = password === confirmPassword;
  const canSubmitForm = password && passwordsMatch && isPasswordComplexityMet;

  const handleNewPassword = async () => {
    setIsSubmitted(true);

    try {
      // Update the user's password
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        window.alert('Something went wrong. Please try again later.');
        return;
      }

      // Sign out the user after resetting password
      const { error: signOutError } = await supabase.auth.signOut();

      if (signOutError) {
        throw new Error(
          `An error occurred trying to sign out: ${signOutError.message}`,
        );
      }

      // Redirect to confirm reset page
      router.push('/login');
    } catch (err) {
      window.alert(
        err instanceof Error ? err.message : 'Unexpected error occurred.',
      );
    }
  };

  const handlePasswordChange = (password: string) => {
    setPassword(password);
  };

  const handleConfirmPasswordChange = (confirmPassword: string) => {
    setConfirmPassword(confirmPassword);
  };

  return (
    <StyledForm>
      <BackButton
        type="button"
        onClick={e => {
          e.preventDefault(); // prevents accidental form submission
          router.push('/login'); //ASK WHERE THIS SHOULD ROUTE
        }}
      >
        <Icon type={'backArrow'} />
      </BackButton>

      <GreenH2>Set new password</GreenH2>
      <ColumnFlexContainer>
        <div>
          {/* Password input*/}
          <TextInput
            id="new-password-input"
            type="password"
            value={password || ''}
            onChange={handlePasswordChange}
            isVisible={showPassword}
            toggleVisibility={() => setShowPassword(!showPassword)}
            label="New Password"
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
                id="confirm-new-password-input"
                type="password"
                value={confirmPassword || ''}
                onChange={handleConfirmPasswordChange}
                isVisible={showConfirmPassword}
                toggleVisibility={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                label="Confirm New Password"
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
          onClick={handleNewPassword}
          $primaryColor={COLORS.shrub}
          disabled={!canSubmitForm}
        >
          Reset Password
        </BigButton>
      </ColumnFlexContainer>
    </StyledForm>
  );
}
