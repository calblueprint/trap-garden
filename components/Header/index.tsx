import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '../Icon';
import { Container, HamburgerButton } from './styles';

interface HeaderProps {
  toggleNavColumn: () => void;
  isLoggedIn: boolean;
}

export default function Header({ toggleNavColumn, isLoggedIn }: HeaderProps) {
  const currentPath = usePathname();

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
      <Link href="/">
        <Icon type="logo" />
      </Link>
      {/* still need to check if onboarding completed or not, after ProfileContext merged*/}
      {isLoggedIn ? (
        <Icon type="profile" />
      ) : (
        <Link href="/login">Login/Sign Up</Link>
      )}
    </Container>
  );
}
