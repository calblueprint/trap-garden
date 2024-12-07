import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { body2text } from '@/styles/text';

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  // overflow: visible;
`;

export const StyledLabel = styled.label`
  ${body2text}
  color: ${COLORS.darkgray};
  margin-bottom: 0.25rem;
`;

export const StyledInput = styled.input<{ error?: boolean }>`
  padding: 0.75rem;
  border: 0.0625rem solid #ccc;
  border: 1px solid ${({ error }) => (error ? COLORS.error : '#ccc')};
  border-radius: 0.3125rem;
  font-size: 1rem;
  margin-bottom: 0.25rem;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: ${({ error }) => (error ? COLORS.error : COLORS.shrub)};
    outline: none;
  }
`;

export const IconWrapper = styled.span`
  position: absolute;
  right: 1rem;
  cursor: pointer;
  top: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLORS.darkgray};
`;

export const StyledButton = styled.button`
  background-color: ${COLORS.shrub};
  color: white;
  padding: 0.625rem 1.25rem;
  border: none;
  border-radius: 3.125rem;
  justify-content: center;
  width: 100%;
  height: 2.625rem;
  cursor: pointer;

  &:disabled {
    background-color: ${COLORS.midgray}; // Change to a gray color to indicate disabled state
    cursor: not-allowed;
  }
`;

export const TextErrorWrapper = styled.div``;

export const TextSpacingWrapper = styled.div`
  margin: 0;
  marginbottom: 0.25rem;
`;
