'use client';

import React, { useState } from 'react';
import { FAQDropdown } from '@/components/FAQDropdown';
import PDFSmallPreview from '@/components/PDFSmallPreview';
import COLORS from '@/styles/colors';
import { Box, Flex } from '@/styles/containers';
import { H1, H4 } from '@/styles/text';
import { UserTypeEnum } from '@/types/schema';
import {
  GuidesGrid,
  HeaderButton,
  PageContainer,
  ViewSelection,
} from './styles';

export default function Resources() {
  const [viewingOption, setViewingOption] = useState<
    'FAQs' | 'Tips' | 'Guides'
  >('FAQs');

  //placeholder query, replace
  const dummy = [
    {
      question: 'How do I choose which plant to plant?',
      answer:
        'Choose a plant based on your climate, sunlight, soil type, water needs, purpose, space, and maintenance level.',
    },
    {
      question: 'How do I evaluate my soil quality?',
      answer:
        'You can evaluate your soil quality by observing its texture, color, and drainage, and by conducting a soil test to measure nutrient levels and pH.',
    },
  ];

  function FAQDisplay() {
    return (
      <div>
        <Box $pl="1.5rem" $mb="-1rem">
          <H4 $fontWeight={500} $color={COLORS.shrub}>
            FAQs
          </H4>
        </Box>

        {dummy.map((item, index) => (
          <FAQDropdown
            key={index}
            question={item.question}
            answer={item.answer}
          />
        ))}
      </div>
    );
  }

  function TipDisplay() {
    return <H1>Tips</H1>;
  }

  function GuideDisplay() {
    const userTypes: UserTypeEnum[] = ['SCHOOL', 'INDIV', 'ORG'];
    return (
      <>
        <Box $pl="1.5rem">
          <H4 $fontWeight={500} $color={COLORS.shrub}>
            Planting Guides
          </H4>
        </Box>
        <GuidesGrid>
          {userTypes.map(type => (
            <div key={type}>{PDFSmallPreview(type)}</div>
          ))}
        </GuidesGrid>
      </>
    );
  }

  function MainBody() {
    return (
      <>
        <Flex $justify="center" $p="12px">
          <ViewSelection>
            <HeaderButton
              $isCurrentMode={viewingOption === 'FAQs'}
              onClick={() => setViewingOption('FAQs')}
            >
              FAQs
            </HeaderButton>
            <HeaderButton
              $isCurrentMode={viewingOption === 'Tips'}
              onClick={() => setViewingOption('Tips')}
            >
              Tips
            </HeaderButton>
            <HeaderButton
              $isCurrentMode={viewingOption === 'Guides'}
              onClick={() => setViewingOption('Guides')}
            >
              Guides
            </HeaderButton>
          </ViewSelection>
        </Flex>

        {viewingOption === 'FAQs' ? (
          <FAQDisplay />
        ) : viewingOption === 'Tips' ? (
          <TipDisplay />
        ) : (
          <GuideDisplay />
        )}
      </>
    );
  }

  return (
    <PageContainer>
      <Flex
        $justify="center"
        $align="center"
        $background={COLORS.shrub}
        $h="15rem"
      >
        <H1 $color="white" $fontWeight={500}>
          Resource Page
        </H1>
      </Flex>
      <Box>
        <MainBody />
      </Box>
    </PageContainer>
  );
}
