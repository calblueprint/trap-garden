import styled from 'styled-components';
import COLORS from '@/styles/colors';

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
  position: absolute;
  justify-content: space-between;
  &:has(:only-child) {
    justify-content: flex-end;
  }
`;
