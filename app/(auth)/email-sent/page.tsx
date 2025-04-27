'use client';

import { useRouter } from 'next/navigation';
import {
  AuthContentContainer,
  BackButton,
  GrayP3,
  GreenH2,
  ResponsiveAuthSplitLayout,
  SolidGreenDiv,
} from '@/app/(auth)/styles';
import Icon from '@/components/Icon';
import { Flex } from '@/styles/containers';
import { StyledForm } from '../styles';

export default function EmailSent() {
  const router = useRouter();

  return (
    <ResponsiveAuthSplitLayout>
      <SolidGreenDiv />
      <AuthContentContainer>
        <StyledForm>
          <BackButton
            type="button"
            onClick={e => {
              e.preventDefault(); // prevents accidental form submission
              router.push('/forgot-password');
            }}
          >
            <Icon type={'backArrow'} />
          </BackButton>

          <GreenH2>Email Sent!</GreenH2>
          <Flex $direction="column" $gap="1.5rem">
            <GrayP3 as="span">Check your email for password recovery</GrayP3>
          </Flex>
        </StyledForm>
      </AuthContentContainer>
    </ResponsiveAuthSplitLayout>
  );
}
