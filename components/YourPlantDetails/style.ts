import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { SmallRoundedButton } from '../Button';

export const Container = styled.div`
  padding: 16px;
  background-color: ${COLORS.glimpse};
  border-radius: 5px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

// Not Used Yet
export const EditButton = styled(SmallRoundedButton)`
  font-size: 0.875rem;
  padding: 0.25rem 0.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
