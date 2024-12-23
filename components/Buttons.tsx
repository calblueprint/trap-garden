import Link from 'next/link';
import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { P2 } from '@/styles/text';

interface ButtonProps {
  $primaryColor?: string;
  $secondaryColor?: string;
  $textColor?: string;
}

export const BigButton = styled.button<ButtonProps>`
  background-color: ${props => props.color || COLORS.shrub};

  color: white;
  padding: 0.625rem 1.25rem;
  border: none;
  border-radius: 3.125rem;
  cursor: pointer;
  width: 100%;
  height: 3rem;
  max-height: 3rem;
  font-family: inherit;

  &:disabled {
    background-color: ${COLORS.midgray}; // Change to a gray color to indicate disabled state
    cursor: not-allowed;
  }
`;

export const StyledLinkButton = styled(Link)`
  color: '#0769BF';
  border: none;
  text-decoration: none;
  text-align: center;
  display: inline-block;
  cursor: pointer;
  text-decoration: underline;
`;

export const Button = styled(P2).attrs({ as: 'button' })<ButtonProps>`
  width: 156px;
  height: 44px;
  border-radius: 25rem;
  border: 0.5px solid;
  font-family: inherit;
  color: ${({ $textColor }) => $textColor || 'white'};
  background: ${({ $primaryColor }) => $primaryColor || 'white'};
  border-color: ${({ $secondaryColor, $primaryColor }) =>
    $secondaryColor || $primaryColor || 'white'};
  &:disabled {
    background: ${({ $secondaryColor }) => $secondaryColor ?? COLORS.midgray};
  }
`;
