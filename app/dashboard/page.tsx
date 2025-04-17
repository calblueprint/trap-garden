'use client';

import { useEffect, useState } from 'react';
import { UUID } from 'crypto';
import {
  getDailyPlantTip,
  getPendingTasks,
  setDueDate,
  updateDate,
} from '@/api/supabase/queries/dashboard';
import {
  decreaseHarvestedByOne,
  increaseHarvestedByOne,
  setRecentHarvestDate,
} from '@/api/supabase/queries/userPlants';
import ConfirmationModal from '@/components/ConfirmationModal';
import SingleTip from '@/components/SingleTip';
import TaskItem from '@/components/TaskItem';
import { PlantTip, UserPlant } from '@/types/schema';
import { useAuth } from '@/utils/AuthProvider';
import { mapMonthToSeason } from '@/utils/helpers';
import {
  ArrowIcon,
  Container,
  DashboardTitle,
  FilterTab,
  FilterTabsContainer,
  Greeting,
  Header,
  PlaceholderText,
  SeeAllLink,
  TaskContainer,
  Title,
} from './styles';

// Define a type for modal actions
type ModalAction =
  | { id: UUID; type: 'water' | 'weed'; action: 'revert' }
  | { id: UUID; type: 'harvest'; action: 'harvest-set' | 'harvest-clear' };

