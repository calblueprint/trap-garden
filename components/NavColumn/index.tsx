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
import { userTypeLabels } from '@/utils/helpers';
import { useProfile } from '@/utils/ProfileProvider';
import { BigButton } from '../Buttons';
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

  // Define a safe navigation function that warns the user if they're on add-details.
  const safeOnClose = (
    e?: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ) => {
    // Check if the current page is the add-details page.
    if (currentPath === '/add-details') {
      const confirmed = window.confirm(
        'You have unsaved changes. Are you sure you want to leave this page?',
      );
      if (!confirmed) {
        e.preventDefault();
        return;
      }
    }
    onClose();
  };

  const handleSignOut = async () => {
    await signOut();
    router.push(CONFIG.login);
    onClose();
  };

  const AuthOrProfileButtons = () => {
    const authAndProfileReady = profileReady && !authLoading;
    if (!authAndProfileReady) {
      return <div>Loading...</div>;
    }

    // Logged in Users
    if (userId) {
      return (
        <ProfileDisplayContainer>
          {!profileData ? (
            <OnboardingButton href={CONFIG.onboarding} onClick={safeOnClose}>
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
                  {userTypeLabels[profileData.user_type as UserTypeEnum] +
                    ' Garden'}
                </P3>
              </NameAndStatus>
            </Profile>
          )}
          <BigButton $secondaryColor={COLORS.errorRed} onClick={handleSignOut}>
            Sign Out
          </BigButton>
        </ProfileDisplayContainer>
      );
    }

    // Not logged in → Go to Auth Pages
    return (
      <LoginButtonsContainer>
        <LoginButton href={CONFIG.login} onClick={safeOnClose}>
          Log In
        </LoginButton>
        <SignUpButton href={CONFIG.signup} onClick={safeOnClose}>
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
                  {/* Empty whitespace for positioning logo and hamburger */}
                </div>
                <Link onClick={safeOnClose} href={CONFIG.home}>
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
                    // Use the safeOnClose function here to warn if on /add-details.
                    onClose={safeOnClose}
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
