import { UUID } from 'crypto';
import { UserPlant } from '@/types/schema';
import supabase from '../createClient';

export async function insertUserPlants(
  userPlants: Omit<
    UserPlant,
    'id' | 'date_removed' | 'recent_harvest' | 'num_harvested'
  >[],
) {
  const { error } = await supabase.from('user_plants').insert(userPlants);
  if (error) throw new Error(`Error inserting user plants: ${error.message}`);
}

export async function getUserPlantById(userPlantId: UUID): Promise<UserPlant> {
  const { data, error } = await supabase
    .from('user_plants')
    .select('*')
    .eq('id', userPlantId)
    .is('date_removed', null)
    .limit(1)
    .single();

  if (error) {
    throw new Error(`Error fetching plant ID ${userPlantId}: ${error.message}`);
  }
  return data;
}

export async function getCurrentUserPlantsByUserId(
  user_id: UUID,
): Promise<UserPlant[]> {
  const { data, error } = await supabase
    .from('user_plants')
    .select('*')
    .eq('user_id', user_id)
    .is('date_removed', null);

  if (error) {
    throw new Error(
      `Error fetching userPlants for user ${user_id}: ${error.message}`,
    );
  }
  return data;
}

export async function upsertUserPlant(userPlant: UserPlant) {
  const { data, error } = await supabase
    .from('user_plants')
    .upsert(userPlant)
    .select();

  if (error) {
    throw new Error(`Error upserting plant ${userPlant.id}: ${error.message}`);
  }
  return data;
}

// removeUserPlantById is not currenlty being used
export async function removeUserPlantById(id: UUID) {
  const { data, error } = await supabase
    .from('user_plants')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Error deleting plant ${id}:' ${error}`);
  }
  return data;
}

export async function increaseHarvestedByOne(id: UUID) {
  const { error } = await supabase.rpc('increment_num_harvested', {
    row_id: id,
  });

  if (error) {
    throw new Error('Error incrementing:', error);
  }
}

export async function setRecentHarvestDate(
  date: string,
  id: UUID,
): Promise<void> {
  const { error } = await supabase
    .from('user_plants')
    .update({ recent_harvest: date })
    .eq('id', id);

  if (error) {
    throw new Error('Failed to update: ', error);
  }
}
