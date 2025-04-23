import styled from 'styled-components';
import { P3 } from '@/styles/text';
import Icon from '../Icon';

export const OrderedTipList = styled.ol`
  font-size: 12px;
  font-weight: 300;
  padding: 1.5rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  margin-left: 1rem;
  marginp-right: 1rem;
  font-family: 'AirbnbCereal_W_Lt', sans-serif;
`;

export const StyledIcon = styled(Icon)`
  width: 36px;
  height: 36px;
  color: black;
`;

export const CategoryName = styled.h1<{ $colorString: string }>`
  color: ${({ $colorString }) => $colorString};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  font-family: 'AirbnbCereal_W_Bk', sans-serif;
`;

export const Dropdown = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

export const AirbnbP3 = styled(P3)`
  font-family: 'AirbnbCereal_W_Lt', sans-serif;
`;
