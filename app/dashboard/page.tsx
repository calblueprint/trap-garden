// Page.tsx
'use client';

import { useEffect, useState } from 'react';
import {
  getDailyPlantTip,
  getPendingTasks,
  setDueDate,
  updateDate,
} from '@/api/supabase/queries/dashboard';
import ConfirmationModal from '@/components/ConfirmationModal';
import SingleTip from '@/components/SingleTip';
import TaskItem from '@/components/TaskItem';
import { PlantTip, UserPlant } from '@/types/schema';
import { useAuth } from '@/utils/AuthProvider';
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

export default function Page() {
  const [plantTip, setPlantTip] = useState<PlantTip | null>(null);
  const { userId, loading: authLoading } = useAuth();
  const [pendingTasks, setPendingTasks] = useState<
    {
      type: string;
      plant_name: string;
      completed: boolean;
      due_date: Date;
      id: string;
      previousDate: Date;
    }[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // new state to store the task we want to "uncheck"
  const [uncheckTask, setUncheckTask] = useState<{
    id: string;
    type: string;
  } | null>(null);
  const [selectedTab, setSelectedTab] = useState<'current' | 'completed'>(
    'current',
  );

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
    if (!last_weeded_date) return true;
    const givenDate = new Date(last_weeded_date);
    const currentDate = new Date();
    const threshold = weeding_frequency === 'Weekly' ? 3 : 7;
    currentDate.setDate(currentDate.getDate() - threshold);
    return givenDate < currentDate;
  };

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

  function getValidTasks(tasks: UserPlant[]) {
    const validTasks = [];
    for (const task of tasks) {
      // Watering tasks logic
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
        // If necessary, update previous_last_watered in database:
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

      // Weeding tasks logic
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
    }
    return validTasks;
  }

  function handleCheck(userPlantRowId: string, taskType: string) {
    const currDate = new Date();
    // Update the "last" date with the current date, marking the task complete
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

  // When user clicks to uncheck, store the task info and open modal.
  function handleUncheck(userPlantRowId: string, taskType: string) {
    setUncheckTask({ id: userPlantRowId, type: taskType });
    setIsModalOpen(true);
  }

  // When the modal is confirmed, revert the date to the previous date and mark the task as incomplete.
  function processModalConfirm() {
    if (!uncheckTask) return;
    // Find the task in pendingTasks to get its previously stored date.
    const task = pendingTasks.find(
      t => t.id === uncheckTask.id && t.type === uncheckTask.type,
    );

    const previousDate = task!.previousDate;
    // Update the "last" date to the previous date.
    updateDate(uncheckTask.id, previousDate, uncheckTask.type, false);
    // Update UI state: mark task as incomplete.
    setPendingTasks(prevTasks =>
      prevTasks.map(t => {
        if (t.id === uncheckTask.id && t.type === uncheckTask.type) {
          return { ...t, completed: false };
        }
        return t;
      }),
    );
    // Clear stored task and close modal.
    setUncheckTask(null);
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

  // Filter tasks based on the selected tab
  const filteredTasks = pendingTasks.filter(task =>
    selectedTab === 'current' ? !task.completed : task.completed,
  );

  // Compute counts for display in the filter tabs
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

          {/* Filter Tabs */}
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

          {/* Task List */}
          <TaskContainer>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task, index) => (
                <TaskItem
                  key={index}
                  type={task.type as 'water' | 'weed'}
                  plantName={task.plant_name}
                  completed={task.completed}
                  dueDate={task.due_date}
                  onToggle={() => {
                    if (task.completed) {
                      handleUncheck(task.id, task.type);
                    } else {
                      handleCheck(task.id, task.type);
                    }
                  }}
                />
              ))
            ) : (
              <PlaceholderText>No tasks available</PlaceholderText>
            )}
          </TaskContainer>

          {/* Confirmation Modal */}
          <ConfirmationModal
            isOpen={isModalOpen}
            title="Are you sure you want to unmark this task?"
            message="Clicking confirm will move this task back to pending."
            onCancel={() => setIsModalOpen(false)}
            onConfirm={processModalConfirm} // use processModalConfirm here
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
