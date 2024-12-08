import React from 'react';
import Link from 'next/link';
import CONFIG from '@/lib/configs';
import { Flex } from '@/styles/containers';
import { useAuth } from '@/utils/AuthProvider';
import { useProfile } from '@/utils/ProfileProvider';
import Icon from '../Icon';
import { Container, HamburgerButton } from './styles';

interface HeaderProps {
  toggleNavColumn: () => void;
}

export default function Header({ toggleNavColumn }: HeaderProps) {
  const { profileReady, profileData } = useProfile();
  const { userId, loading: authLoading } = useAuth();

  const onNavColumnClick = () => {
    toggleNavColumn();
  };

  const AuthOrProfileButtons = () => {
    // If not (both profile and auth ready)
    if (authLoading || !profileReady) return <div></div>;

    // Logged-in user
    if (userId) {
      // Logged in AND onboarded
      // TODO: this should route to /my-account in the future
      if (profileData) {
        return <Icon type="profile" />;
      }

      // Not onboarded
      return <Link href={CONFIG.onboarding}>Complete Onboarding</Link>;
    }

    // Not logged-in user
    return (
      <Flex $direction="row" $gap="8px" $w="max-content">
        <Link href={CONFIG.login}>Login</Link>
        <Link href={CONFIG.signup}>Sign Up</Link>
      </Flex>
    );
  };

  return (
    <Container>
      <HamburgerButton onClick={onNavColumnClick}>
        <Icon type="hamburger" />
      </HamburgerButton>
      <Link href={CONFIG.home}>
        <Icon type="logo" />
      </Link>
      <AuthOrProfileButtons />
    </Container>
  );
}
