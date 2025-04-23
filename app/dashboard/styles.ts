import styled from 'styled-components';
import Icon from '@/components/Icon';
import COLORS from '@/styles/colors';
import { H1, H2, P2 } from '@/styles/text';

export const Container = styled.div`
  margin: 0 auto;
  height: 90vh;
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
  font-style: normal;
  font-weight: 500;
`;

export const DashboardTitle = styled(P2)`
  color: ${COLORS.shrub};
  font-size: 14px;
  font-weight: 300;
  margin-bottom: 8px;
`;

export const TaskContainer = styled.div`
  border-radius: 10px;
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

export const DateText = styled.p`
  color: ${COLORS.darkgray};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const ProgressContainer = styled.div`
  margin-bottom: 24px;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 32px auto;
  width: 374px;
`;

export const SectionTitle = styled.h2`
  color: ${COLORS.shrub};
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

// Container for weekly task filter buttons
export const WeeklyFiltersContainer = styled.div`
  display: flex;
  gap: 8px;
  width: 344px;
  margin: 16px auto;
`;

// Individual weekly filter button
export const WeeklyFilterButton = styled.button<{ active: boolean }>`
  border-radius: 57px;
  border: ${({ active }) => (active ? 'none' : '0.5px solid #888')};
  background-color: ${({ active }) => (active ? COLORS.shrub : '#FFFFFF')};
  color: ${({ active }) => (active ? '#FFFFFF' : COLORS.shrub)};
  font-size: 14px;
  cursor: pointer;
  font-family: inherit;
  padding: 8px 14px;
  line-height: 8px;
  height: 30px;
`;

export const ProgressContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 374.27px;
  height: 110px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 0.5px solid var(--light-grey, #ddd);
  opacity: 0.8;
  padding-top: 15px;
  gap: 16px;
`;

export const ProgressWrapper = styled.div`
  position: relative;
  width: 300px;
`;

export const ProgressBarContainer = styled.div`
  position: relative;
  width: 100%;
  height: 20px;
  background: white;
  border: solid 1px #f0f0f0;
  border-radius: 20px;
`;

export const ProgressFill = styled.div<{ percentage: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${({ percentage }) => percentage}%;
  height: 100%;
  background: linear-gradient(to right, white, #a1be23);
  border-radius: 20px;
`;

export const DivisionLine = styled.div<{
  index: number;
  total: number;
  passed: boolean;
}>`
  position: absolute;
  left: ${({ index, total }) => (index / total) * 100}%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: ${({ passed }) =>
    passed == true ? '#F3F3F3' : COLORS.lightgray};
`;

export const LineBreak = styled.div`
  height: 2px;
  width: 100%;
  background-color: ${COLORS.lightgray};
`;

export const Marker = styled.div<{ percentage: number }>`
  position: absolute;
  top: 50%;
  left: ${({ percentage }) => percentage}%;
  transform: translate(-50%, -50%);
  width: 28px;
  height: 28px;
  background: ${COLORS.sprout};
  border: 2px solid ${COLORS.sprout};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;
export const WhiteIconWrapper = styled.div`
  svg image {
    filter: brightness(0) saturate(100%) invert(100%);
  }
  line-height: 14px;
`;
export const ProgressMessage = styled.div<{ percentage: number }>`
  position: absolute;
  top: calc(100% + 8px);
  left: ${({ percentage }) => percentage}%;
  transform: translateX(-50%);
  font-size: 12px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  color: ${COLORS.midgray};
`;

export const DashboardBody = styled.div`
  background: #f7f6f3;
  padding: 10px;
  min-height: 55%;
`;
export const DashboardContentWrapper = styled.div`
  width: 344px;
  margin: 0 auto;
`;

export const DashboardHeading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;
export const DashboardTopSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 374px;
  margin: 24px auto;
`;

export const TasksLeft = styled.p`
  color: ${COLORS.midgray};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
export const TasksLeftNumber = styled.span`
  color: ${COLORS.shrub};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const ProgressIcon = styled(Icon)`
  width: 18px;
`;
