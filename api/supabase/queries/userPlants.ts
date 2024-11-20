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
    throw new Error(`Error fetching plant ID: ${error}`);
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
    throw new Error(`Error fetching userPlant: ${error}`);
  }
  return data;
}
