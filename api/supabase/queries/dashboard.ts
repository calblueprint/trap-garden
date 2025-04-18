import { PlantTip, UserPlant } from '@/types/schema';
import supabase from '../createClient';

//quick lil documentation drop:
// Retrieve all tips from the database. Let’s say there are N tips.
// Determine the cycle number using cycleNumber = floor(today’s timestamp / (N * 86400000)).
// This ensures that after N days, a new cycle begins, and the order reshuffles.
// Shuffle tips using a deterministic seed (based on cycleNumber).
// This creates a unique but repeatable order for each cycle.
// Fisher-Yates shuffle ensures every tip appears exactly once before repeating.
// Select today's tip based on day position in the cycle.
// dayInCycle = (today’s date % N), ensuring each tip is picked once per cycle.

// Function to create a seeded shuffle (Fisher-Yates with a consistent seed)
const seededShuffle = (array: PlantTip[], seed: number): PlantTip[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = (seed * (i + 1)) % shuffled.length; // Deterministic shuffle
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Function to get a randomized but cycle-complete daily plant tip
export const getDailyPlantTip = async (): Promise<PlantTip | null> => {
  const { data, error } = await supabase.from('gardening_tips').select('*');

  if (error) {
    throw new Error(`Error getting plant tip: ${error.message}`);
  }

  // Determine the cycle number (each cycle displays all tips once)
  const cycleLength = data.length;
  const cycleNumber = Math.floor(
    new Date().getTime() / (cycleLength * 86400000),
  ); // New cycle every 'cycleLength' days

  // Shuffle deterministically based on the cycle number
  const shuffledTips = seededShuffle(data, cycleNumber);

  // Select today's tip
  const dayInCycle = new Date().getDate() % cycleLength;
  return shuffledTips[dayInCycle];
};

export async function getPendingTasks(userId: string): Promise<UserPlant[]> {
  const { data, error } = await supabase
    .from('user_plants')
    .select('*')
    .eq('user_id', userId)
    .is('date_removed', null)
    .not('last_watered', 'is', null)
    .not('last_weeded', 'is', null);

  if (error) {
    console.error('Error fetching user plants:', error);
  }

  return data ?? [];
}

export async function updateDate(
  id: string,
  newDate: Date,
  taskType: string,
  isPrevious: boolean = false,
) {
  console.log(id, newDate, taskType, isPrevious);

  // Use the isPrevious flag to choose the proper mapping.
  const fieldMap: Record<string, string> = {
    water: isPrevious ? 'previous_last_watered' : 'last_watered',
    weed: isPrevious ? 'previous_last_weeded' : 'last_weeded',
  };

  const fieldToUpdate = fieldMap[taskType];
  if (!fieldToUpdate) {
    console.error(`Invalid task type: ${taskType}`);
    return;
  }

  const { data, error } = await supabase
    .from('user_plants')
    .update({ [fieldToUpdate]: newDate })
    .eq('id', id)
    .select();

  if (error) {
    console.error(`Error updating ${fieldToUpdate} date:`, error);
  }
  return data;
}

export async function setDueDate(new_date: Date, id: string) {
  const { data, error } = await supabase
    .from('user_plants')
    .update({ due_date: new_date })
    .eq('id', id);

  if (error) {
    console.error(`Error updating due date:`, error);
  }

  return data;
}
