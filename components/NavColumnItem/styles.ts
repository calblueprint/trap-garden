import Link from 'next/link';
import styled from 'styled-components';
import COLORS from '@/styles/colors';
import Icon from '../Icon';

export const NavColumnItemOuterContainer = styled.div<{ isSelected: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${props =>
    props.isSelected ? '12px 12px 12px 0px' : '12px 12px 12px 0px'};
  background-color: ${props =>
    props.isSelected
      ? 'rgba(148, 181, 6, 0.1)'
      : '#f7f6f3'}; // this is COLORS.shrub with 10% opacity
  border-radius: ${props => (props.isSelected ? '0px 50px 50px 0px' : 'none')};
  position: relative;
  z-index: 1;
  margin-right: 8px;
`;

export const NavColumnItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: center;
  margin-left: 24px;
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
  border-radius: 0px 50px 50px 0px;
  height: 100%;
  min-height: 44px;
  min-width: 4px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2; //places SelectedIndicator on top of NavColumnItemOuterContainer
`;

export const StyledIcon = styled(Icon)`
  min-height: 25px;
  min-width: 25px;
`;
