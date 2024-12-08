import styled from 'styled-components';
import COLORS from '@/styles/colors';

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
`;

export const Button = styled.button<ButtonProps>`
  width: 9.375rem;
  height: 2.813rem;
  border-radius: 25rem;
  font-size: 14px;
  border: 0.5px solid;
  color: ${({ $textColor }) => $textColor || 'white'};
  background: ${({ $primaryColor }) => $primaryColor || 'white'};
  border-color: ${({ $secondaryColor, $primaryColor }) =>
    $secondaryColor || $primaryColor || 'white'};
  &:disabled {
    background: ${({ $secondaryColor }) => $secondaryColor ?? COLORS.midgray};
  }
`;
