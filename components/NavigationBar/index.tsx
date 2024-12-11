// NavigationBar.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { Plant } from '@/types/schema';

interface NavigationBarProps {
  currentIndex: number;
  totalCount: number;
  plantsToAdd: Plant[];
  onPrev: () => void;
  onNext: () => void;
  onSelectPlant: (index: number) => void;
}

const NavigationBarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
`;

const NavigationButton = styled.button`
  background-color: white;
  color: ${COLORS.midgray};
  border: 1px solid ${COLORS.midgray};
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  height: 30px;
  width: 29px;

  &:first-child {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right: none;
  }

  &:last-child {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left: none;
  }

  &:not(:first-child) {
    border-left: none;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const DropdownToggle = styled.button`
  height: 30px;
  background-color: white;
  color: ${COLORS.midgray};
  border: 1px solid #888;
  font-size: 14px;
  cursor: pointer;
  width: 85px;
`;

const DropdownContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  border: 1px solid ${COLORS.midgray};
  border-radius: 4px;
  padding: 8px 0;
  z-index: 1;
  min-width: 200px;
`;
const DropdownItem = styled.button`
  display: block;
  width: 100%;
  padding: 8px 16px;
  text-align: left;
  background-color: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${COLORS.lightgray};
  }
`;

const NavigationBar: React.FC<NavigationBarProps> = ({
  currentIndex,
  totalCount,
  plantsToAdd,
  onPrev,
  onNext,
  onSelectPlant,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  const handlePlantSelection = (index: number) => {
    onSelectPlant(index);
    setIsDropdownOpen(false);
  };

  return (
    <NavigationBarContainer>
      <NavigationButton
        type="button"
        onClick={onPrev}
        disabled={currentIndex === 1}
      >
        {'<'}
      </NavigationButton>
      <DropdownContainer>
        <DropdownToggle onClick={toggleDropdown}>
          {currentIndex}/{plantsToAdd.length}
        </DropdownToggle>
        {isDropdownOpen && (
          <DropdownMenu>
            {plantsToAdd.map((plant, index) => (
              <DropdownItem
                key={plant.id}
                onClick={() => handlePlantSelection(index + 1)}
              >
                {plant.plant_name}
              </DropdownItem>
            ))}
          </DropdownMenu>
        )}
      </DropdownContainer>
      <NavigationButton
        type="button"
        onClick={onNext}
        disabled={currentIndex === totalCount}
      >
        {'>'}
      </NavigationButton>
    </NavigationBarContainer>
  );
};

export default NavigationBar;
