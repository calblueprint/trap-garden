'use client';

import React, { useState } from 'react';
import { Box, Flex } from '@/styles/containers';
import { H1 } from '@/styles/text';
import { HeaderButton, ViewSelection } from './styles';

export default function Resources() {
  const [viewingOption, setViewingOption] = useState<
    'FAQs' | 'Tips' | 'Guides'
  >('FAQs');

  function FAQDisplay() {
    return (<H1>FAQs</H1>)
  }

  function TipDisplay() {
    return (<H1>Tips</H1>)
  }

  function GuideDisplay() {
    return (<H1>Guides</H1>)
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
          < FAQDisplay />
        ) : viewingOption === 'Tips' ? (
          < TipDisplay />
        ) : (
          < GuideDisplay />
        )}
      </>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'white' }}>
      <Flex $justify="center" $align="center" $background="#1F5A2A" $h="15rem">
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
