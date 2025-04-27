import { UUID } from 'crypto';
import { PlantingTypeEnum, UserPlant } from '@/types/schema';
import supabase from '../createClient';

export async function insertUserPlants(
  userPlants: Omit<
    UserPlant,
    | 'id'
    | 'date_removed'
    | 'recent_harvest'
    | 'num_harvested'
    | 'user_notes'
    | 'due_date'
  >[],
  confirmed: boolean,
  userId: UUID,
) {
  if (!confirmed) {
    const allUserPlants = await getCurrentUserPlantsByUserId(userId);
    const duplicateList = userPlants.filter(plant =>
      allUserPlants.some(userPlant => userPlant.plant_id === plant.plant_id),
    );
    if (duplicateList) {
      return duplicateList;
    }
  }
  const { error } = await supabase.from('user_plants').insert(userPlants);
  if (error) throw new Error(`Error inserting user plants: ${error.message}`);
  return;
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

export async function decreaseHarvestedByOne(id: UUID) {
  const { error } = await supabase.rpc('decrement_num_harvested', {
    row_id: id,
  });

  if (error) {
    throw new Error('Error decrementing:', error);
  }
}
export async function changeHarvested(
  user_id: UUID,
  plant_id: UUID,
  amount: number,
) {
  const { error } = await supabase.rpc('change_num_harvested', {
    p_user_id: user_id,
    p_plant_id: plant_id,
    p_amount: amount,
  });
  if (error) {
    throw new Error('Error decrementing:', error);
  }
}

export async function setRecentHarvestDate(
  date: string | null,
  user_id: UUID,
  plant_id: UUID,
): Promise<void> {
  const { error } = await supabase
    .from('user_plants')
    .update({ recent_harvest: date })
    .eq('user_id', user_id)
    .eq('plant_id', plant_id);

  if (error) {
    throw new Error('Failed to update: ', error);
  }
}
export async function setRecentHarvestDateThroughId(
  date: string | null,
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

export async function updateUserPlantDetails(
  id: UUID,
  date_added: string,
  planting_type: PlantingTypeEnum,
) {
  const { error } = await supabase
    .from('user_plants')
    .update({
      date_added,
      planting_type,
    })
    .eq('id', id);

  if (error) {
    throw new Error(`Error updating user plant details: ${error.message}`);
  }
}

export async function updateUserNote(
  user_id: UUID,
  plant_id: UUID,
  user_notes: string,
) {
  const { data, error } = await supabase
    .from('user_plants')
    .update({ user_notes: user_notes })
    .eq('user_id', user_id)
    .eq('plant_id', plant_id);

  if (error) {
    throw new Error(
      `Error updating user note with id ${user_id}: ${error.message}`,
    );
  }
  return data;
}
