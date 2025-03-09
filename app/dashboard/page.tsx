'use client';

import { useEffect, useState } from 'react';
import { getDailyPlantTip } from '@/api/supabase/queries/dashboard';
import SingleTip from '@/components/SingleTip';
import { PlantTip } from '@/types/schema';
import { useAuth } from '@/utils/AuthProvider';
import {
  ArrowIcon,
  CalendarContainer,
  Circle,
  Container,
  DashboardTitle,
  Greeting,
  Header,
  InfoContainer,
  InfoHead,
  PlaceholderText,
  ReminderContainer,
  SeeAllLink,
  TaskContainer,
  Title,
  WeatherContainer,
  WeatherReminderWrapper,
} from './styles';

export default function Page() {
  const [plantTip, setPlantTip] = useState<PlantTip | null>(null);
  const { userId, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && userId) {
      const fetchTip = async () => {
        const tip = await getDailyPlantTip();

        setPlantTip(tip);
      };
      fetchTip();
    }
  }, [authLoading, userId]);

  return (
    <div>
      {authLoading || !userId ? (
        <p>Log in please!</p>
      ) : (
        <Container>
          <Greeting>Hi, [Name]!</Greeting>
          <DashboardTitle>My Dashboard</DashboardTitle>
          <TaskContainer>
            <PlaceholderText>Task Placeholder</PlaceholderText>
          </TaskContainer>
          <CalendarContainer>
            <PlaceholderText>Calendar Placeholder</PlaceholderText>
          </CalendarContainer>
          <WeatherReminderWrapper>
            <WeatherContainer>
              <PlaceholderText>Weather Placeholder</PlaceholderText>
            </WeatherContainer>
            <ReminderContainer>
              <PlaceholderText>Reminder Placeholder</PlaceholderText>
            </ReminderContainer>
          </WeatherReminderWrapper>
          <Header>
            <Title>Resources</Title>
            <SeeAllLink href="/resources">
              See All <ArrowIcon>→</ArrowIcon>
            </SeeAllLink>
          </Header>

          <InfoContainer>
            <Circle />
            <InfoHead>Tips are refreshed daily!</InfoHead>
          </InfoContainer>

          {plantTip == null ? (
            <p>Loading...</p>
          ) : (
            <SingleTip
              category={plantTip.category}
              body_text={plantTip.body_text}
            />
          )}
        </Container>
      )}
    </div>
  );
}
