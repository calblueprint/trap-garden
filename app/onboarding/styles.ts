import styled from 'styled-components';
import COLORS from '@/styles/colors';

export const OnboardingContainer = styled.div`
  min-height: calc(100vh - 60px); // 60px is the hardcoded height of Header
  width: min(392px, 100vw);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px; // set left and right padding to 24px
  padding-top: 0px;
  padding-bottom: 100px;
  position: relative;
  justify-content: space-between;
  margin: auto; // center horizontally and vertically
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
  flex-direction: column;
  height: max(60px, max-content);
  align-items: center;
  justify-content: end;
  align-content: center;
  margin-bottom: 40px;
`;

export const ButtonDiv = styled.div`
  display: flex;
  width: 100%;
  bottom: 100px;
  position: absolute;
  justify-content: space-between;
  &:has(:only-child) {
    justify-content: flex-end;
  }
`;