export default function Page() {
  const [plantTip, setPlantTip] = useState<PlantTip | null>(null);
  const { userId, loading: authLoading } = useAuth();
  const [pendingTasks, setPendingTasks] = useState<
    Array<{
      type: 'water' | 'weed' | 'harvest';
      plant_name: string;
      completed: boolean;
      due_date: Date;
      id: string;
      // For water/weed tasks we keep a previousDate
      previousDate?: Date;
      // For harvest tasks, store the season and an optional due message.
      harvestSeason?: string;
      dueMessage?: string;
    }>
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Use one unified modal action state
  const [modalAction, setModalAction] = useState<ModalAction | null>(null);
  const [selectedTab, setSelectedTab] = useState<'current' | 'completed'>(
    'current',
  );

  // Helper functions for comparing dates

  const isOlderThanWateringFrequencyOrNull = (date: string | null): boolean => {
    if (date == null) return true;
    const givenDate = new Date(date);
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 3);
    return givenDate < currentDate;
  };

  const isOlderThanWeedingFrequencyOrNull = (
    weeding_frequency: string,
    last_weeded_date: string | null,
  ): boolean => {
    if (!last_weeded_date) return true;
    const givenDate = new Date(last_weeded_date);
    const currentDate = new Date();
    const threshold = weeding_frequency === 'Weekly' ? 3 : 7;
    currentDate.setDate(currentDate.getDate() - threshold);
    return givenDate < currentDate;
  };

  // Determine the current season using the provided map.
  function getCurrentSeason() {
    const now = new Date();
    const monthName = now
      .toLocaleString('en-US', { month: 'long' })
      .toUpperCase();
    return mapMonthToSeason(monthName);
  }

  // Return true if the recent harvest date falls in the current harvest window.
  function isHarvestedThisSeason(
    recent: Date,
    current: Date,
    harvestSeason: string,
  ): boolean {
    const monthNameCurrent = current
      .toLocaleString('en-US', { month: 'long' })
      .toUpperCase();
    const currentSeason = mapMonthToSeason(monthNameCurrent);
    if (harvestSeason !== currentSeason) {
      return false;
    }
    // For non-WINTER seasons, require same calendar year.
    if (harvestSeason !== 'WINTER') {
      return recent.getFullYear() === current.getFullYear();
    } else {
      // For WINTER, handle December, January, and February.
      const currentMonth = current.getMonth(); // 0-indexed: January = 0, February = 1, December = 11
      if (currentMonth === 0 || currentMonth === 1) {
        // January or February
        // Accept if recent harvest was in January or February of the current year, or in December of previous year.
        return (
          (recent.getFullYear() === current.getFullYear() &&
            (recent.getMonth() === 0 || recent.getMonth() === 1)) ||
          (recent.getFullYear() === current.getFullYear() - 1 &&
            recent.getMonth() === 11)
        );
      } else if (currentMonth === 11) {
        // December
        // Only accept if the harvest was in December of the current year.
        return (
          recent.getFullYear() === current.getFullYear() &&
          recent.getMonth() === 11
        );
      }
      // This fallback shouldn't be reached if all WINTER months are covered
      return recent.getFullYear() === current.getFullYear();
    }
  }

  const computeDueDate = (
    lastTaskDate: Date | null,
    interval: number,
    taskId: string,
  ): Date => {
    let candidateDueDate: Date;
    if (lastTaskDate) {
      candidateDueDate = new Date(lastTaskDate);
      candidateDueDate.setDate(candidateDueDate.getDate() + interval);
    } else {
      candidateDueDate = new Date();
      candidateDueDate.setDate(candidateDueDate.getDate() + interval);
    }
    setDueDate(candidateDueDate, taskId);
    return candidateDueDate;
  };

  // Process tasks from the database (UserPlant[]) and add water, weed, and harvest tasks.
  function getValidTasks(tasks: UserPlant[]) {
    const validTasks: Array<{
      type: 'water' | 'weed' | 'harvest';
      plant_name: string;
      completed: boolean;
      due_date: Date;
      id: string;
      // For water/weed tasks we keep a previousDate
      previousDate?: Date;
      // For harvest tasks, store the season and an optional due message.
      harvestSeason?: string;
      dueMessage?: string;
    }> = [];
    const currentSeason = getCurrentSeason();

    for (const task of tasks) {
      // --- Watering Tasks ---
      if (
        isOlderThanWateringFrequencyOrNull(task.last_watered) ||
        task.last_watered === task.date_added_to_db
      ) {
        const taskWateredDate = new Date(task.last_watered);
        const due = task.due_date
          ? new Date(task.due_date)
          : computeDueDate(taskWateredDate, 7, task.id);
        validTasks.push({
          type: 'water',
          plant_name: task.plant_name,
          completed: false,
          due_date: due,
          id: task.id,
          previousDate: new Date(task.last_watered),
        });
        if (task.previous_last_watered !== task.last_watered) {
          updateDate(task.id, new Date(task.last_watered), 'water', true);
        }
      } else {
        validTasks.push({
          type: 'water',
          plant_name: task.plant_name,
          completed: true,
          due_date: new Date(task.due_date),
          id: task.id,
          previousDate: new Date(task.previous_last_watered),
        });
      }

      // --- Weeding Tasks ---
      if (
        isOlderThanWeedingFrequencyOrNull(
          task.weeding_frequency,
          task.last_weeded,
        ) ||
        task.last_weeded === task.date_added_to_db
      ) {
        const taskWeededDate = new Date(task.last_weeded);
        const interval = task.weeding_frequency === 'Weekly' ? 7 : 14;
        const due = task.due_date
          ? new Date(task.due_date)
          : computeDueDate(taskWeededDate, interval, task.id);
        validTasks.push({
          type: 'weed',
          plant_name: task.plant_name,
          completed: false,
          due_date: due,
          id: task.id,
          previousDate: new Date(task.last_weeded),
        });
        if (task.previous_last_weeded !== task.last_weeded) {
          updateDate(task.id, new Date(task.last_weeded), 'weed', true);
        }
      } else {
        validTasks.push({
          type: 'weed',
          plant_name: task.plant_name,
          completed: true,
          due_date: new Date(task.due_date),
          id: task.id,
          previousDate: new Date(task.previous_last_weeded),
        });
      }

      // --- Harvest Tasks ---
      // Only add harvest tasks if it is currently the plant’s harvest season.
      if (task.harvest_season && task.harvest_season === currentSeason) {
        let completed = false;
        if (task.recent_harvest) {
          const recent = new Date(task.recent_harvest);
          if (isHarvestedThisSeason(recent, new Date(), task.harvest_season)) {
            completed = true;
          }
        }
        validTasks.push({
          type: 'harvest',
          plant_name: task.plant_name,
          completed,
          due_date: new Date(),
          dueMessage: `Due end of ${task.harvest_season} season`,
          id: task.id,
          harvestSeason: task.harvest_season,
        });
      }
    }

    return validTasks;
  }

  // --- Task Handlers ---

  // For water/weed tasks, immediately mark as complete.
  function handleCheck(userPlantRowId: string, taskType: 'water' | 'weed') {
    const currDate = new Date();
    updateDate(userPlantRowId, currDate, taskType, false);
    setPendingTasks(prevTasks =>
      prevTasks.map(task => {
        if (task.id === userPlantRowId && task.type === taskType) {
          return { ...task, completed: true };
        }
        return task;
      }),
    );
  }

  // For water/weed, when unchecking, we want to revert to the previous date.
  function handleUncheck(userPlantRowId: string, taskType: 'water' | 'weed') {
    setModalAction({
      id: userPlantRowId as UUID,
      type: taskType,
      action: 'revert',
    });
    setIsModalOpen(true);
  }

  // For harvest tasks: if not harvested (current), ask to mark as harvested.
  function handleHarvestSet(id: string) {
    setModalAction({ id: id as UUID, type: 'harvest', action: 'harvest-set' });
    setIsModalOpen(true);
  }

  // For harvest tasks: if already harvested (completed), ask to clear the harvest marker.
  function handleHarvestClear(id: string) {
    setModalAction({
      id: id as UUID,
      type: 'harvest',
      action: 'harvest-clear',
    });
    setIsModalOpen(true);
  }

  // When the confirmation modal is confirmed.
  async function processModalConfirm() {
    if (!modalAction) return;
    const { id, type, action } = modalAction;
    if (type === 'harvest') {
      const currentDate = new Date();
      if (action === 'harvest-set') {
        // Mark this plant as harvested for the current season.
        setRecentHarvestDate(currentDate.toDateString(), id);
        increaseHarvestedByOne(id);
        setPendingTasks(prev =>
          prev.map(task => {
            if (task.id === id && task.type === 'harvest') {
              return { ...task, completed: true };
            }
            return task;
          }),
        );
      } else if (action === 'harvest-clear') {
        // Clear the recent harvest; task becomes current.
        setRecentHarvestDate(null, id);
        decreaseHarvestedByOne(id);
        setPendingTasks(prev =>
          prev.map(task => {
            if (task.id === id && task.type === 'harvest') {
              return { ...task, completed: false };
            }
            return task;
          }),
        );
      }
    } else if (action === 'revert') {
      // For water/weed tasks, revert to the previous date.
      const task = pendingTasks.find(t => t.id === id && t.type === type);
      const previousDate = task?.previousDate || new Date();
      await updateDate(id, previousDate, type, false);
      setPendingTasks(prev =>
        prev.map(t => {
          if (t.id === id && t.type === type) {
            return { ...t, completed: false };
          }
          return t;
        }),
      );
    }
    setModalAction(null);
    setIsModalOpen(false);
  }

  useEffect(() => {
    if (!authLoading && userId) {
      const fetchTip = async () => {
        const tip = await getDailyPlantTip();
        setPlantTip(tip);
      };
      fetchTip();
    }
  }, [authLoading, userId]);

  useEffect(() => {
    if (!authLoading && userId) {
      const fetchTasks = async () => {
        const tasks = await getPendingTasks(userId);
        setPendingTasks(getValidTasks(tasks));
      };
      fetchTasks();
    }
  }, [authLoading, userId]);

  // Filter tasks based on the selected tab.
  const filteredTasks = pendingTasks.filter(task =>
    selectedTab === 'current' ? !task.completed : task.completed,
  );

  // Compute counts for display in the filter tabs.
  const currentTasksCount = pendingTasks.filter(task => !task.completed).length;
  const completedTasksCount = pendingTasks.filter(
    task => task.completed,
  ).length;

  return (
    <div>
      {authLoading || !userId ? (
        <p>Log in please!</p>
      ) : (
        <Container>
          <Greeting>Hi, [Name]!</Greeting>
          <DashboardTitle>My Dashboard</DashboardTitle>

          <FilterTabsContainer>
            <FilterTab
              active={selectedTab === 'current'}
              onClick={() => setSelectedTab('current')}
            >
              Current ({currentTasksCount})
            </FilterTab>
            <FilterTab
              active={selectedTab === 'completed'}
              onClick={() => setSelectedTab('completed')}
            >
              Completed ({completedTasksCount})
            </FilterTab>
          </FilterTabsContainer>

          <TaskContainer>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task, index) => (
                <TaskItem
                  key={index}
                  type={task.type}
                  plantName={task.plant_name}
                  completed={task.completed}
                  // For harvest tasks, pass dueMessage if available.
                  dueDate={
                    task.type === 'harvest' && task.dueMessage
                      ? task.dueMessage
                      : task.due_date
                  }
                  onToggle={() => {
                    if (task.type === 'harvest') {
                      if (task.completed) {
                        handleHarvestClear(task.id);
                      } else {
                        handleHarvestSet(task.id);
                      }
                    } else {
                      if (task.completed) {
                        handleUncheck(task.id, task.type);
                      } else {
                        handleCheck(task.id, task.type);
                      }
                    }
                  }}
                />
              ))
            ) : (
              <PlaceholderText>No tasks available</PlaceholderText>
            )}
          </TaskContainer>

          <ConfirmationModal
            isOpen={isModalOpen}
            title={
              modalAction?.type === 'harvest'
                ? modalAction.action === 'harvest-set'
                  ? 'Mark as harvested?'
                  : 'Clear harvest record?'
                : 'Are you sure you want to unmark this task?'
            }
            message={
              modalAction?.type === 'harvest'
                ? modalAction.action === 'harvest-set'
                  ? 'Click confirm to record that you have harvested this plant for the current season.'
                  : 'Click confirm to remove the harvest record, and mark this task as pending again.'
                : 'Clicking confirm will move this task back to pending.'
            }
            onCancel={() => {
              setModalAction(null);
              setIsModalOpen(false);
            }}
            onConfirm={processModalConfirm}
          />

          <Header>
            <Title>Resources</Title>
            <SeeAllLink href="/resources">
              See All <ArrowIcon>→</ArrowIcon>
            </SeeAllLink>
          </Header>

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
