import styled from 'styled-components';
import Icon from '@/components/Icon';
import COLORS from '@/styles/colors';

export const ProfilePictureContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f7f6f3;
  width: 100%;
  height: 11.875rem;
`;

export const PersonalInformationContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0 1.5rem;
  align-items: flex-start;
`;

export const GardenInformationContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 1.5rem;
`;

export const InfoField = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 100%;
`;

export const StyledEditCancelContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: blue;
  cursor: pointer;
`;

export const StyledSaveButton = styled.div`
  cursor: pointer;
  padding: 0 0.5rem;
`;

export const StyledCancelButton = styled.div`
  cursor: pointer;
`;
export const BluePencilIcon = styled(Icon)`
  filter: brightness(0) saturate(100%) invert(17%) sepia(87%) saturate(1478%)
    hue-rotate(192deg) brightness(92%) contrast(91%);
`;

export const StyledInput = styled.input`
  font-size: 0.875rem;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid ${COLORS.darkgray};
  width: auto;
  min-width: 120px;
  max-width: 130px;
  font-family: inherit;
  color: ${COLORS.darkgray};
  text-align: left;
  font-weight: 300;
  margin-bottom: 1rem;
`;

export const StyledP2 = styled.p<{ $fontWeight?: number; $color?: string }>`
  font-family: inherit;
  font-size: 0.877rem;
  font-weight: ${({ $fontWeight }) => $fontWeight};
  color: ${({ $color }) => $color};
  text-align: center;
  text-decoration: underline;
  text-decoration-color: ${({ $color }) => $color};
  paddingright: '0.2rem';
`;
