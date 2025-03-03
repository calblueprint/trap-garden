'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/api/supabase/createClient';
import { BackButton } from '@/app/plant-page/style';
import { BigButton } from '@/components/Buttons';
import Icon from '@/components/Icon';
import TextInput from '@/components/TextInput';
import COLORS from '@/styles/colors';
import { H2, P3 } from '@/styles/text';
import { StyledForm } from '../styles';

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [invalidEmailError, setInvalidEmailError] = useState('');
  const [checkValidEmailError, setCheckValidEmailError] = useState('');
  const canSubmitForm = email && !checkValidEmailError;

  const router = useRouter();

  const handleEmailChange = async (newEmail: string) => {
    setEmail(newEmail);
    setInvalidEmailError('');
    setCheckValidEmailError(
      !isValidEmail(newEmail) ? 'Please enter a valid email address' : '',
    );
  };

  const handleForgotPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://trap-garden-dev2.vercel.app/forgot-password',
      // this page doesn't actually exist right now, but will be added in the future
    });

    if (error) {
      setInvalidEmailError('Something went wrong. Please try again later.');
      return;
    }

    router.push('/email-sent'); // Navigate on success
  };

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

      <H2 $color={COLORS.shrub} style={{ marginBottom: '8px' }}>
        Reset your password
      </H2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <P3 as="span" $color={COLORS.midgray}>
          Enter your email for recovery link
        </P3>

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

        <BigButton
          type="button"
          onClick={() => handleForgotPassword(email)}
          $primaryColor={COLORS.shrub}
          disabled={!canSubmitForm}
        >
          Send
        </BigButton>
      </div>
    </StyledForm>
  );
}
