import Link from 'next/link';
import styled, { css } from 'styled-components';
import { device } from '@/styles/breakpoints';
import COLORS from '@/styles/colors';
import { P2, P3 } from '@/styles/text';

interface ButtonProps {
  $primaryColor?: string;
  $secondaryColor?: string;
  $width?: string;
}

/* shared ButtonStyles for all buttons
Must provide either primaryColor or secondaryColor, or both. 

If primaryColor provided, 
- Fill (background): primaryColor
- Text: secondaryColor (or white)
- Border: none 
If primaryColor not provided,
- Fill (background): transparent
- Text: secondaryColor 
- Border: secondaryColor

If both provided, it will be a primaryColor button with secondaryColor text
*/
const ButtonStyles = css<ButtonProps>`
  font-family: inherit;
  border: 0.5px solid;
  border-color: ${({ $secondaryColor, $primaryColor }) =>
    $primaryColor ? 'transparent' : $secondaryColor || 'white'};
  background: ${({ $primaryColor }) => $primaryColor || 'transparent'};
  color: ${({ $primaryColor, $secondaryColor }) =>
    $primaryColor ? 'white' : $secondaryColor};

  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;

  &:hover {
    cursor: pointer;
    /* background-color: ${({ $primaryColor, $secondaryColor }) =>
      $primaryColor ? $primaryColor : $secondaryColor};
    color: ${({ $primaryColor, $secondaryColor }) =>
      $primaryColor ? $secondaryColor : 'white'};
    border-color: ${({ $secondaryColor }) => $secondaryColor}; */
  }

  &:disabled {
    background: ${COLORS.midgray};
    border-color: ${COLORS.midgray};
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
  ${ButtonStyles}

  width: ${({ $width }) => $width || '156px'};
  height: 44px;
  border-radius: 44px;

  @media ${device.lg} {
    height: 60px;
  }
`;

export const BigButton = styled(Button)<ButtonProps>`
  width: 100%;
  @media ${device.lg} {
    font-size: 1.125rem;
  }
`;

export const SmallButton = styled(P3).attrs({ as: 'button' })<ButtonProps>`
  ${ButtonStyles}
  // Unique to Small Button 
  border-radius: 20px;
  height: 24px;
  min-width: 60px;
  flex-shrink: 0; // to prevent Clear Filters from collapsing on overflow
  padding: 4px 8px;
`;
