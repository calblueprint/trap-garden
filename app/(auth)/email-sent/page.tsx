'use client';

import { useRouter } from 'next/navigation';
import { BackButton } from '@/app/(auth)/styles';
import Icon from '@/components/Icon';
import COLORS from '@/styles/colors';
import { Flex } from '@/styles/containers';
import { H2, P3 } from '@/styles/text';
import { StyledForm } from '../styles';

export default function EmailSent() {
  const router = useRouter();

  return (
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

      <H2 $color={COLORS.shrub} style={{ marginBottom: '8px' }}>
        Email Sent!
      </H2>
      <Flex $direction="column" $gap="1.5rem">
        <P3 as="span" $color={COLORS.midgray}>
          Check your email for password recovery
        </P3>
      </Flex>
    </StyledForm>
  );
}
