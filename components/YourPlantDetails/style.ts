import styled from 'styled-components';
import COLORS from '@/styles/colors';

export const Container = styled.div`
  padding: 16px;
  background-color: ${COLORS.glimpse};
  border-radius: 5px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;
export const HarvestButton = styled.button`
  margin-top: 10px;
  width: 145px;
  height: 32px;
  border-radius: 5px;
  background: ${COLORS.shrub};
  border: none;
  color: #fff;
  text-align: center;
  font-family: inherit;
  font-size: 12px;
  font-weight: 300;

  &:hover {
    cursor: pointer;
  }
`;
