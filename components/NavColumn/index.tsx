import React from 'react';
import { NavColumnContainer } from './styles';

interface NavColumnProps {
  isOpen: boolean;
}

type NavLink = {
  name: string;
  path: string;
};

export default function NavColumn({ isOpen }: NavColumnProps) {
  return <>{isOpen && <NavColumnContainer>NavColumn</NavColumnContainer>}</>;
}
