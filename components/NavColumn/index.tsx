import React from 'react';
import Link from 'next/link';
import CONFIG from '@/lib/configs';
import Icon from '../Icon';
import {
  HamburgerButton,
  HamburgerIcon,
  NavColumnContainer,
  NavColumnHeader,
  Overlay,
} from './styles';

interface NavColumnProps {
  isOpen: boolean;
  onClose: () => void;
}

type NavLink = {
  name: string;
  path: string;
};

const navLinks: NavLink[] = [
  { name: 'View Plants', path: CONFIG.viewPlants },
  { name: 'Planting Timeline', path: CONFIG.plantingTimeline },
];

export default function NavColumn({ isOpen, onClose }: NavColumnProps) {
  return (
    <>
      {isOpen && (
        <>
          <Overlay onClick={onClose} isOpen={isOpen} />
          <NavColumnContainer>
            <NavColumnHeader>
              <div>
                {/* empty whitespace for positioning logo and hamburger */}
              </div>
              <Link onClick={onClose} href="/">
                <Icon type="logo" />
              </Link>
              <HamburgerButton onClick={onClose}>
                <HamburgerIcon type="hamburger" />
              </HamburgerButton>
            </NavColumnHeader>
            {navLinks.map((link: NavLink) => (
              <Link onClick={onClose} href={link.path}>
                {link.name}
              </Link>
            ))}
          </NavColumnContainer>
        </>
      )}
    </>
  );
}
