'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { UUID } from 'crypto';
import { getDailyPlantTip } from '@/api/supabase/queries/dashboard';
import {
  getUserTasks,
  updateCompleted,
  updateDateAndCompleted,
} from '@/api/supabase/queries/tasks';
import {
  changeHarvested,
  setRecentHarvestDate,
} from '@/api/supabase/queries/userPlants';
import ConfirmationModal from '@/components/ConfirmationModal';
import SingleTip from '@/components/SingleTip';
import TaskItem from '@/components/TaskItem';
import { PlantTip, SingleTask, ValidTask } from '@/types/schema';
import { useAuth } from '@/utils/AuthProvider';
import {
  computeDueDate,
  getCurrentSeason,
  isHarvestedThisSeason,
  isOlderThanFreqeuncyOrNull,
} from '@/utils/taskHelpers';

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
  | { user_id: UUID; plant_id: UUID; type: 'water' | 'weed'; action: 'revert' }
  | {
      user_id: UUID;
      plant_id: UUID;
      type: 'harvest';
      action: 'harvest-set' | 'harvest-clear';
    };

export default function Page() {
  const [plantTip, setPlantTip] = useState<PlantTip | null>(null);
  const { userId, loading: authLoading } = useAuth();
  const [pendingTasks, setPendingTasks] = useState<ValidTask[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  // Use one unified modal action state
  const [modalAction, setModalAction] = useState<ModalAction | null>(null);
  const [selectedTab, setSelectedTab] = useState<'current' | 'completed'>(
    'current',
  );

  // Process tasks from the database (UserPlant[]) and add water, weed, and harvest tasks.
  const getValidTasks = useCallback(async (tasks: SingleTask[]) => {
    const validTasks: ValidTask[] = [];
    const currentSeason = getCurrentSeason();
    console.log(tasks);
    for (const task of tasks) {
      if (task.isCompleted) {
        if (task.type == 'harvest') {
          const recent = new Date(task.completed_date);
          if (
            task.frequency == currentSeason &&
            isHarvestedThisSeason(recent, new Date(), task.frequency)
          ) {
            //correctly in completed
            validTasks.push({
              type: task.type,
              plant_name: task.plant_name,
              completed: true,
              id: task.id,
              due_date: new Date(),
              dueMessage: `Due end of ${task.frequency} season`,
              user_id: task.user_id,
              plant_id: task.plant_id,
            });
          } else {
            if (task.frequency == currentSeason) {
              // this task is not completed set it back to not completed
              validTasks.push({
                type: task.type,
                plant_name: task.plant_name,
                completed: false,
                id: task.id,
                due_date: new Date(),
                dueMessage: `Due end of ${task.frequency} season`,
                user_id: task.user_id,
                plant_id: task.plant_id,
              });
              updateCompleted(task.id, false);
            } else {
              continue;
            }
          }
        } else {
          const interval =
            task.type == 'water' ? 7 : task.frequency == 'weekly' ? 7 : 14;
          if (isOlderThanFreqeuncyOrNull(task.completed_date, interval)) {
            console.log('got here');
            //this task is not completed set it back to not completed
            validTasks.push({
              type: task.type as 'water' | 'weed',
              plant_name: task.plant_name,
              completed: false,
              id: task.id,
              due_date: computeDueDate(new Date(task.completed_date), interval),
              previousDate: new Date(task.completed_date),
              user_id: task.user_id,
              plant_id: task.plant_id,
            });
            updateCompleted(task.id, false);

            //function to modify completed to false in db
          } else {
            console.log('got here');
            //correctly in completed
            validTasks.push({
              type: task.type as 'water' | 'weed',
              plant_name: task.plant_name,
              completed: true,
              id: task.id,
              due_date: computeDueDate(
                new Date(task.previous_completed_date),
                interval,
              ),
              previousDate: new Date(task.previous_completed_date),
              user_id: task.user_id,
              plant_id: task.plant_id,
            });
          }
        }
      } else {
        if (task.type == 'water' || task.type == 'weed') {
          const interval =
            task.type == 'water' ? 7 : task.frequency == 'weekly' ? 7 : 14;
          validTasks.push({
            type: task.type,
            plant_name: task.plant_name,
            completed: false,
            id: task.id,
            due_date: computeDueDate(new Date(task.completed_date), interval),
            previousDate: new Date(task.completed_date),
            user_id: task.user_id,
            plant_id: task.plant_id,
          });
          if (task.completed_date != task.previous_completed_date) {
            await updateDateAndCompleted(
              task.id,
              new Date(task.completed_date),
              false,
              false,
            );
          }
        } else {
          if (task.frequency != currentSeason) {
            continue;
          } else {
            const dueMessage = `Due end of ${task.frequency} season`;
            validTasks.push({
              type: 'harvest',
              plant_name: task.plant_name,
              completed: false,
              id: task.id,
              due_date: new Date(),
              dueMessage: dueMessage,
              user_id: task.user_id,
              plant_id: task.plant_id,
            });
          }
        }
      }
    }

    console.log(validTasks);
    return validTasks;
  }, []);

  // --- Task Handlers ---

  // For water/weed tasks, immediately mark as complete.
  async function handleCheck(taskRowID: string, taskType: 'water' | 'weed') {
    const currDate = new Date();
    await updateDateAndCompleted(taskRowID, currDate, false, true);
    setPendingTasks(prevTasks =>
      prevTasks.map(task => {
        if (task.id === taskRowID && task.type === taskType) {
          return { ...task, completed: true };
        }
        return task;
      }),
    );
  }

  // For water/weed, when unchecking, we want to revert to the previous date.
  function handleUncheck(
    user_id: string,
    plant_id: string,
    taskType: 'water' | 'weed',
  ) {
    setModalAction({
      user_id: user_id as UUID,
      plant_id: plant_id as UUID,
      type: taskType,
      action: 'revert',
    });
    setIsModalOpen(true);
  }

  // For harvest tasks: if not harvested (current), ask to mark as harvested.
  function handleHarvestSet(user_id: string, plant_id: string) {
    setModalAction({
      user_id: user_id as UUID,
      plant_id: plant_id as UUID,
      type: 'harvest',
      action: 'harvest-set',
    });
    setIsModalOpen(true);
  }

  // For harvest tasks: if already harvested (completed), ask to clear the harvest marker.
  function handleHarvestClear(user_id: string, plant_id: string) {
    setModalAction({
      user_id: user_id as UUID,
      plant_id: plant_id as UUID,
      type: 'harvest',
      action: 'harvest-clear',
    });
    setIsModalOpen(true);
  }
  function handleToggle(task: ValidTask) {
    if (task.type === 'harvest') {
      if (task.completed) {
        handleHarvestClear(task.user_id, task.plant_id);
      } else {
        handleHarvestSet(task.user_id, task.plant_id);
      }
    } else {
      if (task.completed) {
        handleUncheck(task.user_id, task.plant_id, task.type);
      } else {
        handleCheck(task.id, task.type);
      }
    }
  }

  // When the confirmation modal is confirmed.
  async function processModalConfirm() {
    if (!modalAction) return;
    const { user_id, plant_id, type, action } = modalAction;
    if (type === 'harvest') {
      const currentDate = new Date();
      if (action === 'harvest-set') {
        // Mark this plant as harvested for the current season.
        setRecentHarvestDate(currentDate.toDateString(), user_id, plant_id);
        changeHarvested(user_id, plant_id, 1);
        setPendingTasks(prev =>
          prev.map(task => {
            if (
              task.user_id === user_id &&
              task.plant_id === plant_id &&
              task.type === 'harvest'
            ) {
              updateCompleted(task.id, true);
              return { ...task, completed: true };
            }
            return task;
          }),
        );
      } else if (action === 'harvest-clear') {
        // Clear the recent harvest; task becomes current.
        setRecentHarvestDate(null, user_id, plant_id);

        changeHarvested(user_id, plant_id, -1);

        setPendingTasks(prev =>
          prev.map(task => {
            if (
              task.user_id === user_id &&
              task.plant_id === plant_id &&
              task.type === 'harvest'
            ) {
              updateCompleted(task.id, false);
              return { ...task, completed: false };
            }
            return task;
          }),
        );
      }
    } else if (action === 'revert') {
      // For water/weed tasks, revert to the previous date.
      const task = pendingTasks.find(
        t =>
          t.user_id === user_id && t.plant_id === plant_id && t.type === type,
      );
      const previousDate = task?.previousDate || new Date();
      await updateDateAndCompleted(task!.id, previousDate, false, false);
      setPendingTasks(prev =>
        prev.map(t => {
          if (
            t.user_id === user_id &&
            t.plant_id === plant_id &&
            t.type === type
          ) {
            return { ...t, completed: false };
          }
          return t;
        }),
      );
    }
    setModalAction(null);
    setIsModalOpen(false);
  }

  // Your helper functions remain unchanged
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
    if (!last_weeded_date) return true; // check null too
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
    // setDueDate(candidateDueDate, taskId);
    return candidateDueDate;
  };

  // Process tasks from the database (UserPlant[]) and add water, weed, and harvest tasks.
  const getValidTasks = useCallback(async (tasks: UserPlant[]) => {
    const validTasks: ValidTask[] = [];
    const currentSeason = getCurrentSeason();
    console.log(tasks);
    for (const task of tasks) {
      if (task.isCompleted) {
        if (task.type == 'harvest') {
          const recent = new Date(task.completed_date);
          if (
            task.frequency == currentSeason &&
            isHarvestedThisSeason(recent, new Date(), task.frequency)
          ) {
            //correctly in completed
            validTasks.push({
              type: task.type,
              plant_name: task.plant_name,
              completed: true,
              id: task.id,
              due_date: new Date(),
              dueMessage: `Due end of ${task.frequency} season`,
              user_id: task.user_id,
              plant_id: task.plant_id,
            });
          } else {
            if (task.frequency == currentSeason) {
              // this task is not completed set it back to not completed
              validTasks.push({
                type: task.type,
                plant_name: task.plant_name,
                completed: false,
                id: task.id,
                due_date: new Date(),
                dueMessage: `Due end of ${task.frequency} season`,
                user_id: task.user_id,
                plant_id: task.plant_id,
              });
              updateCompleted(task.id, false);
            } else {
              continue;
            }
          }
        } else {
          const interval =
            task.type == 'water' ? 7 : task.frequency == 'weekly' ? 7 : 14;
          if (isOlderThanFreqeuncyOrNull(task.completed_date, interval)) {
            console.log('got here');
            //this task is not completed set it back to not completed
            validTasks.push({
              type: task.type as 'water' | 'weed',
              plant_name: task.plant_name,
              completed: false,
              id: task.id,
              due_date: computeDueDate(new Date(task.completed_date), interval),
              previousDate: new Date(task.completed_date),
              user_id: task.user_id,
              plant_id: task.plant_id,
            });
            updateCompleted(task.id, false);

            //function to modify completed to false in db
          } else {
            console.log('got here');
            //correctly in completed
            validTasks.push({
              type: task.type as 'water' | 'weed',
              plant_name: task.plant_name,
              completed: true,
              id: task.id,
              due_date: computeDueDate(
                new Date(task.previous_completed_date),
                interval,
              ),
              previousDate: new Date(task.previous_completed_date),
              user_id: task.user_id,
              plant_id: task.plant_id,
            });
          }
        }
      } else {
        if (task.type == 'water' || task.type == 'weed') {
          const interval =
            task.type == 'water' ? 7 : task.frequency == 'weekly' ? 7 : 14;
          validTasks.push({
            type: task.type,
            plant_name: task.plant_name,
            completed: false,
            id: task.id,
            due_date: computeDueDate(new Date(task.completed_date), interval),
            previousDate: new Date(task.completed_date),
            user_id: task.user_id,
            plant_id: task.plant_id,
          });
          if (task.completed_date != task.previous_completed_date) {
            await updateDateAndCompleted(
              task.id,
              new Date(task.completed_date),
              false,
              false,
            );
          }
        } else {
          if (task.frequency != currentSeason) {
            continue;
          } else {
            const dueMessage = `Due end of ${task.frequency} season`;
            validTasks.push({
              type: 'harvest',
              plant_name: task.plant_name,
              completed: false,
              id: task.id,
              due_date: new Date(),
              dueMessage: dueMessage,
              user_id: task.user_id,
              plant_id: task.plant_id,
            });
          }
        }
      }
    }

    console.log(validTasks);
    return validTasks;
  }, []);

  
  // When user clicks to uncheck, store the task info and open modal.
  

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
        const tasks = await getUserTasks(userId);
        setPendingTasks(await getValidTasks(tasks));
      };
      fetchTasks();
    }
  }, [authLoading, userId, getValidTasks]);

  // Filter tasks based on the selected tab.
  const filteredTasks = useMemo(() => {
    // One pass only, returns the right slice immediately
    return pendingTasks.filter(task =>
      selectedTab === 'current' ? !task.completed : task.completed,
    );
  }, [pendingTasks, selectedTab]);

  // If you also want the counts without another pass:
  const { currentTasksCount, completedTasksCount } = useMemo(() => {
    let current = 0;
    let completed = 0;
    for (const t of pendingTasks) {
      t.completed ? completed++ : current++;
    }
    return { currentTasksCount: current, completedTasksCount: completed };
  }, [pendingTasks]);

  // Compute counts for display in the filter tabs.
  // const currentTasksCount = pendingTasks.filter(task => !task.completed).length;
  // const completedTasksCount = pendingTasks.filter(
  //   task => task.completed,
  // ).length;

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
                    handleToggle(task);
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
