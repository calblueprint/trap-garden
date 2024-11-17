import styled from 'styled-components';
import { SmallRoundedButton } from '../Button';

export const Container = styled.div`
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 0.5rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const Title = styled.h2`
  color: #1b5e20;
  font-size: 1.25rem;
  font-weight: 600;
`;

export const EditButton = styled(SmallRoundedButton)`
  font-size: 0.875rem;
  padding: 0.25rem 0.5rem;
`;
export const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const DetailRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const DetailText = styled.span`
  color: #374151;
`;

export const StyledIcon = styled.div`
  color: #1b5e20;
  display: flex;
  align-items: center;
`;
