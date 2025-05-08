'use client';

import React, { useEffect, useState } from 'react';
import { getAllFAQs, getAllPlantTips } from '@/api/supabase/queries/resources';
import { FAQDropdown } from '@/components/FAQDropdown';
import Icon from '@/components/Icon';
import PDFSmallPreview from '@/components/PDFSmallPreview';
import { TipDropdown } from '@/components/TipDropdown';
import COLORS from '@/styles/colors';
import { Box, Flex } from '@/styles/containers';
import { H1 } from '@/styles/text';
import { FAQ, PlantTip, UserTypeEnum } from '@/types/schema';
import {
  tipCategories,
  tipCategoryHeaders,
  tipCategoryIcons,
} from '@/utils/helpers';
import {
  AirbnbH1,
  AirbnbH4,
  GuidesGrid,
  HeaderButton,
  PageContainer,
  ViewSelection,
} from './styles';

export default function Resources() {
  const [viewingOption, setViewingOption] = useState<
    'FAQs' | 'Tips' | 'Guides'
  >('FAQs');

  const [fullTipList, setFullTipList] = useState<PlantTip[]>([]);
  const [FAQlist, setFAQList] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const tipList = await getAllPlantTips();
      setFullTipList(tipList);
      const faqs = await getAllFAQs();
      setFAQList(faqs);
      setLoading(false);
    })();
  }, []);

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

  function TipDisplay() {
    return loading ? (
      <Flex $justify="center" $align="center" $h="100%">
        <H1 $color="black">Loading...</H1>
      </Flex>
    ) : (
      <>
        <Box $pl="1.5rem" $mb="1rem">
          <AirbnbH4 $fontWeight={500} $color={COLORS.shrub}>
            Gardening Tips
          </AirbnbH4>
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
    return loading ? (
      <Flex $justify="center" $align="center" $h="100%">
        <H1 $color="black">Loading...</H1>
      </Flex>
    ) : (
      <Box $pb="2rem">
        <Box $pl="1.5rem" $mb="1rem">
          <AirbnbH4 $fontWeight={500} $color={COLORS.shrub}>
            FAQs
          </AirbnbH4>
        </Box>

        {FAQlist.map((item, index) => (
          <FAQDropdown
            key={index}
            question={item.question}
            answer={item.answer}
          />
        ))}
      </Box>
    );
  }

  function GuideDisplay() {
    const userTypes: UserTypeEnum[] = ['SCHOOL', 'INDIV', 'ORG'];
    return (
      <>
        <Box $pl="1.5rem" $pr="1.5rem">
          <AirbnbH4 $fontWeight={500} $color={COLORS.shrub}>
            Planting Guides
          </AirbnbH4>
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
        <AirbnbH1 $color="white" $fontWeight={500}>
          Resources Page
        </AirbnbH1>
        <IconDisplay />
      </Flex>
      <Box>
        <MainBody />
      </Box>
    </PageContainer>
  );
}
