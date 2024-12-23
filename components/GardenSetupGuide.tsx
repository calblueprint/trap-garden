import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { P2, P3 } from '@/styles/text';
import { UserTypeEnum } from '@/types/schema';
import { userTypeLabels } from '@/utils/helpers';

const gardenSetupGuideLinks: Record<UserTypeEnum, string> = {
  INDIV:
    'https://drive.google.com/file/d/1ejoBPm_-UvXnnNhFb4AnOfeVR-BpkRxt/view?usp=sharing',
  ORG: 'https://drive.google.com/file/d/1FreSIz0CY8qO3mW-pUMqOF1bqmcbvuMn/view?ts=670048d4',
  SCHOOL:
    'https://drive.google.com/file/d/1vuLIojh0AnBu31rk1Sz6Oss9VY-0YapT/view?usp=sharing',
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  padding-left: 20px;
  border-radius: 5px;
  border: 0.5px solid ${COLORS.lightgray};
  border-left: 6px solid ${COLORS.lightgray};
  gap: 8px;
  background-color: ${COLORS.glimpse};
`;

export default function GardenSetupGuide({
  userType,
}: {
  userType: UserTypeEnum;
}) {
  // TODO: maybe rename UserTypeEnum to GardenTypeEnum
  return (
    <Container>
      <P2>Learn More about Setting Up a Plot</P2>
      <P3
        $color={COLORS.blueLink}
        as="a"
        href={gardenSetupGuideLinks[userType]}
      >
        {userTypeLabels[userType]} Garden Set-up Guide
      </P3>
      <P3>
        This guide walks you through the process of setting up a new garden from
        scratch, including assembling a team and creating a budget.
      </P3>
    </Container>
  );
}
