import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { P3 } from '@/styles/text';

export const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  position: relative;
`;

export const IconWrapper = styled.div`
  position: absolute;
  left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none; /* Prevent the icon from blocking input clicks */
`;

export const SearchBarInput = styled(P3).attrs({ as: 'input', type: 'search' })`
  padding: 8px 8px 8px 32px;
  border: none;
  border-radius: 16px;
  background-color: #f7f7f7;
  width: 100%;
  color: ${COLORS.midgray};
  font-family: inherit;
  font-size: 16px;
  height: 36px;
`;
