import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { H1, H2, P2 } from '@/styles/text';

export const Container = styled.div`
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`;

export const Title = styled(H1)`
  color: ${COLORS.shrub};
  font-size: 1;
  font-weight: 300;
  margin: 0;
`;

export const SeeAllLink = styled.a`
  display: flex;
  align-items: center;
  color: ${COLORS.midgray};
  font-family: Lexend;
  font-size: 10px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  text-decoration: none;
`;

export const ArrowIcon = styled.span`
  margin-left: 5px;
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

export const InfoHead = styled.p`
  color: ${COLORS.midgray};
  font-family: Lexend;
  font-size: 10px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

export const Circle = styled.div`
  color: ${COLORS.midgray};
  width: 10px;
  height: 10px;
  border: 1px solid #666;
  border-radius: 50%;
  margin-right: 10px;
`;

export const Greeting = styled(H2)`
  color: ${COLORS.shrub};

  font-size: 28px;
  font-weight: 400;
  margin-bottom: 16px;
`;

export const DashboardTitle = styled(P2)`
  color: ${COLORS.shrub};
  font-size: 14px;
  font-weight: 300;
  margin-bottom: 8px;
`;

export const TaskContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 2px 0px 8px 0px rgba(0, 0, 0, 0.1);
  margin-bottom: 8px;
`;

export const Task = styled.div`
  width: 343.544px;
  height: 72px;
  background: blue;
`;
export const TaskHeader = styled.p`
  color: ${COLORS.darkgray};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
export const TaskDueDate = styled.p`
  color: ${COLORS.midgray};
  font-size: 12px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

export const PlaceholderText = styled.p`
  color: ${COLORS.shrub};
  font-family: Lexend;
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  padding: 20px;
`;

export const FilterTabsContainer = styled.div`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
`;

export const FilterTab = styled.span<{ active: boolean }>`
  cursor: pointer;
  color: ${({ active }) => (active ? COLORS.shrub : COLORS.darkgray)};
  text-decoration: ${({ active }) => (active ? 'underline' : 'none')};
  margin-right: 1rem;
`;

export const TaskWrapper = styled.div<{ completed: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ completed }) => (completed ? '#F8FAEA' : '#FFFFFF')};
  border-radius: 8px;
  border: 1px solid #ddd;
  padding: 1rem;
  margin-bottom: 1rem;
`;
