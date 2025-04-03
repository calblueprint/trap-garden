import React, { useState } from 'react';
import { Flex } from '@/styles/containers';
import Icon from '../Icon';
import { Answer, HorizontalLine, Question } from './styles';

interface DropdownProps {
  question: string;
  answer: string;
}

export function FAQDropdown({ question, answer }: DropdownProps) {
  const [expanded, setExpanded] = useState(false);
  return (
    <Flex
      $direction="column"
      $gap="1.5rem"
      $justify="center"
      $pl="1.5rem"
      $pr="1.5rem"
      $mt="1.5rem"
    >
      <HorizontalLine />
      <Flex
        $direction="row"
        $justify="between"
        $align="center"
        onClick={() => setExpanded(!expanded)}
      >
        <Question>{question}</Question>
        {!expanded ? (
          <Icon type="dropdownArrowDown"></Icon>
        ) : (
          <Icon type="dropdownArrowUp"></Icon>
        )}
      </Flex>
      {expanded ? <Answer>{answer}</Answer> : null}
    </Flex>
  );
}
