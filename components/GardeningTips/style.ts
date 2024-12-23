import styled from 'styled-components';
import COLORS from '@/styles/colors';

export const Container = styled.div`
  background-color: ${COLORS.glimpse};
  padding: 16px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 6px;
`;

export const IconWrapper = styled.span`
  margin-right: 6px;
  color: ${COLORS.shrub};
`;

export const TipsList = styled.ol`
  list-style-position: inside;
`;
