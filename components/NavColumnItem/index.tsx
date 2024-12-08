import React from 'react';
import { IconType } from '@/lib/icons';
import COLORS from '@/styles/colors';
import { P2 } from '@/styles/text';
import {
  NavColumnItemContainer,
  NavColumnItemOuterContainer,
  SelectedIndicator,
  StyledIcon,
  StyledLink,
} from './styles';

interface NavColumnItemProps {
  routeName: string;
  path: string;
  icon: IconType;
  isSelected: boolean;
  onClose: () => void;
}

export default function NavColumnItem({
  routeName,
  path,
  icon,
  isSelected,
  onClose,
}: NavColumnItemProps) {
  return (
    <StyledLink href={path} onClick={onClose}>
      <NavColumnItemOuterContainer $isSelected={isSelected}>
        {isSelected && <SelectedIndicator />}
        <NavColumnItemContainer>
          <StyledIcon type={icon} />
          <P2 $color={COLORS.shrub}>{routeName}</P2>
        </NavColumnItemContainer>
      </NavColumnItemOuterContainer>
    </StyledLink>
  );
}
