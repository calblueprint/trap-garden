'use client';

import BPLogo from '@/assets/images/bp-logo.png';
import { showToast } from '@/components/Toast';
import { Container, Image } from './page.style';

export default function Home() {
  return (
    <Container>
      <Image src={BPLogo} alt="Blueprint Logo" />
      <p>Home Page is currently under construction!</p>
      <button
        onClick={() =>
          showToast({
            message: 'Watering Tomato is completed !',
            undo: true,
            undoAction: () => console.log('Undo clicked!'),
          })
        }
      >
        this is a test
      </button>
    </Container>
  );
}
