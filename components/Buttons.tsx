import Link from 'next/link';
import styled from 'styled-components';
import COLORS from '@/styles/colors';

export const BigButton = styled.button<{ $color?: string }>`
  background-color: ${props => props.color || COLORS.shrub};

  color: white;
  padding: 0.625rem 1.25rem;
  border: none;
  border-radius: 3.125rem;
  cursor: pointer;
  width: 100%;
  height: 3rem;
  max-height: 3rem;

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
