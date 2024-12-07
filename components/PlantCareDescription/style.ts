import styled from 'styled-components';
import { P3 } from '@/styles/text';

export const CareItem = styled.div`
  display: flex;
  align-items: center;
`;

// this can be a shared style
export const IconWrapper = styled.div`
  margin-right: 6px;
`;

export const Strong = styled(P3).attrs({ as: 'span' })`
  font-weight: 500;
`;
