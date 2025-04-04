'use client';

import React, { useEffect, useState } from 'react';
import { getAllPlantTips } from '@/api/supabase/queries/resources';
import { FAQDropdown } from '@/components/FAQDropdown';
import { TipDropdown } from '@/components/TipDropdown';
import COLORS from '@/styles/colors';
import { Box, Flex } from '@/styles/containers';
import { H1, H4 } from '@/styles/text';
import { PlantTip } from '@/types/schema';
import {
  tipCategories,
  tipCategoryHeaders,
  tipCategoryIcons,
} from '@/utils/helpers';
import { HeaderButton, ViewSelection } from './styles';

export default function Resources() {
  const [viewingOption, setViewingOption] = useState<
    'FAQs' | 'Tips' | 'Guides'
  >('FAQs');

  //placeholder query, replace
  const dummy = [
    { question: 'What are the blah blah blah', answer: 'Beep boop beep boop' },
    { question: 'Why does beep boop bop', answer: 'Vroommmmm' },
  ];

  function TipDisplay() {
    const [fullTipList, setFullTipList] = useState<PlantTip[]>([]);
    useEffect(() => {
      (async () => {
        const tipList = await getAllPlantTips();
        setFullTipList(tipList);
      })();
    }, []);
    return (
      <>
        <Box $pl="1.5rem" $mb=".5rem">
          <H4 $fontWeight={500} $color={COLORS.shrub}>
            Gardening Tips
          </H4>
        </Box>
        <Box $mb="2rem">
          {tipCategories.map(cat => (
            <TipDropdown
              name={tipCategoryHeaders[cat]}
              tips={fullTipList.filter(tip => tip.category === cat)}
              icon={tipCategoryIcons[cat]}
              key={cat}
            />
          ))}
        </Box>
      </>
    );
  }
  function FAQDisplay() {
    return (
      <div>
        <Box $ml="1.5rem" $mb="-1rem">
          <H4 $fontWeight={500} $color="#1F5A2A">
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

  function GuideDisplay() {
    return <H1>Guides</H1>;
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
    <div style={{ minHeight: '100vh', backgroundColor: 'white' }}>
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
    </div>
  );
}
