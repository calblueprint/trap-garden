import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/utils/AuthProvider';
import Icon from '../Icon';
import { Container, HamburgerButton } from './styles';

interface HeaderProps {
  toggleNavColumn: () => void;
}

export default function Header({ toggleNavColumn }: HeaderProps) {
  const { userId } = useAuth();
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
      {userId ? (
        <Icon type="profile" />
      ) : (
        <Link href="/login">Login/Sign Up</Link>
      )}
    </Container>
  );
}
