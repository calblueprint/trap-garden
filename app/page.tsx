'use client';

import BPLogo from '@/assets/images/bp-logo.png';
import { Container, Image } from './page.style';

export default function Home() {
  return (
    <Container>
      <Image src={BPLogo} alt="Blueprint Logo" />
      <p>Home Page is currently under construction!</p>
    </Container>
  );
}
