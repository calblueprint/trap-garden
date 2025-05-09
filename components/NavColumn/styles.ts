import Link from 'next/link';
import styled from 'styled-components';
import COLORS from '@/styles/colors';
import Icon from '../Icon';

export const NavColumnContainer = styled.div`
  min-width: 289px;
  height: 100%;
  background: ${COLORS.glimpse};
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  transition: transform 1s ease-in-out;
  justify-content: space-between;
`;

export const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
`;

export const HamburgerButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${COLORS.shrub};
  justify-self: flex-end;
`;

// not working
export const HamburgerIcon = styled(Icon)`
  fill: ${COLORS.shrub};
`;

export const NavColumnHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  padding: 24px 16px 12px;
  z-index: 1001;
`;

export const NavLinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const LoginButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`;

export const LoginButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border: 1px solid ${COLORS.shrub};
  background-color: inherit;
  padding: 12px 0px 12px 0px;
  color: ${COLORS.shrub};
  text-decoration: none;
  font-size: 0.875rem;
`;

export const SignUpButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border: none;
  background-color: ${COLORS.shrub};
  padding: 12px 0px 12px 0px;
  color: ${COLORS.glimpse};
  text-decoration: none;
  font-size: 0.875rem;
`;

export const OnboardingButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border: none;
  background-color: ${COLORS.shrub};
  color: ${COLORS.glimpse};
  text-decoration: none;
  font-size: 0.875rem;
  height: 40px;
`;

export const ProfileDisplayContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: center;
`;

export const NameAndStatus = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ProfileIcon = styled(Icon)`
  min-height: 40px;
  min-width: 40px;
`;

export const LogoImage = styled.img`
  width: 69px;
  height: 23px;
`;
