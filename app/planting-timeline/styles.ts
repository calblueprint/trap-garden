import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { H1 } from '@/styles/text';
import { device } from '../../styles/breakpoints';

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
  padding-left: 2rem;
  padding-right: 2rem;
`;

//TODO: consolidate styling for Filters in view plants and seasonal planting guide
export const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  margin-top: 12px;
  margin-bottom: 20px;
  position: relative;
  overflow-x: auto;
  align-items: center;
  @media ${device.lg} {
    gap: 20px;
    margin: 0px;
  }
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
  flex-shrink: 0;
`;

export const SearchBarWrapper = styled.div`
  @media ${device.lg} {
    display: none;
  }
`;

export const DesktopSearchContainer = styled.div`
  display: none;
  @media ${device.lg} {
    margin-left: 3rem;
    margin-right: 0rem;
    display: flex;
    width: 21rem;
    align-items: center;
    justify-content: center;
    margin-bottom: 6px;
  }
`;

export const ShowPlantsButton = styled.div<{
  $primaryColor: string | undefined;
  $secondaryColor: string | undefined;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.5px solid;
  border-color: ${({ $secondaryColor, $primaryColor }) =>
    $primaryColor ? 'transparent' : $secondaryColor || 'white'};
  background: ${({ $primaryColor }) => $primaryColor || 'transparent'};
  color: ${({ $primaryColor, $secondaryColor }) =>
    $primaryColor ? 'white' : $secondaryColor};

  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;

  &:hover {
    cursor: pointer;
    /* background-color: ${({ $primaryColor, $secondaryColor }) =>
      $primaryColor ? $primaryColor : $secondaryColor};
    color: ${({ $primaryColor, $secondaryColor }) =>
      $primaryColor ? $secondaryColor : 'white'};
    border-color: ${({ $secondaryColor }) => $secondaryColor}; */
  }
  border-radius: 20px;
  height: auto;
  min-width: 60px;
  flex-shrink: 0; // to prevent Clear Filters from collapsing on overflow
  padding: 8px 14px;
  gap: 8px;
`;

export const WhiteIcon = styled.div`
  display: flex;
  align-items: center;
  svg image {
    filter: brightness(0) saturate(100%) invert(100%);
  }
`;

export const Title = styled(H1)<{ $color: string }>`
  font-size: 2rem;
  color: ${({ $color }) => $color || COLORS.black};
  @media ${device.lg} {
    font-size: 4rem;
    font-weight: 500;
    font-family: AirbnbCereal_W_Md;
    margin-bottom: 12px;
  }
`;

export const FilterText = styled.div<{ $color: string; $underline?: boolean }>`
  font-size: 0.75rem;
  @media ${device.lg} {
    font-size: 16px;
  }
  color: ${({ $color }) => $color || COLORS.black};
  &:hover {
    cursor: pointer;
  }
  text-decoration: ${({ $underline }) => ($underline ? 'underline' : 'none')};
  text-wrap: nowrap;
`;

export const FilterRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: nowrap;
  align-items: center;

  @media ${device.lg} {
    margin-bottom: 20px;
  }
`;
