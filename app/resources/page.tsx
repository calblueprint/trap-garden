'use client';

import React, { useEffect, useState } from 'react';
import { getAllPlantTips } from '@/api/supabase/queries/resources';
import { FAQDropdown } from '@/components/FAQDropdown';
import { TipDropdown } from '@/components/TipDropdown';
import { IconType } from '@/lib/icons';
import COLORS from '@/styles/colors';
import { Box, Flex } from '@/styles/containers';
import { H1, H4 } from '@/styles/text';
import { HeaderButton, PageContainer, ViewSelection } from './styles';
import { PlantTip } from '@/types/schema';

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

  function TipDisplay() {
    const categories = [
      'Water Management',
      'Helpful Flowers for Your Garden',
      'Mulching',
      'Harvesting',
      'Planting',
      'Weeding',
    ];
    // Map category values to headers
    const categoryHeaders: Record<string, string> = {
      'Helpful Flowers for Your Garden': 'Helpful Flowers',
      'Water Management': 'Water Management',
      Mulching: 'Mulching',
      Harvesting: 'Harvesting',
      Planting: 'Planting',
      Weeding: 'Weeding',
    };

    //Map category values to icon name
    const categoryIcons: Record<string, IconType> = {
      'Helpful Flowers for Your Garden': 'flower',
      'Water Management': 'wateringCan',
      Mulching: 'lawnCare',
      Harvesting: 'harvestingBasket',
      Planting: 'plantHand',
      Weeding: 'spade',
    };
    const [fullList, setFullList] = useState<PlantTip[]>([]);
    useEffect(() => {
      (async () => {
        const tipList = await getAllPlantTips();
        setFullList(tipList);
      })();
    });
    return (
      <>
        <Box $ml="1.5rem" $mb=".5rem">
          <H4 $fontWeight={500} $color="#1F5A2A">
            Gardening Tips
          </H4>
        </Box>
        <Box $mb="2rem">
          {categories.map(cat => (
            <TipDropdown
              name={categoryHeaders[cat]}
              tips={fullList.filter(tip => tip.category === cat)}
              icon={categoryIcons[cat]}
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
