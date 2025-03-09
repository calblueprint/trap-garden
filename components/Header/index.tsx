import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import CONFIG from '@/lib/configs';
import COLORS from '@/styles/colors';
import { Flex } from '@/styles/containers';
import { P3 } from '@/styles/text';
import { useAuth } from '@/utils/AuthProvider';
import { useProfile } from '@/utils/ProfileProvider';
import ConfirmationModal from '../ConfirmationModal';
import Icon from '../Icon';
import { Container, HamburgerButton } from './styles';

interface HeaderProps {
  toggleNavColumn: () => void;
}

export default function Header({ toggleNavColumn }: HeaderProps) {
  const currentPath = usePathname();
  const router = useRouter();

  const { profileReady, profileData } = useProfile();
  const { userId, loading: authLoading } = useAuth();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingHref, setPendingHref] = useState<string | null>(null);

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
      if (pendingHref) router.push(pendingHref);
    }
  };

  // Confirm handler for the modal:
  const handleConfirm = () => {
    if (pendingHref) {
      router.push(pendingHref);
    }
    setShowConfirmModal(false);
    setPendingHref(null);
  };

  const handleCancel = () => {
    setShowConfirmModal(false);
    setPendingHref(null);
  };

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
        return <Icon type="profile" onClick={safeOnClose} />;
      }

      // Not onboarded
      return (
        <Link href={CONFIG.onboarding}>
          <P3 $color={COLORS.blueLink}>Complete Onboarding</P3>
        </Link>
      );
    }

    // Not logged-in user
    return (
      <Flex $direction="row" $gap="8px" $w="max-content">
        <Link href={CONFIG.login}>
          <P3 $color={COLORS.blueLink}>Login</P3>
        </Link>
        <Link href={CONFIG.signup}>
          <P3 $color={COLORS.blueLink}>Sign Up</P3>
        </Link>
      </Flex>
    );
  };

  return (
    <Container>
      <HamburgerButton onClick={onNavColumnClick}>
        <Icon type="hamburger" />
      </HamburgerButton>
      <Link onClick={safeOnClose} href={CONFIG.home}>
        <Icon type="logo" />
      </Link>
      <AuthOrProfileButtons />
      <ConfirmationModal
        isOpen={showConfirmModal}
        title="Exit Add Plant Details?"
        message="You will lose all information entered for your plants"
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </Container>
  );
}
