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
    height: 100%;
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
  padding: 24px;

  @media ${device.lg} {
    width: 58.39vw;
    padding-left: 175px;
    padding-right: 175px;
    padding-top: 100px;
    overflow-y: auto;
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

export const LoginLeftDiv = styled.div`
  display: none;

  @media ${device.lg} {
    display: flex;
    flex-direction: column;
    background-color: ${COLORS.shrub};
    width: 41.61vw;
    height: 100vh;
  }
`;

export const LoginLeftDivText = styled.p`
  font-size: 5rem;
  color: white;
  font-weight: 500;
  margin-left: 52px;
  margin-top: 166px;
`;

export const ResponsiveH2 = styled(H2)`
  @media ${device.lg} {
    font-size: 4rem;
  }
`;

export const ResponsiveP3 = styled(P3)`
  @media ${device.lg} {
    font-size: 1.25rem;
  }
`;
