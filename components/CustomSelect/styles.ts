import styled from 'styled-components';
import COLORS from '@/styles/colors';

export const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  padding: 1rem;
  border: 2px solid ${COLORS.lightgray};
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  height: 3rem;
  box-sizing: border-box;
  width: 100%;
`;

export const SelectedValue = styled.span`
  flex-grow: 1;
  font-size: 1rem;
  color: ${COLORS.shrub};
`;

export const DropdownIcon = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${COLORS.sprout};
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  svg {
    fill: ${COLORS.shrub};
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

export const Option = styled.div`
  padding: 0.5rem 1rem;
  background: #f9f9f9;
  cursor: pointer;
  color: ${COLORS.shrub};
  &:hover {
    background: ${COLORS.sprout};
  }
`;
