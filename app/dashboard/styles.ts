import styled from 'styled-components';
import Icon from '@/components/Icon';
import { device, deviceMin } from '@/styles/breakpoints';
import COLORS from '@/styles/colors';
import { H1, H2, P2 } from '@/styles/text';

/* ───── shared width cap ────────────────────────────────── */
const CONTENT_MAX = '374px'; // original mobile width
const TABLET_MAX = '640px'; // comfortable stretch on tablets
const DESKTOP_MAX = '960px'; // wider desktop cap

/* ───── generic wrappers ────────────────────────────────── */
export const Container = styled.div`
  padding: 2rem 1.25rem;
  margin: 0 auto;
  width: 100%;
  max-width: ${DESKTOP_MAX};
`;

/* ───── header row ──────────────────────────────────────── */
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
  max-width: ${CONTENT_MAX};
  width: 100%;
  margin-left: auto;
  margin-right: auto;

  @media ${deviceMin.sm} {
    max-width: ${TABLET_MAX};
  }
  @media ${deviceMin.md} {
    max-width: ${DESKTOP_MAX};
  }
`;

/* ───── text / links ────────────────────────────────────── */
export const Title = styled(H1)`
  color: ${COLORS.shrub};
  font-weight: 300;
  font-size: clamp(1rem, 1.2vw + 0.5rem, 1.5rem);
  margin: 0;
`;

export const SeeAllLink = styled.a`
  display: flex;
  align-items: center;
  color: ${COLORS.midgray};
  font-family: Lexend;
  font-size: 10px;
  font-weight: 300;
  text-decoration: none;

  @media ${device.lg} {
    font-size: 16px;
  }
`;

export const ArrowIcon = styled.span`
  margin-left: 5px;
`;

/* (unchanged small elements: InfoHead, Circle, etc.) */

/* ───── dashboard banner + progress ─────────────────────── */
export const DashboardTopSection = styled.div`
  display: flex;
  flex-direction: column; /* always column ⇒ progress on its own line */
  gap: 24px;
  width: 100%;
  max-width: ${CONTENT_MAX};
  margin: 24px auto;

  @media ${deviceMin.sm} {
    max-width: ${TABLET_MAX};
  }
  @media ${deviceMin.md} {
    max-width: ${DESKTOP_MAX};
  }
`;

export const DashboardHeading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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

/* ───── progress-bar card ───────────────────────────────── */
export const ProgressContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: ${CONTENT_MAX};
  padding-top: 15px;
  padding-left: 32px;
  padding-right: 32px;
  gap: 16px;
  border-radius: 10px;
  border: 0.5px solid ${COLORS.lightgray};
  opacity: 0.8;
  height: 110px;

  @media ${deviceMin.sm} {
    max-width: ${TABLET_MAX};
  }
  @media ${deviceMin.md} {
    max-width: ${DESKTOP_MAX};
  }
`;

export const TasksLeft = styled.p`
  color: ${COLORS.midgray};
  font-size: 14px;
  font-weight: 400;
`;

export const TasksLeftNumber = styled.span`
  color: ${COLORS.shrub};
  font-weight: 500;
`;

/* progress bar internals (unchanged except width logic) */
export const ProgressWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 300px; /* roughly matches original design */

  @media (min-width: 600px) {
    max-width: 80%;
  }
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
  background: linear-gradient(to right, #ced9a0, #a1be23);
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
  background: ${({ passed }) => (passed ? '#F3F3F3' : COLORS.lightgray)};
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

export const ProgressIcon = styled(Icon)`
  width: 18px;
`;

export const WhiteIconWrapper = styled.div`
  svg image {
    filter: brightness(0) saturate(100%) invert(100%);
  }
`;

export const ProgressMessage = styled.div<{ percentage: number }>`
  position: absolute;
  top: calc(100% + 8px);
  left: ${({ percentage }) => percentage}%;
  transform: translateX(-50%);
  font-size: 12px;
  font-weight: 300;
  color: ${COLORS.midgray};
`;

/* ───── section header “Weekly Tasks / See All” ─────────── */
export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 32px auto;
  width: 100%;
  max-width: ${CONTENT_MAX};

  @media ${deviceMin.sm} {
    max-width: ${TABLET_MAX};
  }
  @media ${deviceMin.md} {
    max-width: ${DESKTOP_MAX};
  }
`;

export const SectionTitle = styled.h2`
  color: ${COLORS.shrub};
  font-size: 20px;
  font-weight: 400;
`;

/* ───── weekly filter pills ─────────────────────────────── */
export const WeeklyFiltersContainer = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
  max-width: ${CONTENT_MAX};
  margin: 16px auto;

  @media ${deviceMin.sm} {
    max-width: ${TABLET_MAX};
  }
  @media ${deviceMin.md} {
    max-width: ${DESKTOP_MAX};
  }
`;

export const WeeklyFilterButton = styled.button<{ active: boolean }>`
  border-radius: 57px;
  border: ${({ active }) => (active ? 'none' : '0.5px solid #888')};
  background-color: ${({ active }) => (active ? COLORS.shrub : '#FFFFFF')};
  color: ${({ active }) => (active ? '#FFFFFF' : COLORS.midgray)};
  font-size: 14px;
  cursor: pointer;
  font-family: 'AirbnbCereal_W_Bk';
  font-weight: 400;
  padding: 8px 14px;
`;

/* ───── tasks & resources wrapper (same width) ──────────── */
export const DashboardTasksWrapper = styled.div`
  width: 100%;
  max-width: ${CONTENT_MAX};
  margin: auto;

  @media ${deviceMin.sm} {
    max-width: ${TABLET_MAX};
  }
  @media ${deviceMin.md} {
    max-width: ${DESKTOP_MAX};
  }
`;

export const ResourcesWrapper = styled.div`
  width: 100%;
  max-width: ${CONTENT_MAX};
  margin: auto;

  @media ${deviceMin.sm} {
    max-width: ${TABLET_MAX};
  }
  @media ${deviceMin.md} {
    max-width: ${DESKTOP_MAX};
  }
`;

/* ───── task list card ──────────────────────────────────── */
export const TaskContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: 8px;
`;

/* ───── other bits (FilterTab etc.) stay unchanged ─────── */
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
export const LineBreak = styled.div`
  height: 2px;
  width: 100%;
  background-color: ${COLORS.lightgray};
`;
export const DateText = styled.p`
  color: ${COLORS.darkgray};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
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
