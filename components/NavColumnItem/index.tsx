import React from 'react';
import { IconType } from '@/lib/icons';
import {
  NavColumnItemContainer,
  NavColumnItemOuterContainer,
  SelectedIndicator,
  StyledIcon,
  StyledLink,
} from './styles';

interface NavColumnItemProps {
  name: string;
  path: string;
  icon: IconType;
  isSelected: boolean;
  onClose: () => void;
}

export default function NavColumnItem({
  name,
  path,
  icon,
  isSelected,
  onClose,
}: NavColumnItemProps) {
  return (
    <NavColumnItemOuterContainer isSelected={isSelected}>
      {isSelected && <SelectedIndicator />}
      <NavColumnItemContainer>
        <StyledIcon type={icon} />
        <StyledLink href={path} onClick={onClose}>
          {name}
        </StyledLink>
      </NavColumnItemContainer>
    </NavColumnItemOuterContainer>
  );
}
