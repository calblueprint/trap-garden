import styled from 'styled-components';

export const OnboardingContainer = styled.div`
  min-height: 100vh;
  width: min(392px, 100vw);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  position: relative;
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
  height: 6.875rem;
  align-items: center;
  justify-content: center;
  align-content: center;
  margin-bottom: 40px;
`;

export const ButtonDiv = styled.div`
  display: flex;
  padding-left: 10px;
  padding-right: 10px;
  width: 100%;
  bottom: 103px;
  position: absolute;
  justify-content: space-between;
  &:has(:only-child) {
    justify-content: flex-end;
  }
`;
