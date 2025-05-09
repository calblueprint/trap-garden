'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
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
import { Button } from '@/components/Buttons';
import ConfirmationModal from '@/components/ConfirmationModal';
import Icon from '@/components/Icon';
import SingleTip from '@/components/SingleTip';
import TaskItem from '@/components/TaskItem';
import { showToast } from '@/components/Toast';
import CONFIG from '@/lib/configs';
import COLORS from '@/styles/colors';
import { Flex } from '@/styles/containers';
import { P1 } from '@/styles/text';
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
  DashboardHeading,
  DashboardTasksWrapper,
  DashboardTopSection,
  DateText,
  DivisionLine,
  FilterTab,
  FilterTabsContainer,
  Greeting,
  Header,
  LineBreak,
  Marker,
  PlaceholderText,
  ProgressBarContainer,
  ProgressContainerWrapper,
  ProgressFill,
  ProgressIcon,
  ProgressMessage,
  ProgressWrapper,
  ResourcesWrapper,
  SectionHeader,
  SectionTitle,
  SeeAllLink,
  TaskContainer,
  TasksLeft,
  TasksLeftNumber,
  Title,
  WeeklyFilterButton,
  WeeklyFiltersContainer,
  WhiteIconWrapper,
} from './styles';

// -----------------------------
// Types
// -----------------------------

type ModalAction =
  | { user_id: UUID; plant_id: UUID; type: 'water' | 'weed'; action: 'revert' }
  | {
      user_id: UUID;
      plant_id: UUID;
      type: 'harvest';
      action: 'harvest-set' | 'harvest-clear';
    };

// -----------------------------
// Component
// -----------------------------

