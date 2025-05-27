'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Loader from '@/components/CircularLoader';
import CONFIG from '@/lib/configs';
import COLORS from '@/styles/colors';
import { Flex } from '@/styles/containers';
import { P3 } from '@/styles/text';
import { useAuth } from '@/utils/AuthProvider';
import { useProfile } from '@/utils/ProfileProvider';
import ConfirmationModal from '../ConfirmationModal';
import Icon from '../Icon';
import {
  Container,
  HamburgerButton,
  Image,
  ProfileIconWrapper,
} from './styles';

interface HeaderProps {
  toggleNavColumn: () => void;
}

export default function Header({ toggleNavColumn }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const { profileReady, profileData } = useProfile();
  const { userId, loading: authLoading } = useAuth();

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingHref, setPendingHref] = useState<string | null>(null);
  const [confDetails, setConfDetails] = useState<string[]>([]);

  /** helper that always navigates inside a transition */
  const push = (href: string) => startTransition(() => router.push(href));

  const safeOnClose = (
    e?: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ) => {
    if (pathname === '/add-details' || pathname === '/onboarding') {
      if (pathname === '/add-details')
        setConfDetails(['Add Plant Details', 'plants']);
      else setConfDetails(['Onboarding', 'garden']);

      e?.preventDefault();
      const href = (e?.currentTarget as HTMLAnchorElement)?.getAttribute(
        'href',
      );
      if (href) setPendingHref(href);
      setShowConfirmModal(true);
    } else if (pendingHref) {
      push(pendingHref);
    }
  };

  /* confirmation-modal handlers */
  const handleConfirm = () => {
    if (pendingHref) push(pendingHref);
    setShowConfirmModal(false);
    setPendingHref(null);
  };
  const handleCancel = () => {
    setShowConfirmModal(false);
    setPendingHref(null);
  };

  /* nav-column hamburger */
  const onNavColumnClick = () => toggleNavColumn();

  /* auth / profile buttons (unchanged except push) */
  function AuthOrProfileButtons() {
    if (authLoading || !profileReady) return <div />;

    if (userId) {
      if (profileData) {
        return (
          <ProfileIconWrapper>
            <Link onClick={safeOnClose} href={CONFIG.myAccount}>
              <Icon type="profile" />
            </Link>
          </ProfileIconWrapper>
        );
      }
      return (
        <Link href={CONFIG.onboarding}>
          <P3 $color={COLORS.blueLink}>Complete Onboarding</P3>
        </Link>
      );
    }

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
  }

  return (
    <>
      {/* loader overlay while a route transition is running */}
      {isPending && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'rgba(255,255,255,0.55)',
            zIndex: 10000,
          }}
        >
          <Loader />
        </div>
      )}

      <Container>
        <HamburgerButton onClick={onNavColumnClick}>
          <Icon type="hamburger" />
        </HamburgerButton>

        <Link onClick={safeOnClose} href={CONFIG.home}>
          <Image
            src="/images/grow-together-logo.png"
            alt="Grow Together Logo"
          />
        </Link>

        <AuthOrProfileButtons />

        <ConfirmationModal
          isOpen={showConfirmModal}
          title={`Exit ${confDetails[0]}?`}
          message={`You will lose all information entered for your ${confDetails[1]}!`}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
      </Container>
    </>
  );
}
