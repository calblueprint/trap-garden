import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { H3 } from '@/styles/text';

// Image Header
export const ImgHeader = styled.div`
  display: flex;
  background-color: ${COLORS.glimpse};
  padding-bottom: 24px;
  position: relative;
  height: 220px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: absolute;
  top: 24px;
  padding-left: 24px;
  padding-right: 24px;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 1.125rem;
  cursor: pointer;
  padding: 0;
`;

export const PlantImage = styled.img`
  align-self: center;
  max-width: 150px;
  height: auto;
  margin: 9px auto 0;
  display: block;
`;

// Content
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
`;

// Title Section
export const PlantName = styled(H3)`
  text-align: center;
  font-weight: 400;
`;

export const NameWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const ComponentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;
