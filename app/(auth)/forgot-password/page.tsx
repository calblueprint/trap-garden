'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/api/supabase/createClient';
import { BigButton } from '@/components/Buttons';
import Icon from '@/components/Icon';
import TextInput from '@/components/TextInput';
import COLORS from '@/styles/colors';
import { Flex } from '@/styles/containers';
import { isValidEmail } from '@/utils/helpers';
import { BackButton, GrayP3, GreenH2, RedP3, StyledForm } from '../styles';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [invalidEmailError, setInvalidEmailError] = useState<string>('');
  const canSubmitForm = email && !invalidEmailError;

  const router = useRouter();

  const handleEmailChange = async (newEmail: string) => {
    setEmail(newEmail);
  };

  const handleForgotPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://trap-garden.vercel.app/reset-password',
      // this page doesn't actually exist right now, but will be added in the future
    });

    if (error) {
      setInvalidEmailError('Something went wrong. Please try again later.');
      return;
    }

    router.push('/email-sent'); // Navigate on success
  };

  useEffect(() => {
    if (!email) {
      setInvalidEmailError(''); // Clear error when empty
    } else if (!isValidEmail(email)) {
      setInvalidEmailError('Please enter a valid email address');
    } else {
      setInvalidEmailError('');
    }
  }, [email]); // Runs whenever email changes

  return (
    <StyledForm>
      <BackButton
        type="button"
        onClick={e => {
          e.preventDefault(); // prevents accidental form submission
          router.push('/login');
        }}
      >
        <Icon type={'backArrow'} />
      </BackButton>

      <GreenH2>Reset your password</GreenH2>
      <Flex $direction="column" $gap="1.5rem">
        <GrayP3 as="span">Enter your email for recovery link</GrayP3>

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
          <RedP3>{invalidEmailError}</RedP3>
        </div>

        <BigButton
          type="button"
          onClick={() => handleForgotPassword(email)}
          $primaryColor={COLORS.shrub}
          disabled={!canSubmitForm}
        >
          Send
        </BigButton>
      </Flex>
    </StyledForm>
  );
}
