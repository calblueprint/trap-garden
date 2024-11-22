import styled from 'styled-components';
import COLORS from '@/styles/colors';
import Icon from '../Icon';

export const NavColumnContainer = styled.div`
  width: 289px;
  height: 100vh;
  background: #f7f6f3;
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  transition: transform 1s ease-in-out;
`;

export const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  z-index: 999; /* Ensure it is below the NavColumn but above other elements */
  display: ${props => (props.isOpen ? 'block' : 'none')};
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
  padding: 24px 16px;
`;
