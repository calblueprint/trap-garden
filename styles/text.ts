import styled, { css } from 'styled-components';
import COLORS from './colors';

// 1 rem = 16 px
interface TextProps {
  $color?: string;
  $align?: 'left' | 'right' | 'center' | 'end' | 'justify' | 'start';
}

const TextStyles = css<TextProps>`
  color: ${({ $color }) => $color || COLORS.black};
  text-align: ${({ $align }) => $align};
  margin: 0;
  fontfamily: "'Lexend', sans-serif";
`;

export const H1 = styled.h1<TextProps>`
  ${TextStyles}
  font-size: 2rem; // this may change later
`;

export const H2 = styled.h2<TextProps>`
  ${TextStyles}
  font-size: 1.75rem;
`;

export const H3 = styled.h3<TextProps>`
  ${TextStyles}
  font-size: 1.25rem;
`;

export const H4 = styled.h4<TextProps>`
  ${TextStyles}
  font-size: 1rem;
`;

export const body2text = css`
  ${TextStyles};
  fontsize: '14px';
  fontweight: 300;
`;
