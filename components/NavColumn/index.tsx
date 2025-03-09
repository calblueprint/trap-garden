import React, { useState } from 'react';
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
import ConfirmationModal from '../ConfirmationModal';
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
  const router = useRouter();

  const { signOut, userId, loading: authLoading } = useAuth();
  const { profileData, profileReady } = useProfile();

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingHref, setPendingHref] = useState<string | null>(null);

  const handleSignOut = async () => {
    await signOut();
    router.push(CONFIG.login);
    onClose();
  };

  const safeOnClose = (
    e?: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ) => {
    if (currentPath === '/add-details') {
      e?.preventDefault();

      const href = (e?.currentTarget as HTMLAnchorElement)?.getAttribute(
        'href',
      );
      if (href) setPendingHref(href);

      setShowConfirmModal(true);
    } else {
      // If not on /add-details, just close or navigate as normal
      onClose();
    }
  };

  const handleCancel = () => {
    setShowConfirmModal(false);
    setPendingHref(null);
  };

  const handleConfirm = () => {
    if (pendingHref) {
      // Actually navigate
      router.push(pendingHref);
    }
    setShowConfirmModal(false);
    setPendingHref(null);

    onClose();
  };

  const AuthOrProfileButtons = () => {
    const authAndProfileReady = profileReady && !authLoading;
    if (!authAndProfileReady) {
      return <div>Loading...</div>;
    }

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

    // If not logged in
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
                <div>{/* Empty for spacing */}</div>
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

      <ConfirmationModal
        isOpen={showConfirmModal}
        title="Exit Add Plant Details?"
        message="You will lose all information entered for your plants."
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </>
  );
}
