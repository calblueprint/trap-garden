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
