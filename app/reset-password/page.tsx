'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/api/supabase/createClient';
import { BigButton } from '@/components/Buttons';
import PasswordComplexity, {
  NewPasswordRequirement,
  Requirement,
} from '@/components/PasswordComplexity';
import TextInput from '@/components/TextInput';
import COLORS from '@/styles/colors';
import { Flex } from '@/styles/containers';
import { GreenH2, StyledForm } from '../(auth)/styles';

export default function ResetPassword() {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isPasswordComplexityMet, setIsPasswordComplexityMet] =
    useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [verifyNewPasswordError, setVerifyNewPasswordError] =
    useState<string>('');
  const router = useRouter();
  const passwordsMatch = password === confirmPassword;
  const canSubmitForm = password && passwordsMatch && isPasswordComplexityMet;

  const handleNewPassword = async () => {
    const { data: user } = await supabase.auth.getUser();
    if (!user) {
      setVerifyNewPasswordError('User not authenticated.');
      return;
    }

    const { data, error } = await supabase.rpc('verify_user_password', {
      password,
    });

    if (error) {
      console.error('Supabase RPC Error:', error.message);
      setVerifyNewPasswordError('Error verifying password.');
      return;
    }

    if (data) {
      setVerifyNewPasswordError('Password has been used before');
      setIsSubmitted(true);
      return;
    }

    try {
      // Update the user's password
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        console.error('Something went wrong. Please try again later.');
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
      console.error(
        err instanceof Error ? err.message : 'Unexpected error occurred.',
      );
    }
  };

  const handlePasswordChange = (password: string) => {
    setVerifyNewPasswordError('');
    setPassword(password);
  };

  const handleConfirmPasswordChange = (confirmPassword: string) => {
    setVerifyNewPasswordError('');
    setConfirmPassword(confirmPassword);
  };

  return (
    <StyledForm>
      <GreenH2>Set new password</GreenH2>
      <Flex $direction="column" $gap="1.5rem">
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
            error={isSubmitted && !!verifyNewPasswordError}
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
                error={isSubmitted && !!verifyNewPasswordError}
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
        {isSubmitted && confirmPassword && verifyNewPasswordError && (
          <NewPasswordRequirement
            met={!verifyNewPasswordError}
            text={verifyNewPasswordError}
          />
        )}
        {/* Sign up button */}
        <BigButton
          type="button"
          onClick={handleNewPassword}
          $primaryColor={COLORS.shrub}
          disabled={!canSubmitForm}
        >
          Reset Password
        </BigButton>
      </Flex>
    </StyledForm>
  );
}
