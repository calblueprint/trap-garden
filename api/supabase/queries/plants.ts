import { UUID } from 'crypto';
import { Plant, UserPlants } from '@/types/schema';
import supabase from '../createClient';

export async function getAllPlants(): Promise<Plant[]> {
  const { data, error } = await supabase.from('plants').select('*');
  if (error) throw new Error(`Error fetching all plants: ${error.message}`);
  return data;
}

export async function getPlantById(plantId: UUID): Promise<Plant> {
  const { data, error } = await supabase
    .from('plants')
    .select('*')
    .eq('id', plantId)
    .limit(1)
    .single();
  if (error) {
    throw new Error(`Error getting matching plant: ${error.message}`);
  }

  return data;
}
export async function getMatchingPlantForUserPlants(
  userPlant: UserPlants,
): Promise<Plant> {
  return getPlantById(userPlant['plant_id']);
}
