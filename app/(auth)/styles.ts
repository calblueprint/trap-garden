import styled from 'styled-components';
import { StyledLinkButton } from '@/components/Buttons';
import TextInput from '@/components/TextInput';
import COLORS from '@/styles/colors';
import { H2, P3 } from '@/styles/text';
import { device } from '../../styles/breakpoints';

export const StyledForm = styled.form`
  padding: 24px;
  padding-top: 48px;

  @media ${device.lg} {
    padding: 0;
  }
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 1.125rem;
  cursor: pointer;
  padding: 0;

  @media ${device.lg} {
    display: none;
  }
`;

export const GrayP3 = styled(P3)`
  color: ${COLORS.midgray};

  @media ${device.lg} {
    font-size: 1.25rem; 
    font-family: 'AirbnbCereal_W_Bk';
    font-weight: 400;
    margin-bottom: 72px;
    white-space: nowrap;
    overflow: visible;
    max-width: none;
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

  @media ${device.lg} {
    font-size: 2.625rem;
    font-family: 'AirbnbCereal_W_Md';
    font-weight: 500;
    white-space: nowrap;
    overflow: visible;
    max-width: none;
  }
`;

export const ResponsiveH2 = styled(H2)`
  @media ${device.lg} {
    font-size: 2.625rem;
    font-family: 'AirbnbCereal_W_Md';
    font-weight: 500;
  }
`;

export const RedP3 = styled(P3)`
  color: ${COLORS.errorRed};

  @media ${device.lg} {
    font-family: 'AirbnbCereal_W_Bk';
    font-size: 14px;
  }
`;

export const LoginPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${device.lg} {
    flex-direction: row;
    align-items: stretch;
    justify-content: flex-start;
    min-height: 100vh;
    gap: 0;
  }
}
`;

export const SolidGreenDiv = styled.div`
  display: none;

  @media ${device.lg} {
    display: block;
    background-color: ${COLORS.shrub};
    width: 41.61vw;
    min-height: 100%;
  }
`;

export const ResponsiveAuthSplitLayout = styled.div`
  display: flex;
  flex-direction: column;

  @media ${device.lg} {
    flex-direction: row;
    align-items: stretch;
    justify-content: flex-start;
    min-height: 100vh;
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
    min-height: 100%;
  }
`;

export const LoginLeftDivText = styled.p`
  font-size: 80px;
  color: white;
  font-weight: 500;
  margin-left: 52px;
  margin-top: 166px;
`;

export const ResponsiveP3 = styled(P3)`
  @media ${device.lg} {
    font-family: 'AirbnbCereal_W_Bk';
    font-size: 20px;
  }
`;

export const ResponsiveP3Lexend = styled(P3)`
  @media ${device.lg} {
    font-size: 16px;
  }
`;

export const ResponsiveTextInput = styled(TextInput)`
  @media ${device.lg} {
    font-size: 1.125rem !important;
  }
`;

export const BigButtonText = styled(P3)`
  @media ${device.lg} {
    font-size: 1.125rem;
  }
`;

export const AuthContentContainer = styled.div`
  width: 100%;

  @media ${device.lg} {
    width: 58.39vw;
    padding-left: 11rem;
    padding-right: 14rem;
    padding-top: 6rem;
    padding-bottom: 7rem;
    overflow-y: auto;
    height: 100%;
  }
`;

export const DesktopOnlyResetPassSubtitle = styled(GrayP3)`
  display: none;

  @media ${device.lg} {
    display: block;
    margin-top: 0.75rem;
    margin-bottom: 4.5rem;
  }
`;
