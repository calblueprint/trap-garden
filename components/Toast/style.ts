import styled, { createGlobalStyle } from 'styled-components';
import COLORS from '@/styles/colors';

export const ToastGlobalStyle = createGlobalStyle`
  .Toastify__toast {
    border-radius: 8px;
    background: #EDEFDB; //got this color from figma maybe should add to COLORS
    border: 0.5px solid;
    border-left: 8.5px solid;
    border-color: ${COLORS.shrub};
    color: black;
    height: 20px;
    font-weight: 300;
    width: 350px;
    font-size: 14px;
    min-height: 50px; //override default min-height
    height: 50px;
    padding: 0 20px 0 20px;
    
  }

  .Toastify__toast-body {
    padding: 0; 
    margin: 0;
    width: 100%;
    
  }

  .Toastify__progress-bar {
    background: ${COLORS.shrub};
    height: 4px;
    margin: 0;
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
  color: #1f7a8c;
  font-weight: bold;
  cursor: pointer;
  font-size: 12px;
  font-weight: 300;
`;
