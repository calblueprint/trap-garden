'use client';

import { useProfile } from '@/hooks/useProfile';
import {
  Button,
  ButtonContainer,
  ContentContainer,
  PageContainer,
} from '../styles';

export default function Page() {
  const { addProfile } = useProfile();

  const handleButtonClick = (state: string) => {
    console.log('test');
  };
  return (
    <PageContainer>
      <ContentContainer>
        <h1>Choose Your state</h1>
        <ButtonContainer>
          <Button onClick={() => handleButtonClick('Georgia')}>Georgia</Button>
          <Button onClick={() => handleButtonClick('Tennesee')}>
            Tennesse
          </Button>
        </ButtonContainer>
      </ContentContainer>
    </PageContainer>
  );
}
