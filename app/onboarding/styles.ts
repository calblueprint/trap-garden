import styled from 'styled-components';

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
  border-radius: 8px;
  padding: 1.5rem;
  justify-content: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

export const QuestionDiv = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 60px;
  align-items: center;
  justify-content: end;
  align-content: center;
  margin-bottom: 40px;
`;

export const ButtonDiv = styled.div`
  display: flex;
  width: 100%;
  /* bottom: 103px; */
  /* position: absolute; */
  justify-content: space-between;
  &:has(:only-child) {
    justify-content: flex-end;
  }
`;
