import React from 'react';
import COLORS from '@/styles/colors';
import { Flex } from '@/styles/containers';
import { P2 } from '@/styles/text';
import { TipCategory } from '@/types/schema';
import { tipCategoryHeaders, tipCategoryIcons } from '@/utils/helpers';
import Icon from '../Icon';
import { Card, Content, IconWrapper, Text, WhiteIconWrapper } from './styles';

// Define the prop type
interface TipCardProps {
  category: TipCategory;
  body_text: string;
}

// Styled components

export default function TipCard({ category, body_text }: TipCardProps) {
  return (
    <Flex $justify="center" $direction="column" $align="center" $w="100%">
      <IconWrapper>
        <WhiteIconWrapper>
          <Icon type={tipCategoryIcons[category]} />
        </WhiteIconWrapper>
      </IconWrapper>
      <Card>
        <P2 $color={COLORS.shrub}>{tipCategoryHeaders[category]}</P2>
        <Content>
          <Text>{body_text}</Text>
        </Content>
      </Card>
    </Flex>
  );
}
