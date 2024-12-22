import styled from 'styled-components';
import { SmallRoundedButton } from '@/components/Button';
import COLORS from '@/styles/colors';
import { H3 } from '../onboarding/styles';

export const MoveButton = styled(SmallRoundedButton)`
  border: 1px solid;
  font-family: inherit;
  margin-bottom: 10px;
  width: 170px;
  height: 50px;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
export const FooterButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  padding: 24px;
`;

export const ButtonDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  &:has(:only-child) {
    justify-content: flex-end;
  }
`;

export const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${COLORS.seed};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

export const ReviewHeader = styled(H3)`
  text-align: center;
  color: ${COLORS.shrub};
  margin-bottom: 40px;
`;