export default function Page() {
  // ────────────────────────────
  // State & Auth
  // ────────────────────────────
  const [plantTip, setPlantTip] = useState<PlantTip | null>(null);
  const { userId, loading: authLoading, userName } = useAuth();

  const [pendingTasks, setPendingTasks] = useState<ValidTask[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<ModalAction | null>(null);
  const [selectedTab, setSelectedTab] = useState<'current' | 'completed'>(
    'current',
  );
  const [activeFilter, setActiveFilter] = useState<
    'All' | 'Watering' | 'Weeding' | 'Harvesting'
  >('All');
  const router = useRouter();

  const getTimeOfDay = (): 'morning' | 'afternoon' | 'evening' => {
    const h = new Date().getHours();
    return h < 12 ? 'morning' : h < 18 ? 'afternoon' : 'evening';
  };

  const todayString = useMemo(
    () =>
      new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      }),
    [],
  );

  // ────────────────────────────
  // Data wrangling
  // ────────────────────────────
  const getValidTasks = useCallback(async (tasks: SingleTask[]) => {
    const validTasks: ValidTask[] = [];
    const currentSeason = getCurrentSeason();

    for (const task of tasks) {
      // completed tasks
      if (task.isCompleted) {
        if (task.type === 'harvest') {
          const recent = new Date(task.completed_date);
          if (
            task.frequency === currentSeason &&
            isHarvestedThisSeason(recent, new Date(), task.frequency)
          ) {
            // still legitimately completed
            validTasks.push({
              type: 'harvest',
              plant_name: task.plant_name,
              completed: true,
              id: task.id,
              due_date: new Date(),
              dueMessage: `Due end of ${task.frequency} season`,
              user_id: task.user_id,
              plant_id: task.plant_id,
            });
          } else {
            // stale completion → flip back to pending
            validTasks.push({
              type: 'harvest',
              plant_name: task.plant_name,
              completed: false,
              id: task.id,
              due_date: new Date(),
              dueMessage: `Due end of ${task.frequency} season`,
              user_id: task.user_id,
              plant_id: task.plant_id,
            });
            updateCompleted(task.id, false);
          }
        } else {
          const interval =
            task.type === 'water' ? 7 : task.frequency === 'weekly' ? 7 : 14;
          if (isOlderThanFreqeuncyOrNull(task.completed_date, interval)) {
            validTasks.push({
              type: task.type as 'water' | 'weed',
              plant_name: task.plant_name,
              completed: false,
              id: task.id,
              due_date: computeDueDate(
                new Date(task.completed_date),
                interval + 1,
              ),
              previousDate: new Date(task.completed_date),
              user_id: task.user_id,
              plant_id: task.plant_id,
            });
            updateCompleted(task.id, false);
          } else {
            validTasks.push({
              type: task.type as 'water' | 'weed',
              plant_name: task.plant_name,
              completed: true,
              id: task.id,
              due_date: computeDueDate(
                new Date(task.previous_completed_date),
                interval + 1,
              ),
              previousDate: new Date(task.previous_completed_date),
              user_id: task.user_id,
              plant_id: task.plant_id,
            });
          }
        }
      } else {
        // not completed yet
        if (task.type === 'water' || task.type === 'weed') {
          const interval =
            task.type === 'water' ? 7 : task.frequency === 'weekly' ? 7 : 14;
          validTasks.push({
            type: task.type,
            plant_name: task.plant_name,
            completed: false,
            id: task.id,
            due_date: computeDueDate(
              new Date(task.completed_date),
              interval + 1,
            ),
            previousDate: new Date(task.completed_date),
            user_id: task.user_id,
            plant_id: task.plant_id,
          });
          if (task.completed_date !== task.previous_completed_date) {
            await updateDateAndCompleted(
              task.id,
              new Date(task.completed_date),
              false,
              false,
            );
          }
        } else {
          // harvest and in‑season only
          if (task.frequency !== currentSeason) continue;
          validTasks.push({
            type: 'harvest',
            plant_name: task.plant_name,
            completed: false,
            id: task.id,
            due_date: new Date(),
            dueMessage: `Due end of ${task.frequency} season`,
            user_id: task.user_id,
            plant_id: task.plant_id,
          });
        }
      }
    }
    return validTasks;
  }, []);

  // ────────────────────────────
  // Task toggle helpers
  // ────────────────────────────
  async function toastUnclick(taskRowID: string, taskType: 'water' | 'weed') {
    const task = pendingTasks.find(
      t => t.id === taskRowID && t.type === taskType,
    );
    if (!task) return;

    const previousDate = task?.previousDate || new Date();
    await updateDateAndCompleted(task!.id, previousDate, false, false);
    setPendingTasks(prev =>
      prev.map(t =>
        t.id === taskRowID && t.type === taskType
          ? { ...t, completed: false }
          : t,
      ),
    );
  }
  async function handleCheck(taskRowID: string, taskType: 'water' | 'weed') {
    const task = pendingTasks.find(
      t => t.id === taskRowID && t.type === taskType,
    );
    const taskTypeFormat =
      taskType.substring(0, 1).toUpperCase() + taskType.substring(1);
    const message = `${taskTypeFormat}ing ${task?.plant_name} is completed!`;

    showToast({
      message: message,
      undo: true,
      undoAction: () => toastUnclick(taskRowID, taskType),
    });
    const currDate = new Date();
    await updateDateAndCompleted(taskRowID, currDate, false, true);
    setPendingTasks(prev =>
      prev.map(t =>
        t.id === taskRowID && t.type === taskType
          ? { ...t, completed: true }
          : t,
      ),
    );
  }

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

  function handleHarvestSet(user_id: string, plant_id: string) {
    setModalAction({
      user_id: user_id as UUID,
      plant_id: plant_id as UUID,
      type: 'harvest',
      action: 'harvest-set',
    });
    setIsModalOpen(true);
  }

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
      task.completed
        ? handleHarvestClear(task.user_id, task.plant_id)
        : handleHarvestSet(task.user_id, task.plant_id);
    } else {
      task.completed
        ? handleUncheck(task.user_id, task.plant_id, task.type)
        : handleCheck(task.id, task.type);
    }
  }

  async function processModalConfirm() {
    if (!modalAction) return;
    const { user_id, plant_id, type, action } = modalAction;

    if (type === 'harvest') {
      const now = new Date();
      if (action === 'harvest-set') {
        setRecentHarvestDate(now.toDateString(), user_id, plant_id);
        changeHarvested(user_id, plant_id, 1);
        setPendingTasks(prev =>
          prev.map(t =>
            t.user_id === user_id &&
            t.plant_id === plant_id &&
            t.type === 'harvest'
              ? { ...t, completed: true }
              : t,
          ),
        );
        updateCompleted(
          pendingTasks.find(
            t =>
              t.user_id === user_id &&
              t.plant_id === plant_id &&
              t.type === 'harvest',
          )!.id,
          true,
        );
      } else {
        setRecentHarvestDate(null, user_id, plant_id);
        changeHarvested(user_id, plant_id, -1);
        setPendingTasks(prev =>
          prev.map(t =>
            t.user_id === user_id &&
            t.plant_id === plant_id &&
            t.type === 'harvest'
              ? { ...t, completed: false }
              : t,
          ),
        );
        updateCompleted(
          pendingTasks.find(
            t =>
              t.user_id === user_id &&
              t.plant_id === plant_id &&
              t.type === 'harvest',
          )!.id,
          false,
        );
      }
    } else if (action === 'revert') {
      const task = pendingTasks.find(
        t =>
          t.user_id === user_id && t.plant_id === plant_id && t.type === type,
      );
      const previousDate = task?.previousDate || new Date();
      await updateDateAndCompleted(task!.id, previousDate, false, false);
      setPendingTasks(prev =>
        prev.map(t =>
          t.user_id === user_id && t.plant_id === plant_id && t.type === type
            ? { ...t, completed: false }
            : t,
        ),
      );
    }
    setModalAction(null);
    setIsModalOpen(false);
  }

  // ────────────────────────────
  // Effects – data fetch
  // ────────────────────────────
  useEffect(() => {
    if (!authLoading) {
      (async () => {
        const tip = await getDailyPlantTip();
        setPlantTip(tip);
      })();
    }
  }, [authLoading, userId]);

  useEffect(() => {
    if (!authLoading && userId) {
      (async () => {
        const tasks = await getUserTasks(userId);
        setPendingTasks(await getValidTasks(tasks));
      })();
    }
  }, [authLoading, userId, getValidTasks]);

  // ────────────────────────────
  // Derived UI data
  // ────────────────────────────
  const filteredTasks = useMemo(() => {
    return pendingTasks.filter(t => {
      const statusOK = selectedTab === 'current' ? !t.completed : t.completed;
      const typeOK =
        activeFilter === 'All'
          ? true
          : t.type === activeFilter.toLowerCase().slice(0, -3); // "Watering" → "water"
      return statusOK && typeOK;
    });
  }, [pendingTasks, selectedTab, activeFilter]);

  const { currentTasksCount, completedTasksCount } = useMemo(() => {
    let current = 0,
      completed = 0;
    const filteredTaskOnlyType = pendingTasks.filter(t => {
      const typeOK =
        activeFilter === 'All'
          ? true
          : t.type === activeFilter.toLowerCase().slice(0, -3); // "Watering" → "water"
      return typeOK;
    });
    for (const t of filteredTaskOnlyType) t.completed ? completed++ : current++;
    return { currentTasksCount: current, completedTasksCount: completed };
  }, [pendingTasks, selectedTab, activeFilter]);

  const tasksTotal = pendingTasks.length;
  const percentComplete = tasksTotal
    ? (completedTasksCount / tasksTotal) * 100
    : 0;
  const divisions = Math.max(tasksTotal - 1, 0);

  const { progressMsg, progressIcon } = useMemo(() => {
    if (!completedTasksCount)
      return { progressMsg: "Let's Start!", progressIcon: 'sprout' } as const;
    if (completedTasksCount === tasksTotal)
      return { progressMsg: 'Finished!', progressIcon: 'bloomflower' } as const;
    if (completedTasksCount / tasksTotal < 0.5)
      return { progressMsg: 'Keep going!', progressIcon: 'leaf' } as const;
    return { progressMsg: 'Almost there!', progressIcon: 'leaf' } as const;
  }, [completedTasksCount, tasksTotal]);

  return (
    <Container>
      {/* ─── Top banner + progress */}
      <DashboardTopSection>
        <DashboardHeading>
          <DateText>{todayString}</DateText>
          <Greeting>
            Good {getTimeOfDay()}
            {userName ? `, ${userName}` : ``}!
          </Greeting>
        </DashboardHeading>

        {authLoading || !userId ? (
          <Flex
            $direction="column"
            $gap="8px"
            $justify="center"
            $align="center"
          >
            <Icon type="sprout" />
            <P1 $color={COLORS.midgray}>Log in to view Weekly Tasks</P1>
            <Button
              $primaryColor={COLORS.shrub}
              onClick={() => router.push(CONFIG.login)}
            >
              Log In
            </Button>
          </Flex>
        ) : (
          <ProgressContainerWrapper>
            <TasksLeft>
              You have{' '}
              <TasksLeftNumber>{currentTasksCount} tasks</TasksLeftNumber> left
              this week.
            </TasksLeft>

            <ProgressWrapper>
              <ProgressBarContainer>
                <ProgressFill percentage={percentComplete} />
                {Array.from({ length: divisions }, (_, i) => (
                  <DivisionLine
                    key={i}
                    index={i + 1}
                    total={tasksTotal}
                    passed={i + 1 < completedTasksCount}
                  />
                ))}
                <Marker percentage={percentComplete}>
                  <WhiteIconWrapper>
                    <ProgressIcon type={progressIcon} />
                  </WhiteIconWrapper>
                </Marker>
              </ProgressBarContainer>
              <ProgressMessage percentage={percentComplete}>
                {progressMsg}
              </ProgressMessage>
            </ProgressWrapper>
          </ProgressContainerWrapper>
        )}
      </DashboardTopSection>

      {/* ─── Weekly Tasks header + type pills */}
      {authLoading || !userId ? (
        <></>
      ) : (
        <>
          <LineBreak />
          <SectionHeader>
            <SectionTitle>Weekly Tasks</SectionTitle>
            <SeeAllLink href="/tasks">See All →</SeeAllLink>
          </SectionHeader>

          <WeeklyFiltersContainer>
            {['All', 'Watering', 'Weeding', 'Harvesting'].map(tab => (
              <WeeklyFilterButton
                key={tab}
                active={activeFilter === tab}
                onClick={() =>
                  setActiveFilter(
                    tab as 'All' | 'Watering' | 'Weeding' | 'Harvesting',
                  )
                }
              >
                {tab}
              </WeeklyFilterButton>
            ))}
          </WeeklyFiltersContainer>

          {/* ─── Current / Completed tabs + list */}
          <DashboardTasksWrapper>
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
              {filteredTasks.length ? (
                filteredTasks.map(task => (
                  <TaskItem
                    key={task.id}
                    type={task.type}
                    plantName={task.plant_name}
                    completed={task.completed}
                    dueDate={
                      task.type === 'harvest' && task.dueMessage
                        ? task.dueMessage
                        : task.due_date
                    }
                    onToggle={() => handleToggle(task)}
                  />
                ))
              ) : (
                <PlaceholderText>No tasks available</PlaceholderText>
              )}
            </TaskContainer>

            {/* ─── Modal */}
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
              rightText="Confirm"
              leftText="Cancel"
            />
          </DashboardTasksWrapper>
        </>
      )}

      {/* ─── Resources */}
      <ResourcesWrapper>
        <Header>
          <Title>Tip of the Day</Title>
          <SeeAllLink href="/resources">
            See All <ArrowIcon>→</ArrowIcon>
          </SeeAllLink>
        </Header>

        {plantTip ? (
          <SingleTip
            category={plantTip.category}
            body_text={plantTip.body_text}
          />
        ) : (
          <p>Loading…</p>
        )}
      </ResourcesWrapper>
    </Container>
  );
}
