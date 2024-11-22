import React from 'react';
import { IconType } from '@/lib/icons';
import Icon from '../Icon';
import {
  NavColumnItemContainer,
  NavColumnItemOuterContainer,
  SelectedIndicator,
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
    <NavColumnItemOuterContainer>
      {isSelected && <SelectedIndicator />}
      <NavColumnItemContainer isSelected={isSelected}>
        <Icon type={icon} />
        <StyledLink href={path} onClick={onClose}>
          {name}
        </StyledLink>
      </NavColumnItemContainer>
    </NavColumnItemOuterContainer>
  );
}
