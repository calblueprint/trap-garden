'use client';

import React from 'react';
import { Flex } from '@/styles/containers';
import {
  Container,
  HeaderText,
  InfoText,
  Logo,
  SocialMediaIcon,
} from './styles';

export default function Footer() {
  function SocialMediaRow() {
    return (
      <Flex $direction="row" $align="center" $justify="start" $gap="8px">
        <a
          href="https://www.facebook.com/thetrapgarden/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SocialMediaIcon type="facebook" />
        </a>
        <a
          href="https://www.instagram.com/trapgarden/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SocialMediaIcon type="instagram" />
        </a>
      </Flex>
    );
  }

  return (
    <Container>
      <Flex $direction="column" $align="start" $justify="center" $gap="16px">
        <HeaderText> Contact Us</HeaderText>
        <InfoText>Email: info@trapgarden.org</InfoText>
        <SocialMediaRow />
      </Flex>

      <Flex $direction="column" $align="end" $justify="center" $gap="12px">
        <Logo src="/images/grow-together-logo.png" alt="Grow Together Logo" />
        <InfoText style={{ textAlign: 'right' }}>
          ©2025 by Trap Garden
        </InfoText>
        <Flex $direction="row" $align="center" $justify="end" $gap="4px">
          <InfoText style={{ textAlign: 'right' }}>
            Non-Profit Web Design by Cal Blueprint
          </InfoText>
          <a
            href="https://calblueprint.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SocialMediaIcon type="bp" />
          </a>
        </Flex>
      </Flex>
    </Container>
  );
}
