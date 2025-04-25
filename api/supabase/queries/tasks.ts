import { SingleTask } from '@/types/schema';
import supabase from '../createClient';

export async function insertTasks(
  tasks: Omit<SingleTask, 'id' | 'date_removed'>[],
) {
  const { error } = await supabase.from('tasks').insert(tasks);
  if (error) throw error;
}

export async function getUserTasks(userId: string): Promise<SingleTask[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', userId);
  if (error) throw error;
  return data;
}

export async function setTaskCompleted(
  taskId: string,
  completed: boolean,
  date: Date | null,
) {
  const { error } = await supabase
    .from('tasks')
    .update({
      isCompleted: completed,
      previous_completed_date: completed ? null : (date?.toString() ?? null),
      completed_date: completed ? date?.toString() : null,
    })
    .eq('id', taskId);
  if (error) throw error;
}

export async function updateCompleted(id: string, isCompleted: boolean) {
  const { data, error } = await supabase
    .from('tasks')
    .update({ isCompleted })
    .eq('id', id)
    .select();

  if (error) {
    console.error('Error updating task:', error);
    return null;
  }

  return data?.[0] ?? null;
}
export async function deletePlantTasks(
  userId: string,
  plantId: string,
): Promise<true> {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .match({ user_id: userId, plant_id: plantId });

  if (error) {
    console.error(`Failed to delete tasks for plant ${plantId}:`, error);
    throw error;
  }

  return true;
}

export async function updateDateAndCompleted(
  id: string,
  newDate: Date | null,
  isPrevious = false,
  isCompleted: boolean,
) {
  const updates = isPrevious
    ? {
        previous_completed_date: newDate,
        isCompleted: isCompleted, // previous means NOT completed
      }
    : {
        completed_date: newDate,
        isCompleted: isCompleted, // current means completed
      };

  const { data, error } = await supabase
    .from('tasks')
    .update(updates)
    .eq('id', id)
    .select(); // returns the updated row(s)

  if (error) {
    console.error('Error updating task date:', error);
    return null;
  }

  return data?.[0] ?? null;
}

export async function updateDateAndCompletedThroughPlantAndUserIdAndType(
  plant_id: string,
  user_id: string,
  type: string,
  newDate: Date | null,
  isPrevious = false,
  isCompleted: boolean,
) {
  const updates = isPrevious
    ? {
        previous_completed_date: newDate,
        isCompleted: isCompleted, // previous means NOT completed
      }
    : {
        completed_date: newDate,
        isCompleted: isCompleted, // current means completed
      };

  const { data, error } = await supabase
    .from('tasks')
    .update(updates)
    .eq('plant_id', plant_id)
    .eq('user_id', user_id)
    .eq('type', type)
    .select(); // returns the updated row(s)

  if (error) {
    console.error('Error updating task date:', error);
    return null;
  }

  return data?.[0] ?? null;
}
