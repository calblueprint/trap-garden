'use client';

import { useRouter } from 'next/navigation';
import { BigButton } from '@/components/Buttons';
import CONFIG from '@/lib/configs';
import COLORS from '@/styles/colors';
import { Flex } from '@/styles/containers';
import {
  ButtonContainer,
  Container,
  GreenDiv,
  Image,
  ResponsiveH3,
  ResponsiveP1,
  ResponsiveP2,
  StyledIcon,
  Title,
  WhiteDiv,
} from './page.style';

export default function Home() {
  const router = useRouter();

  return (
    <Container>
      <WhiteDiv>
        <Flex $direction="column" $gap="8px" $justify="center" $align="center">
          <StyledIcon type="plant" />
          <Title $color={COLORS.shrub} $align="center">
            Grow more than just plants
          </Title>
        </Flex>

        <ResponsiveP1 $color={COLORS.darkgray} $align="center">
          Grow Together helps you decide what to grow based on your state and
          provides personalized care tips for your plants throughout the growing
          season.
        </ResponsiveP1>

        <ButtonContainer>
          <BigButton
            $primaryColor={COLORS.shrub}
            onClick={() => router.push(CONFIG.signup)}
          >
            Sign Up
          </BigButton>
          <BigButton
            $secondaryColor={COLORS.shrub}
            onClick={() => router.push(CONFIG.login)}
          >
            Log In
          </BigButton>
        </ButtonContainer>
      </WhiteDiv>
      <GreenDiv>
        <Flex
          $direction="column"
          $gap="12px"
          $justify="start"
          $align="start"
          $mb="50px"
        >
          <ResponsiveP2 $color={COLORS.sprout} $align="left">
            GROW WITH CARE
          </ResponsiveP2>
          <ResponsiveH3 $color="white">
            Track & Care for Your Plants
          </ResponsiveH3>
          <ResponsiveP1 $color="white" $align="left">
            Choose what to grow based on your location and receive tips on how
            to care for your plants.
          </ResponsiveP1>
        </Flex>

        <Flex
          $direction="row"
          $align="end"
          $justify="center"
          $px="20px"
          $w="100%"
        >
          <Image
            src="/images/phone-2.png"
            alt="Phone screen displaying the Grow Together app"
            style={{ zIndex: 2 }}
          />
          <Image
            src="/images/phone-1.png"
            alt="Phone screen displaying the Grow Together app"
            style={{ marginLeft: '-30px' }}
          />
        </Flex>
      </GreenDiv>
    </Container>
  );
}
