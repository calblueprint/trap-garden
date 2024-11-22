import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { H3 } from '@/styles/text';
import { SmallRoundedButton } from '../Button';

export const Container = styled.div`
  padding: 16px;
  background-color: ${COLORS.backgroundGrey};
  border-radius: 5px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
`;

export const EditButton = styled(SmallRoundedButton)`
  font-size: 0.875rem;
  padding: 0.25rem 0.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
export const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const DetailRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const DetailText = styled.span`
  color: ${COLORS.black};
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const StyledIcon = styled.div`
  color: ${COLORS.shrub};
  display: flex;
  align-items: center;
`;

export const StyledHeading = styled(H3)`
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
