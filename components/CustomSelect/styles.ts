import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { P2 } from '@/styles/text';

export const SelectContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 12px;
  border: 1px solid ${COLORS.lightgray};
  border-radius: 5px;
  cursor: pointer;
  height: 44px;
  box-sizing: border-box;
  width: 100%;
`;

export const DropdownIcon = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

export const OptionsContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid ${COLORS.lightgray};
  border-radius: 5px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  margin-top: 5px;
  z-index: 10;
  width: 100%;
`;

export const Option = styled(P2).attrs({ as: 'div' })`
  padding: 12px;
  cursor: pointer;
  /* background: ${COLORS.glimpse}; */
  color: ${COLORS.shrub};
  &:hover {
    background: ${COLORS.sproutLight};
  }
`;
