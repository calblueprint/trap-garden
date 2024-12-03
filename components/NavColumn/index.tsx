import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import CONFIG from '@/lib/configs';
import { IconType } from '@/lib/icons';
import COLORS from '@/styles/colors';
import { H3, H4 } from '@/styles/text';
import { UserTypeEnum } from '@/types/schema';
import { useAuth } from '@/utils/AuthProvider';
import { getUserType } from '@/utils/helpers';
import { useProfile } from '@/utils/ProfileProvider';
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
  ProfileIcon,
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
  const router = useRouter();
  const { profileData } = useProfile();

  const handleSignOut = () => {
    router.push(CONFIG.login);
    onClose();
    signOut();
  };

  return (
    <>
      {isOpen && (
        <>
          <Overlay onClick={onClose} $isOpen={isOpen} />
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
                {navLinks.map((link: NavLink, key) => (
                  <NavColumnItem
                    key={key}
                    routeName={link.name}
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
                  <ProfileIcon type="profile" />
                  <NameAndStatus>
                    <H3 $color={COLORS.shrub} style={{ fontWeight: 300 }}>
                      Your Account
                    </H3>
                    <H4 $color={COLORS.shrub} style={{ fontWeight: 300 }}>
                      {getUserType(profileData?.user_type as UserTypeEnum)}
                    </H4>
                  </NameAndStatus>
                </Profile>
                <SignOutButton onClick={handleSignOut}>Sign Out</SignOutButton>
              </ProfileDisplayContainer>
            ) : (
              <LoginButtonsContainer>
                <LoginButton href={CONFIG.login} onClick={onClose}>
                  Log In
                </LoginButton>
                <SignUpButton href={CONFIG.signup} onClick={onClose}>
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
