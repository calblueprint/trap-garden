import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CONFIG from '@/lib/configs';
import { IconType } from '@/lib/icons';
import COLORS from '@/styles/colors';
import { H3, H4 } from '@/styles/text';
import { useAuth } from '@/utils/AuthProvider';
import Icon from '../Icon';
import NavColumnItem from '../NavColumnItem';
import {
  HamburgerButton,
  HamburgerIcon,
  LoginButton,
  LoginButtonsContainer,
  NameAndStatus,
  NavColumnContainer,
  NavColumnHeader,
  NavLinksContainer,
  Overlay,
  Profile,
  ProfileDisplayContainer,
  SignOutButton,
  SignUpButton,
} from './styles';

interface NavColumnProps {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
}

type NavLink = {
  name: string;
  path: string;
  iconName: IconType;
};

const navLinks: NavLink[] = [
  { name: 'View Plants', path: CONFIG.viewPlants, iconName: 'plant' },
  {
    name: 'Planting Timeline',
    path: CONFIG.plantingTimeline,
    iconName: 'calendar',
  },
];

export default function NavColumn({
  isOpen,
  onClose,
  isLoggedIn,
}: NavColumnProps) {
  const currentPath = usePathname();
  const { signOut } = useAuth();

  return (
    <>
      {isOpen && (
        <>
          <Overlay onClick={onClose} isOpen={isOpen} />
          <NavColumnContainer>
            <div>
              <NavColumnHeader>
                <div>
                  {/* empty whitespace for positioning logo and hamburger */}
                </div>
                <Link onClick={onClose} href="/">
                  <Icon type="logo" />
                </Link>
                <HamburgerButton onClick={onClose}>
                  <HamburgerIcon type="hamburger" />
                </HamburgerButton>
              </NavColumnHeader>
              <NavLinksContainer>
                {navLinks.map((link: NavLink) => (
                  <NavColumnItem
                    name={link.name}
                    path={link.path}
                    isSelected={currentPath === link.path}
                    icon={link.iconName}
                    onClose={onClose}
                  />
                ))}
              </NavLinksContainer>
            </div>
            {isLoggedIn ? (
              <ProfileDisplayContainer>
                <Profile>
                  <Icon type="profile" />
                  <NameAndStatus>
                    <H3 $color={COLORS.shrub} style={{ fontWeight: 300 }}>
                      Name
                    </H3>
                    <H4 $color={COLORS.shrub} style={{ fontWeight: 300 }}>
                      Type of Garden
                    </H4>
                  </NameAndStatus>
                </Profile>
                <SignOutButton onClick={signOut}>Sign Out</SignOutButton>
              </ProfileDisplayContainer>
            ) : (
              <LoginButtonsContainer>
                <LoginButton href={'/login'} onClick={onClose}>
                  Log In
                </LoginButton>
                <SignUpButton href={'/signup'} onClick={onClose}>
                  Sign Up
                </SignUpButton>
              </LoginButtonsContainer>
            )}
          </NavColumnContainer>
        </>
      )}
    </>
  );
}
