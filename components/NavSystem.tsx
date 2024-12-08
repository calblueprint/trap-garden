'use client';

import { useState } from 'react';
import { useAuth } from '@/utils/AuthProvider';
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
      <NavColumn
        isOpen={isNavColumnOpen}
        onClose={() => setIsNavColumnOpen(false)}
      />
    </>
  );
}
