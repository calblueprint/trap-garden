'use client';

import { useState } from 'react';
import Header from './Header';
import NavColumn from './NavColumn';

export default function NavSystem() {
  const [isNavColumnOpen, setIsNavColumnOpen] = useState(false);

  const toggleNavColumn = () => {
    setIsNavColumnOpen(!isNavColumnOpen);
  };

  return (
    <>
      <Header toggleNavColumn={toggleNavColumn} />
      <NavColumn isOpen={isNavColumnOpen} />
    </>
  );
}
