'use client';

import React from 'react';
import styled from 'styled-components';

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, ...props }, ref) => {
  return (
    <button ref={ref} {...props}>
      {children}
    </button>
  );
});
Button.displayName = 'Button';

interface SmallRoundedButtonProps {
  $primaryColor?: string;
  $secondaryColor: string;
}

export const SmallRoundedButton = styled.button<SmallRoundedButtonProps>`
  padding: 10px 20px;
  border-radius: 50px;
  border: 2px solid ${({ $secondaryColor }) => $secondaryColor};
  background-color: ${({ $primaryColor }) =>
    $primaryColor ? $primaryColor : 'white'};
  color: ${({ $primaryColor, $secondaryColor }) =>
    $primaryColor ? 'white' : $secondaryColor};
  font-size: 16px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;

  &:hover {
    background-color: ${({ $primaryColor, $secondaryColor }) =>
      $primaryColor ? $primaryColor : $secondaryColor};
    color: ${({ $primaryColor, $secondaryColor }) =>
      $primaryColor ? $secondaryColor : 'white'};
    border-color: ${({ $secondaryColor }) => $secondaryColor};
  }
`;
