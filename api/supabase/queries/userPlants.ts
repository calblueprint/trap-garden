import { UUID } from 'crypto';
import { UserPlant } from '@/types/schema';
import supabase from '../createClient';

export async function insertUserPlants(
  userId: UUID,
  formData: Partial<UserPlant>[],
) {
  formData.map(async curr => {
    const { error } = await supabase.from('user_plants').insert({
      user_id: userId,
      plant_id: curr['plant_id'],
      date_added: curr['date_added'],
      date_removed: null,
      planting_type: curr['planting_type'],
    });
    if (error) throw new Error(`Error inserting data: ${error.message}`);
  });
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
