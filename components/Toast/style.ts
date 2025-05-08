import styled, { createGlobalStyle } from 'styled-components';
import COLORS from '@/styles/colors';

export const ToastGlobalStyle = createGlobalStyle`
  .Toastify__toast {
    border-radius: 8px;
    background: ${COLORS.lightGreen};
    border: 0.5px solid;
    border-color: ${COLORS.shrub};
    color: black;
    height: 20px;
    font-weight: 300;
    width: 350px;
    font-size: 14px;
    min-height: 50px; //override default min-height
    height: 50px;
    padding: 0 20px 0 0;
    font-family: 'Lexend', sans-serif;
  }

  .Toastify__toast-body {
    padding: 0; 
    margin: 0;
    width: 100%;
  }

  .Toastify__progress-bar {
    background: ${COLORS.shrub};
    height: 100%;
    margin: 0;
    border-bottom-left-radius: 0px;
  }

  .Toastify__progress-bar--bg {
    background: ${COLORS.shrub};  
  }
`;

export const StyledToast = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: black;
  background: transparent;
  width: 100%;
`;

export const UndoButton = styled.button`
  background: transparent;
  border: none;
  color: ${COLORS.blueLink};
  font-weight: bold;
  cursor: pointer;
  font-size: 12px;
  font-weight: 300;
  font-family: 'Lexend', sans-serif;
`;

export const GreenDiv = styled.div`
  background: ${COLORS.shrub};
  width: 8.5px;
  height: 100%;
  border-radius: 6px 0px 0px 6px;
  margin-right: 8px;
  z-index: 100;
`;
