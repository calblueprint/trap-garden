import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import CONFIG from '@/lib/configs';
import { IconType } from '@/lib/icons';
import COLORS from '@/styles/colors';
import { Flex } from '@/styles/containers';
import { H4, P3 } from '@/styles/text';
import { UserTypeEnum } from '@/types/schema';
import { useAuth } from '@/utils/AuthProvider';
import { formatUserType } from '@/utils/helpers';
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
  OnboardingButton,
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

export default function NavColumn({ isOpen, onClose }: NavColumnProps) {
  const currentPath = usePathname();
  const { signOut, userId, loading: authLoading } = useAuth();
  const router = useRouter();
  const { profileData, profileReady } = useProfile();

  const handleSignOut = () => {
    router.push(CONFIG.login);
    onClose();
    signOut();
  };

  const AuthOrProfileButtons = () => {
    const authAndProfileReady = profileReady && !authLoading;
    if (!authAndProfileReady) {
      return <div>Loading...</div>;
    }

    // Logged in Users
    if (userId) {
      // Logged in, not onboarded -> Go To Onboarding button
      // Logged in, Onboarded -> Show My Account Info
      return (
        <ProfileDisplayContainer>
          {!profileData ? (
            <OnboardingButton href={CONFIG.onboarding} onClick={onClose}>
              Go to Onboarding
            </OnboardingButton>
          ) : (
            <Profile>
              <ProfileIcon type="profile" />
              <NameAndStatus>
                <H4 $color={COLORS.shrub} $fontWeight={300}>
                  Your Account
                </H4>
                <P3 $color={COLORS.shrub} $fontWeight={300}>
                  {formatUserType(profileData?.user_type as UserTypeEnum)}
                </P3>
              </NameAndStatus>
            </Profile>
          )}
          <SignOutButton onClick={handleSignOut}>Sign Out</SignOutButton>
        </ProfileDisplayContainer>
      );
    }

    // Not logged -> Go to Auth Pages
    return (
      <LoginButtonsContainer>
        <LoginButton href={CONFIG.login} onClick={onClose}>
          Log In
        </LoginButton>
        <SignUpButton href={CONFIG.signup} onClick={onClose}>
          Sign Up
        </SignUpButton>
      </LoginButtonsContainer>
    );
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
                <Link onClick={onClose} href={CONFIG.home}>
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
            <Flex
              $direction="column"
              $pb="52px"
              $px="16px"
              $w="100%"
              $h="max-content"
            >
              <AuthOrProfileButtons />
            </Flex>
          </NavColumnContainer>
        </>
      )}
    </>
  );
}
