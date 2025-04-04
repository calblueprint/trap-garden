import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { P2 } from '@/styles/text';

export const SelectContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 0.75rem;
  border: 1px solid ${COLORS.lightgray};
  border-radius: 0.3125rem;
  cursor: pointer;
  height: 2.75rem;
  box-sizing: border-box;
  width: 100%;
`;

export const NoBorderContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  cursor: pointer;
`;

export const NoBorderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const HorizontalLine = styled.div`
  width: 100%;
  height: 0.0625rem;
  background: ${COLORS.lightgray};
  margin-top: 0.25rem;
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

export const DropdownIconWrapper = styled.div`
  width: 1rem;
  height: 0.5rem;
  margin-bottom: 0.625rem;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const OptionsContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid ${COLORS.lightgray};
  border-radius: 0.3125rem;
  box-shadow: 0px 0.125rem 0.3125rem rgba(0, 0, 0, 0.1);
  margin-top: 0.3125rem;
  z-index: 10;
  width: 100%;
`;

export const Option = styled(P2).attrs({ as: 'div' })`
  padding: 0.75rem;
  cursor: pointer;
  color: ${COLORS.shrub};
  &:hover {
    background: ${COLORS.sproutLight};
  }
`;
