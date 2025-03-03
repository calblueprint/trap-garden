import React from 'react';
import { H1 } from '@/styles/text';

interface DropdownProps {
  question: string;
  answer: string;
}

export function FAQDropdown({ question, answer }: DropdownProps) {
  return (
    <div>
      <H1>{question}</H1>
      <H1>{answer}</H1>
    </div>
  );
}
