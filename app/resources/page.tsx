'use client';

import React, { useState } from 'react';
import { FAQDropdown } from '@/components/FAQDropdown';
import Icon from '@/components/Icon';
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

  function IconDisplay() {
    return (
      <>
        <div style={{ position: 'absolute', top: '3.5rem', left: '0rem' }}>
          <Icon type="cuteShovel" />
        </div>
        <div style={{ position: 'absolute', top: '13rem', left: '.5rem' }}>
          <Icon type="tomato" />
        </div>
        <div style={{ position: 'absolute', top: '15.1rem', left: '6rem' }}>
          <Icon type="carrotBottom" />
        </div>
        <div style={{ position: 'absolute', top: '14.3rem', left: '6.9rem' }}>
          <Icon type="carrotTop" />
        </div>
        <div style={{ position: 'absolute', top: '11.7rem', right: '0rem' }}>
          <Icon type="lechuga" />
        </div>
        <div style={{ position: 'absolute', top: '3.75rem', right: '1.5rem' }}>
          <Icon type="seedBag" />
        </div>
        <div style={{ position: 'absolute', top: '8.7rem', right: '4rem' }}>
          <Icon type="seed" />
        </div>
        <div style={{ position: 'absolute', top: '7.5rem', right: '2.5rem' }}>
          <Icon type="seedTilt" />
        </div>
        <div style={{ position: 'absolute', top: '8.7rem', right: '1.5rem' }}>
          <Icon type="seedTilt2" />
        </div>
      </>
    );
  }

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
        <Box $pl="1.5rem" $pr="1.5rem">
          <H4 $fontWeight={500} $color={COLORS.shrub}>
            Planting Guides
          </H4>
        </Box>
        <Box $p="1.5rem">
          <GuidesGrid>
            {userTypes.map(type => (
              <div key={type}>{PDFSmallPreview(type)}</div>
            ))}
          </GuidesGrid>
        </Box>
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
        <IconDisplay />
      </Flex>
      <Box>
        <MainBody />
      </Box>
    </PageContainer>
  );
}
