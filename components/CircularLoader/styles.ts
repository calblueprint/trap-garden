import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const SpinnerWrap = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Spinner = styled.div`
  width: 80px;
  height: 80px;
  border: 4px solid #d3d3d3;
  border-top-color: #000;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;
