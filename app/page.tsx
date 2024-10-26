import { ProfileProvider } from '@/utils/ProfileProvider';
import OnboardingFlow from './onboarding/page';
import { Container } from './page.style';

export default function Home() {
  return (
    <Container>
      <ProfileProvider>
        <OnboardingFlow />
      </ProfileProvider>
    </Container>
  );
}
