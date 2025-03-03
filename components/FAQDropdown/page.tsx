import { H1 } from '@/styles/text';
import React from 'react';

interface DropdownProps {
  question: string;
  answer: string;
}

export default function FAQDropdown({
  question,
  answer,
}: DropdownProps) {
  return (
    <div>
      <H1>{question}</H1>
      <H1>{answer}</H1>
    </div>
  )
}