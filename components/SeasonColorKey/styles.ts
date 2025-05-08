import styled from 'styled-components';
import { device } from '@/styles/breakpoints';
import { P3 } from '@/styles/text';

export const SeasonColorKeyContainer = styled.div`
  gap: .5rem;
  @media ${device.lg} {
    gap: 1.5rem;
  }
  width: max-content;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  }
`;

export const ColorKeyItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

export const ColorCell = styled.div<{ $color: string }>`
  width: 20px;
  height: 8px;
  background-color: ${({ $color }) => $color};
  border-radius: 5px;
`;

export const ComponentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  @media ${device.lg} {
    width: auto;
    align-items: center;
    padding: 2rem;
  }
`;

export const ColorItemLabel = styled(P3)`
  @media ${device.lg} {
    font-size: 16px;
  }
`;
