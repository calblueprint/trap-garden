import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { P1, P2 } from '@/styles/text';

export const OnboardingContainer = styled.div`
  min-height: calc(100vh - 60px); // 60px is the hardcoded height of Header
  width: min(392px, 100vw);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px; // set left and right padding to 24px
  padding-top: 0px;
  padding-bottom: 100px;
  position: relative;
  margin: auto;
`;
export const ContentContainer = styled.div`
  width: 100%;
  max-width: 500px;
  background-color: white;
  border-radius: 4px;
  border: 1px solid ${COLORS.lightgray};
  padding: 24px;
  padding-top: 32px;
  justify-content: center;
`;

export const QuestionDiv = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 60px;
  align-items: center;
  /* align-items: flex-end; */ // this would match designs
  margin-bottom: 40px;
  text-align: center;
`;

export const ButtonDiv = styled.div`
  padding: 0 24px;
  display: flex;
  width: 100%;
  bottom: 100px;
  z-index: 10;
  position: absolute;
  justify-content: space-between;
  &:has(:only-child) {
    justify-content: flex-end;
  }
`;

export const PDFPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: fit-content;
  margin: 0 auto;
`;

export const PDFButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  gap: 10px;
  background: white;
  border-radius: 5px;
  height: 27px;
  z-index: 1000;
  top: 0;
  margin-top: 8px;
  width: 84px; /* ✅ restrict to width of PDF wrapper */
`;

export const PDFButton = styled.button<{ $showCursor: boolean }>`
  all: unset;
  display: flex;
  align-items: center;
  cursor: ${({ $showCursor }) => ($showCursor ? 'pointer' : 'not-allowed')};
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const StyledLabel = styled(P2).attrs({ as: 'label' })`
  margin-bottom: 0.25rem;
`;

export const StyledInput = styled(P1).attrs({ as: 'input' })<{
  $error?: boolean;
}>`
  padding: 0.75rem;
  border: 0.0625rem solid #ccc;
  border: 1px solid ${({ $error }) => ($error ? COLORS.errorRed : '#ccc')};
  border-radius: 0.3125rem;
  font-family: inherit; /* Inherit font-family from P2 */
  margin-bottom: 0.25rem;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: ${({ $error }) => ($error ? COLORS.errorRed : COLORS.shrub)};
    outline: none;
  }
`;

export const PdfContainer = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  border-radius: 5px;
  border: 1px solid var(--light-grey, #ddd);
`;
