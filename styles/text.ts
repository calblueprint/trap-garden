import styled, { css } from 'styled-components';
import COLORS from './colors';

// 1 rem = 16 px
interface TextProps {
  $color?: string;
  $fontWeight?: number | string;
  $align?: 'left' | 'right' | 'center' | 'end' | 'justify' | 'start';
}

const TextStyles = css<TextProps>`
  color: ${({ $color }) => $color || COLORS.black};
  text-align: ${({ $align }) => $align};
  margin: 0;
`;

export const H1 = styled.h1<TextProps>`
  ${TextStyles}
  font-weight: ${({ $fontWeight }) => $fontWeight || '500'};
  font-size: 2rem;
`;

export const H2 = styled.h2<TextProps>`
  ${TextStyles}
  font-family: 'AirbnbCereal_W_Bk', sans-serif;
  font-weight: ${({ $fontWeight }) => $fontWeight || '400'};
  font-size: 1.75rem;
`;

export const H3 = styled.h3<TextProps>`
  ${TextStyles}
  font-weight: ${({ $fontWeight }) => $fontWeight || '400'};
  font-size: 1.5rem;
`;

export const H4 = styled.h4<TextProps>`
  ${TextStyles}
  font-weight: ${({ $fontWeight }) => $fontWeight || '300'};
  font-size: 1.25rem;
`;

export const P1 = styled.p<TextProps>`
  ${TextStyles}
  font-weight: ${({ $fontWeight }) => $fontWeight || '300'};
  font-size: 1rem;
`;

export const P2 = styled.p<TextProps>`
  ${TextStyles}
  font-weight: ${({ $fontWeight }) => $fontWeight || '300'};
  font-size: 0.875rem;
`;

export const P3 = styled.p<TextProps>`
  ${TextStyles}
  font-weight: ${({ $fontWeight }) => $fontWeight || '300'};
  font-size: 0.75rem;
`;
