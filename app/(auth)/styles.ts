import styled from 'styled-components';
import { StyledLinkButton } from '@/components/Buttons';
import COLORS from '@/styles/colors';
import { H2, P3 } from '@/styles/text';

export const StyledForm = styled.form`
  padding: 24px;
  padding-top: 48px;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 1.125rem;
  cursor: pointer;
  padding: 0;
`;

export const GrayP3 = styled(P3)`
  color: ${COLORS.midgray};
`;

export const ResetLinkButton = styled(StyledLinkButton)`
  padding: 4px;
`;

export const ColumnFlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const GreenH2 = styled(H2)`
  color: ${COLORS.shrub};
  margin-bottom: 8px;
`;

export const RedP3 = styled(P3)`
  color: ${COLORS.errorRed};
`;
