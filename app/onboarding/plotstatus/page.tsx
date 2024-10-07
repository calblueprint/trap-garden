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
    const newProfile = { state, email: '', phone_num: '', user_type: '' };
    addProfile(newProfile);
    console.log('test');
  };
  return (
    <PageContainer>
      <ContentContainer>
        <h1>Plot Status</h1>
        <h3>Do you own a plot to plant in?</h3>
        <ButtonContainer>
          <Button onClick={() => handleButtonClick('Yes')}>Georgia</Button>
          <Button onClick={() => handleButtonClick('Tennesee')}>No</Button>
        </ButtonContainer>
      </ContentContainer>
    </PageContainer>
  );
}
