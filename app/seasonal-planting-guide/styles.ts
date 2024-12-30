import styled from 'styled-components';
import COLORS from '@/styles/colors';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  /* width: max-content; */
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2px 24px 0 24px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  position: relative;
  z-index: 2;
`;

//TODO: consolidate styling for Filters in view plants and seasonal planting guide
export const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  white-space: nowrap; // Prevent line break
  gap: 8px;
  margin-top: 12px;
  margin-bottom: 20px;
  padding-top: 1px;
  padding-bottom: 1px; // ensure filter border isn't cut off
  position: relative;
  overflow-x: auto;
  align-items: center;
`;

export const StateOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-grow: 1;
  background-color: ${COLORS.glimpse};
`;

export const PageTitle = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 8px;
  gap: 12px;
  align-items: center;
`;

export const VerticalSeparator = styled.div`
  height: 30px;
  width: 1px;
  background-color: ${COLORS.lightgray};
`;
