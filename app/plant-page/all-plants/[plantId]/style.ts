import styled from 'styled-components';
import COLORS from '@/styles/colors';

export const Container = styled.div`
  padding: 20px;
`;

export const Header = styled.div`
  background-color: ${COLORS.glimpse};
  margin: -28px -28px 24px -28px;
  padding: 12px 20px;
  padding-bottom: 27px;
`;

export const HeaderContent = styled.div`
  position: relative;
  max-width: 100%;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-top: 24px;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 1.125rem;
  cursor: pointer;
  padding: 0;
`;

export const PlantImage = styled.img`
  max-width: 150px;
  height: auto;
  margin: 9px auto 0;
  display: block;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const NameWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8.5px;
`;

export const PlantName = styled.h1`
  text-align: center;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 0;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2px;
  justify-content: space-between;
`;
export const AddPlant = styled.button`
  background-color: ${COLORS.shrub};
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.75rem;
  font-style: inherit;
  font-weight: 400;
  line-height: normal;
`;
