import styled from 'styled-components';

// import Icon from '@/components/Icon';
// import COLORS from '@/styles/colors';

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
// interface StyledEditCancelContainerProps {
//   $isEdit: boolean;
// }

// export const StyledEditCancelContainer = styled.div<StyledEditCancelContainerProps>`
//   display: flex;
//   align-items: center;
//   cursor: pointer;

//   span {
//     color: ${({ $isEdit }) => ($isEdit ? COLORS.blueLink : COLORS.errorRed)};
//     text-decoration: ${({ $isEdit }) => ($isEdit ? 'underline' : 'none')};
//     padding-right: ${({ $isEdit }) => ($isEdit ? '0' : '1.5rem')};
//   }

//   svg {
//     margin-left: 0.5rem;
//   }
// `;

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

// export const BluePencil = styled(Icon)`
//   &::after {
//     content: '';
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background-color: ${COLORS.blueLink}; /* Apply blue tint */
//     mix-blend-mode: multiply; /* Blend with the image */
//     opacity: 0.7; /* Adjust intensity */
//   }
// `;
