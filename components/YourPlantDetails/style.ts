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
  font-family: Lexend;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 300;
  //ok i know the font weight isnt technically matched with the figma dev tools but it looks more matched with the mismatched value
  line-height: normal;
`;
