'use client';

import BPLogo from '@/assets/images/bp-logo.png';
import SingleSelectRadioGroup from '@/components/RadioGroup';
import { Container, Image } from './page.style';

export default function Home() {
  return (
    <Container>
      <Image src={BPLogo} alt="Blueprint Logo" />
      <p>Open up app/page.tsx to get started!</p>
      <SingleSelectRadioGroup
        name="exampleRadioGroup"
        options={[
          { label: 'School', value: 'option1' },
          { label: 'Community', value: 'option2' },
          { label: 'Individual', value: 'option3' },
        ]}
        defaultValue="option2"
      />
    </Container>
  );
}
