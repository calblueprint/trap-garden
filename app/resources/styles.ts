import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { H1, H4 } from '@/styles/text';

export const ViewSelection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 2rem;
  padding-bottom: 1rem;
`;

export const HeaderButton = styled.button<{
  $isCurrentMode: boolean;
}>`
  background: none;
  border: none;
  color: ${COLORS.shrub};
  font-family: inherit;
  cursor: pointer;
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  padding: 0.5rem;
  padding-top: 0rem;
  margin: 0.5rem;
  color: ${({ $isCurrentMode }) =>
    $isCurrentMode ? ` ${COLORS.shrub}` : `${COLORS.midgray}`};
  border-bottom: ${({ $isCurrentMode }) =>
    $isCurrentMode ? `solid ${COLORS.shrub}` : undefined};
`;

export const PageContainer = styled.div`
  minheight: '100vh';
  backgroundcolor: 'white';
`;

export const GuidesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-content: center;
  align-items: center;
  gap: 1rem;
  font-weight: 300;
  justify-content: center;
`;

export const AirbnbH1 = styled(H1)`
  font-family: 'AirbnbCereal_W_Md', sans-serif;
`;

export const AirbnbH4 = styled(H4)`
  font-family: 'AirbnbCereal_W_Md', sans-serif;
`;
