import styled from 'styled-components';
import { SmallButton } from '@/components/Buttons';
import SearchBar from '@/components/SearchBar';
import { device } from '@/styles/breakpoints';
import COLORS from '@/styles/colors';
import { Box } from '@/styles/containers';
import { H1 } from '@/styles/text';

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  overflow-x: auto;
`;

export const TopRowContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-left: 24px;
  padding-right: 24px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

  @media ${device.lg} {
    gap: 32px;
  }
`;

export const HeaderButton = styled.button<{
  $isCurrentMode: boolean;
}>`
  background: none;
  border: none;
  color: ${COLORS.shrub};
  font-family: inherit;
  cursor: pointer;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: ${({ $isCurrentMode }) =>
    $isCurrentMode ? ` ${COLORS.shrub}` : `${COLORS.midgray}`};
  text-decoration: ${({ $isCurrentMode }) =>
    $isCurrentMode ? ` underline ` : `none`};

  @media ${device.lg} {
    font-size: 20px;
  }
`;

export const AddButtonContainer = styled.div`
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  margin-bottom: 10px;
`;

export const PlantGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 168px);
  gap: 8px;
  width: 100%;
  justify-content: space-around;

  // Mobile view: Two columns, equally spaced
  @media (max-width: 392px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${device.lg} {
    grid-template-columns: repeat(auto-fill, 240px);
    gap: 40px;
  }
`;

export const ViewSelection = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

export const NumberSelectedPlantsContainer = styled.div`
  background-color: ${COLORS.shrub};
  text-align: center;
  width: 100%;
  height: 16px;
  padding: 0;

  @media ${device.lg} {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 30px;
    padding: 4px;
  }
`;

export const NumberSelectedPlants = styled.p`
  font-size: 0.625rem;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  color: #fff;

  @media ${device.lg} {
    font-size: 18px;
  }
`;

export const InfoButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
`;

export const ResponsiveH1 = styled(H1)`
  @media ${device.lg} {
    font-family: AirbnbCereal_W_Md;
    font-size: 64px;
    font-weight: 500;
    margin-left: 50px;
`;

export const ResponsiveBox = styled(Box)`
  @media ${device.lg} {
    padding-left: 75px;
    padding-right: 75px;
  }
`;

export const SelectModeBox = styled(Box)`
  @media ${device.lg} {
    height: 60px;
  }
`;

export const ResponsiveSearchBarContainer = styled.div`
  display: block;

  @media ${device.lg} {
    display: none;
  }
`;

export const ResponsiveSearchBar = styled(SearchBar)`
  display: block;

  @media ${device.lg} {
    display: none;
  }
`;

export const FilterAndSearchBarContainer = styled.div`
  display: block;
  margin-bottom: 20px;

  @media ${device.lg} {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: 50px;
    padding-right: 50px;
  }
`;

export const DesktopOnlySearchBarContainer = styled.div`
  display: none;

  @media ${device.lg} {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 350px;
    height: 36px;
  }
`;

export const DesktopOnlySearchBar = styled(SearchBar)`
  display: none;

  @media ${device.lg} {
    display: block;
  }
`;

export const ResponsiveSmallButton = styled(SmallButton)`
  @media ${device.lg} {
    color: ${COLORS.midgray};
    text-decoration: underline;
    border: none;
    font-size: 16px !important;
    padding: 0px;
    font-weight: 400;
  }
`;
