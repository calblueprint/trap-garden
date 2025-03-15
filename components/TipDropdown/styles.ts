import styled from 'styled-components';
import Icon from '../Icon';

export const OrderedTipList = styled.ol`
  font-size: 12px;
  font-weight: 300;
  padding: 1.5rem;
  margin: 1rem;
  margin-top: -0.5rem;
  margin-bottom: -0.5rem;
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
`;
