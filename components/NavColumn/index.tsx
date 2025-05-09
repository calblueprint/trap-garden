// components/NavColumn/index.tsx
'use client';

import React, {
  MouseEvent as ReactMouseEvent,
  useEffect,
  useState,
  useTransition,
} from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Loader from '@/components/CircularLoader';
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
import NavColumnItem from '../NavColumnItem';
import {
  HamburgerButton,
  HamburgerIcon,
  LoginButton,
  LoginButtonsContainer,
  LogoImage,
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

/* -------------------------------------------------------------------------- */
/*                             helper definitions                             */
/* -------------------------------------------------------------------------- */

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
  { name: 'Resources', path: CONFIG.resources, iconName: 'plant' },
  { name: 'Dashboard', path: CONFIG.dashboard, iconName: 'calendar' },
];

/* -------------------------------------------------------------------------- */
/*                                   Component                                */
/* -------------------------------------------------------------------------- */

export default function NavColumn({ isOpen, onClose }: NavColumnProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const { signOut, userId, loading: authLoading, userName } = useAuth();
  const { profileData, profileReady } = useProfile();

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confDetails, setConfDetails] = useState<string[]>([]);
  const [pendingHref, setPendingHref] = useState<string | null>(null);

  /* ---------------------------------------------------------------------- */
  /* safeOnClose — single helper covers sign-out and navigation w/confirm    */
  /* ---------------------------------------------------------------------- */
  function safeOnClose(
    e?: ReactMouseEvent<HTMLElement>,
    action: 'signOut' | 'navigate' = 'navigate',
  ) => {
    if (currentPath === '/add-details' || currentPath === '/onboarding') {
      if (currentPath === '/add-details') {
        setConfDetails(['Add Plant Details', 'plants']);
      } else {
        setConfDetails(['Onboarding', 'garden']);
      }
      e?.preventDefault();
      if (action === 'navigate') {
        const href = (e?.currentTarget as HTMLAnchorElement)?.getAttribute(
          'href',
        );
        if (href) setPendingHref(href);
      }
      // For both navigation and sign out on /add-details, show confirmation.
      setShowConfirmModal(true);
    } else {
      // If not on /add-details, perform the action immediately.
      if (action === 'signOut') {
        handleSignOut();
      } else {
        onClose();
      }
    }
  };

    if (isAddDetails) {
      // keep drawer open; decide later in modal
      if (action === 'navigate') {
        const targetHref =
          href ??
          (e?.currentTarget as HTMLElement | null)?.getAttribute('href');
        if (targetHref) setPendingHref(targetHref);
      }
      setShowConfirmModal(true);
      return;
    }

    if (action === 'signOut') {
      handleSignOut();
    } else {
      onClose();
    }
  }

  async function handleSignOut() {
    await signOut();
    startTransition(() => router.push(CONFIG.login));
    onClose();
  }

  /* ---------------------------------------------------------------------- */
  /* keyboard: close on ESC                                                 */
  /* ---------------------------------------------------------------------- */
  useEffect(() => {
    const handler = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  /* ---------------------------------------------------------------------- */
  /* modal confirm / cancel                                                 */
  /* ---------------------------------------------------------------------- */
  function handleConfirm() {
    if (pendingHref) startTransition(() => router.push(pendingHref));
    else handleSignOut();

    setShowConfirmModal(false);
    setPendingHref(null);
    onClose();
  }

  /* ---------------------------------------------------------------------- */
  /* auth or profile area                                                   */
  /* ---------------------------------------------------------------------- */
  function AuthOrProfileButtons() {
    const ready = profileReady && !authLoading;
    if (!ready) return <div>Loading…</div>;

    if (userId) {
      return (
        <ProfileDisplayContainer>
          {!profileData ? (
            <OnboardingButton href={CONFIG.onboarding} onClick={safeOnClose}>
              Go to Onboarding
            </OnboardingButton>
          ) : (
            <Link
              href={CONFIG.myAccount}
              onClick={safeOnClose}
              style={{ textDecoration: 'none' }}
            >
              <Profile>
                <ProfileIcon type="profile" />
                <NameAndStatus>
                  <H4 $color={COLORS.shrub} $fontWeight={300}>
                    {userName ?? 'Your Account'}
                  </H4>
                  <P3 $color={COLORS.shrub} $fontWeight={300}>
                    {userTypeLabels[profileData.user_type as UserTypeEnum]}{' '}
                    Garden
                  </P3>
                </NameAndStatus>
              </Profile>
            </Link>
          )}

          <BigButton
            $secondaryColor={COLORS.errorRed}
            onClick={() => safeOnClose(undefined, 'signOut')}
          >
            Sign Out
          </BigButton>
        </ProfileDisplayContainer>
      );
    }

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
  }

  /* ---------------------------------------------------------------------- */
  /* JSX                                                                    */
  /* ---------------------------------------------------------------------- */
  return (
    <>
      {/* loader while any transition is unresolved */}
      {isPending && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'rgba(255,255,255,0.55)',
            zIndex: 10_000,
          }}
        >
          <Loader />
        </div>
      )}

      {isOpen && (
        <>
          <Overlay onClick={onClose} $isOpen={isOpen} />
          <NavColumnContainer>
            <div>
              {/* ─── logo / hamburger header ─── */}
              <NavColumnHeader>
                <div />
                <Link
                  href={CONFIG.home}
                  onClick={e => {
                    safeOnClose(e, 'navigate');
                    startTransition(() => router.push(CONFIG.home));
                  }}
                >
                  <LogoImage
                    src="/images/grow-together-logo.png"
                    alt="Grow Together Logo"
                  />
                </Link>
                <HamburgerButton onClick={onClose}>
                  <HamburgerIcon type="hamburger" />
                </HamburgerButton>
              </NavColumnHeader>

              {/* ─── nav links ─── */}
              <NavLinksContainer>
                {navLinks.map(link => (
                  <NavColumnItem
                    key={link.path}
                    routeName={link.name}
                    path={link.path}
                    icon={link.iconName}
                    isSelected={pathname === link.path}
                    /* zero-arg wrapper satisfies the expected () => void type */
                    onClose={() => {
                      safeOnClose(undefined, 'navigate', link.path);
                      startTransition(() => router.push(link.path));
                    }}
                  />
                ))}
              </NavLinksContainer>
            </div>

            {/* ─── account / auth footer ─── */}
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
        title={`Exit ${confDetails[0]}?`}
        message={`You will lose all information entered for your ${confDetails[1]}!`}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </>
  );
}
