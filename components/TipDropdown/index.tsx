import React, { useState } from 'react';
import { IconType } from '@/lib/icons';
import COLORS from '@/styles/colors';
import { Flex } from '@/styles/containers';
import { P1, P3 } from '@/styles/text';
import { PlantTip } from '@/types/schema';
import { CategoryName, OrderedTipList, StyledIcon } from './styles';

interface TipDropdownProps {
  name: string;
  tips: PlantTip[];
  icon: IconType;
}

export function TipDropdown({ name, tips, icon }: TipDropdownProps) {
  const [expanded, setExpanded] = useState(false);
  return (
    <Flex
      $direction="column"
      $justify="center"
      $m="1.5rem"
      $mb="-.5rem"
      $border="1px solid var(--light-grey, #F0F0F0)"
      $radius="5px 5px 0px 0px"
      $align="start"
      $w="auto"
    >
      <Flex
        $direction="row"
        $justify="between"
        $align="center"
        $p="1rem"
        $gap="-.5rem"
        $background={
          expanded ? 'var(--white-grey, #F0F0F0)' : 'var(--white, #FFFFFF)'
        }
      >
        <Flex $gap="1rem" $direction="row" $align="center">
          <StyledIcon type={icon} />
          <Flex $direction="column" $gap=".25rem">
            <CategoryName $colorString={expanded ? COLORS.shrub : 'black'}>
              {name}
            </CategoryName>
            <P3 $color="var(--medium-grey, #888)">{tips.length} Tips</P3>
          </Flex>
        </Flex>
        <P1 onClick={() => setExpanded(!expanded)}>
          {!expanded ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="6"
              viewBox="0 0 11 6"
              fill="none"
            >
              <path
                d="M5.85387 6C6.08883 6 6.28367 5.91404 6.46705 5.73066L10.7822 1.31805C10.9312 1.16905 11 0.991404 11 0.77937C11 0.34957 10.6619 0 10.2321 0C10.0201 0 9.82521 0.0916905 9.67049 0.246418L5.8596 4.16619L2.03725 0.246418C1.88252 0.0916905 1.69341 0 1.47565 0C1.04585 0 0.702006 0.34957 0.702006 0.77937C0.702006 0.991404 0.776505 1.16905 0.925502 1.31805L5.24069 5.73066C5.42407 5.91977 5.61891 6 5.85387 6Z"
                fill="#888888"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="6"
              viewBox="0 0 11 6"
              fill="none"
              transform="rotate(180)"
            >
              <path
                d="M5.85387 6C6.08883 6 6.28367 5.91404 6.46705 5.73066L10.7822 1.31805C10.9312 1.16905 11 0.991404 11 0.77937C11 0.34957 10.6619 0 10.2321 0C10.0201 0 9.82521 0.0916905 9.67049 0.246418L5.8596 4.16619L2.03725 0.246418C1.88252 0.0916905 1.69341 0 1.47565 0C1.04585 0 0.702006 0.34957 0.702006 0.77937C0.702006 0.991404 0.776505 1.16905 0.925502 1.31805L5.24069 5.73066C5.42407 5.91977 5.61891 6 5.85387 6Z"
                fill="#888888"
              />
            </svg>
          )}
        </P1>
      </Flex>
      {expanded ? (
        <OrderedTipList>
          {tips.map(tip => (
            <li key={tip.id}>{tip.body_text}</li>
          ))}
        </OrderedTipList>
      ) : null}
    </Flex>
  );
}
