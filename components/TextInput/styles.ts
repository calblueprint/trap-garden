import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { P2 } from '@/styles/text';

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const StyledLabel = styled(P2).attrs({ as: 'label' })`
  margin-bottom: 0.25rem;
`;

export const StyledInput = styled(P2).attrs({ as: 'input' })<{
  $error?: boolean;
}>`
  padding: 0.75rem;
  border: 0.0625rem solid #ccc;
  border: 1px solid ${({ $error }) => ($error ? COLORS.errorRed : '#ccc')};
  border-radius: 0.3125rem;
  font-family: inherit; /* Inherit font-family from P2 */
  margin-bottom: 0.25rem;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: ${({ $error }) => ($error ? COLORS.errorRed : COLORS.shrub)};
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

export const TextSpacingWrapper = styled.div`
  margin: 0;
  margin-bottom: 0.25rem;
`;
