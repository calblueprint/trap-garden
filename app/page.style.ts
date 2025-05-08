'use client';

import styled from 'styled-components';
import Icon from '@/components/Icon';
import { device } from '@/styles/breakpoints';
import COLORS from '@/styles/colors';
import { H1, H3, P1, P2 } from '@/styles/text';

export const Container = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Image = styled.img`
  max-width: 50%;
  height:;

  @media ${device.lg} {
    max-width: 20%;
  }
`;

export const StyledIcon = styled(Icon)`
  width: 25px;
  height: 25px;

  @media ${device.lg} {
    width: 40px;
    height: 40px;
  }
`;

export const Title = styled(H1)`
  font-family: 'AirbnbCereal_W_Md';
  font-weight: 500;
  line-height: 110%;
  font-size: 36px;

  @media ${device.lg} {
    font-size: 42px;
  }
`;

export const WhiteDiv = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 45px;
  min-height: 440px;
  gap: 20px;

  @media ${device.lg} {
    padding: 64px 150px;
  }
`;

export const GreenDiv = styled.div`
  background-color: ${COLORS.shrub};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 40px 40px 0px 24px;
  min-height: 380px;
  width: 100%;

  @media ${device.lg} {
    padding: 64px 64px 0px 38px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 32px;
  margin-top: 12px;
  width: 100%;

  @media ${device.lg} {
    width: 50%;
  }
`;

export const ResponsiveP1 = styled(P1)`
  @media ${device.lg} {
    font-size: 24px;
  }
`;

export const ResponsiveP2 = styled(P2)`
  font-weight: 500;
  font-family: 'AirbnbCereal_W_Md';

  @media ${device.lg} {
    font-size: 20px;
  }
`;

export const ResponsiveH3 = styled(H3)`
  @media ${device.lg} {
    font-size: 32px;
  }
`;
