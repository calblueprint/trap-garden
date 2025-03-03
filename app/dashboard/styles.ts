import styled from 'styled-components';
import COLORS from '@/styles/colors';

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

export const Title = styled.h1`
  color: ${COLORS.shrub};
  font-family: Lexend;
  font-size: 16px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
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

export const Greeting = styled.h2`
  color: ${COLORS.shrub};

  font-family: Lexend;
  font-size: 28px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 16px;
`;

export const DashboardTitle = styled.p`
  color: ${COLORS.shrub};
  font-family: Lexend;
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  margin-bottom: 8px;
`;

export const TaskContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 2px 0px 8px 0px rgba(0, 0, 0, 0.1);
  height: 200px;
  margin-bottom: 8px;
`;
export const CalendarContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 2px 0px 8px 0px rgba(0, 0, 0, 0.1);
  height: 125px;
  margin-bottom: 8px;
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
export const WeatherReminderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 8px;
`;
export const WeatherContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 2px 0px 8px 0px rgba(0, 0, 0, 0.1);
  height: 125px;
  width: 50%;
  margin-bottom: 8px;
`;
export const ReminderContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 2px 0px 8px 0px rgba(0, 0, 0, 0.1);
  height: 125px;
  width: 50%;

  margin-bottom: 8px;
`;
