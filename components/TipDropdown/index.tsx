import React, { useState } from 'react';
import { IconType } from '@/lib/icons';
import COLORS from '@/styles/colors';
import { Flex } from '@/styles/containers';
import { P3 } from '@/styles/text';
import { PlantTip } from '@/types/schema';
import Icon from '../Icon';
import { CategoryName, Dropdown, OrderedTipList, StyledIcon } from './styles';

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
      $mt="0.75rem"
      $mb="0px"
      $border={`1px solid ${COLORS.lightgray}`}
      $radius="5px 5px 0px 0px"
      $align="start"
      $w="auto"
    >
      <Flex
        $direction="row"
        $justify="between"
        $align="center"
        $p="1rem"
        $background={expanded ? '#F0F0F0' : '#FFFFFF'}
      >
        <Flex $gap="1rem" $direction="row" $align="center">
          <StyledIcon type={icon} />
          <Flex $direction="column" $gap=".25rem">
            <CategoryName $colorString={expanded ? COLORS.shrub : 'black'}>
              {name}
            </CategoryName>
            <P3 $color={COLORS.midgray}>{tips.length} Tips</P3>
          </Flex>
        </Flex>
        <Dropdown onClick={() => setExpanded(!expanded)}>
          {!expanded ? (
            <Icon type="dropdownArrowDown" />
          ) : (
            <Icon type="dropdownArrowUp" />
          )}
        </Dropdown>
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
