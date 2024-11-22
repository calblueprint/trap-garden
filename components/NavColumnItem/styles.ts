import Link from 'next/link';
import styled from 'styled-components';
import COLORS from '@/styles/colors';

export const NavColumnItemOuterContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const NavColumnItemContainer = styled.div<{ isSelected: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${props => (props.isSelected ? '24px 24px 24px 20px' : '24px')};
  gap: 16px;
  background-color: ${props =>
    props.isSelected
      ? 'rgba(148, 181, 6, 0.1)'
      : '#f7f6f3'}; // this is COLORS.shrub with 10% opacity
  border-radius: ${props => (props.isSelected ? '0px 50px 50px 0px' : 'none')};
  width: 100%;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${COLORS.shrub};
  &:hover {
    text-decoration: none;
  }
  &:focus,
  &:active {
    color: inherit; /* Ensure color does not change when clicked */
    text-decoration: none;
  }
`;

export const SelectedIndicator = styled.div`
  background-color: ${COLORS.shrub};
  border: 1px solid ${COLORS.shrub};
  border-radius: 0px 50px 50px 0px;
  height: 100%;
  min-height: 72px;
  min-width: 4px;
`;
