import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CONFIG from '@/lib/configs';
import { IconType } from '@/lib/icons';
import Icon from '../Icon';
import NavColumnItem from '../NavColumnItem';
import {
  HamburgerButton,
  HamburgerIcon,
  LoginButton,
  LoginButtonsContainer,
  NavColumnContainer,
  NavColumnHeader,
  NavLinksContainer,
  Overlay,
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
              <div></div>
            ) : (
              <LoginButtonsContainer>
                <LoginButton href={'/login'}>Log In</LoginButton>
                <SignUpButton href={'/signup'}>Sign Up</SignUpButton>
              </LoginButtonsContainer>
            )}
          </NavColumnContainer>
        </>
      )}
    </>
  );
}
