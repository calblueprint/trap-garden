import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { H3 } from '@/styles/text';

export const Container = styled.div`
  background-color: ${COLORS.backgroundGrey};
  padding: 1.5rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: #333;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 6px;
`;

export const IconWrapper = styled.span`
  margin-right: 6px;
  color: #8bc34a;
`;

export const TipsList = styled.ol`
  margin: 0;
  padding-left: 0;
  list-style-position: inside;
  font-size: 0.875rem;
  font-style: inherit;
  font-weight: 400;
  line-height: normal;
`;

export const StyledTitle = styled(H3)`
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
