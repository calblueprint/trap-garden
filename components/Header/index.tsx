import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CONFIG from '@/lib/configs';
import { useProfile } from '@/utils/ProfileProvider';
import Icon from '../Icon';
import { Container, HamburgerButton } from './styles';

interface HeaderProps {
  toggleNavColumn: () => void;
  isLoggedIn: boolean;
}

export default function Header({ toggleNavColumn, isLoggedIn }: HeaderProps) {
  const currentPath = usePathname();
  const { profileReady, profileData } = useProfile();

  const onNavColumnClick = () => {
    toggleNavColumn();
  };

  if (currentPath === '/onboarding') {
    return null;
  }

  return (
    <Container>
      <HamburgerButton onClick={onNavColumnClick}>
        <Icon type="hamburger" />
      </HamburgerButton>
      <Link href={CONFIG.home}>
        <Icon type="logo" />
      </Link>
      {isLoggedIn ? (
        profileReady && profileData !== null ? (
          // display profile icon if user is logged in and onboarded
          // this should route to /my-account in the future
          <Icon type="profile" />
        ) : (
          // display onboarding link if user is logged in but not onboarded
          <Link href={CONFIG.onboarding}>Complete Onboarding</Link>
        )
      ) : (
        // display login link if user is not logged in
        <Link href={CONFIG.login}>Login/Sign Up</Link>
      )}
    </Container>
  );
}
