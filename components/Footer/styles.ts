import styled from 'styled-components';
import { device } from '@/styles/breakpoints';
import COLORS from '@/styles/colors';
import Icon from '../Icon';

export const Container = styled.div`
  background-color: white;
  padding: 36px 24px 40px 32px;
  z-index: 500;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  bottom: 0;
`;

export const InfoText = styled.p`
  font-family: 'AirbnbCereal_W_Bk';
  font-size: 10px;
  color: ${COLORS.darkgray};
  font-weight: 400;
  line-height: 110%;

  @media ${device.lg} {
    font-size: 16px;
  }
`;

export const HeaderText = styled.p`
  font-family: 'AirbnbCereal_W_Bk';
  font-size: 16px;
  color: ${COLORS.darkgray};
  font-weight: 400;
  line-height: 110%;

  @media ${device.lg} {
    font-size: 20px;
  }
`;

export const Logo = styled.img`
  width: 46px;
  margin-bottom: 4px;

  @media ${device.lg} {
    width: 70px;
  }
`;

export const SocialMediaIcon = styled(Icon)`
  width: 12px;
  height: 12px;
  cursor: pointer;

  @media ${device.lg} {
    width: 20px;
    height: 20px;
  }
`;
