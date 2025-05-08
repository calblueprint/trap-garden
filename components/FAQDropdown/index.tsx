import React, { useState } from 'react';
import { Flex } from '@/styles/containers';
import Icon from '../Icon';
import { Answer, Dropdown, HorizontalLine, Question } from './styles';

interface FAQDropdownProps {
  question: string;
  answer: string;
}

export function FAQDropdown({ question, answer }: FAQDropdownProps) {
  const [expanded, setExpanded] = useState(false);
  return (
    <Flex
      $direction="column"
      $gap="1.5rem"
      $justify="center"
      $pl="1.5rem"
      $pr="1.5rem"
      $mb="1.5rem"
    >
      <HorizontalLine />
      <Flex $direction="row" $justify="between" $align="center">
        <Question>{question}</Question>
        <Dropdown onClick={() => setExpanded(!expanded)}>
          {!expanded ? (
            <Icon type="dropdownArrowDown"></Icon>
          ) : (
            <Icon type="dropdownArrowUp"></Icon>
          )}
        </Dropdown>
      </Flex>
      {expanded ? <Answer>{answer}</Answer> : null}
    </Flex>
  );
}
