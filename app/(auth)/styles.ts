import styled from 'styled-components';
import { StyledLinkButton } from '@/components/Buttons';
import COLORS from '@/styles/colors';
import { H2, P3 } from '@/styles/text';
import { device } from './breakpoints';

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

export const LoginPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${device.lg} {
    flex-direction: row;
    align-items: stretch;
    justify-content: flex-start;
    width: 100vw;
    height: 100vh;
    gap: 0;
  }
`;

export const LoginImage = styled.img`
  display: none;

  @media ${device.lg} {
    display: block;
    min-width: 60vw;
    height: 100vh;
    object-fit: cover;
    padding: 0;
    margin: 0;
  }
`;

export const LoginFormWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 24px;

  @media ${device.lg} {
    flex-grow: 1; // take up remaining space
    max-width: none;
    padding-left: 110px;
    padding-right: 85px;
    box-sizing: border-box; //padding included in total width
  }
`;

export const LoginFormImage = styled.img`
  display: none !important;

  @media ${device.lg} {
    display: block !important;
    width: 159px;
    height: 68px;
    margin-bottom: 90px;
  }
`;
