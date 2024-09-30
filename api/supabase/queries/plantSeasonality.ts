import { Plant } from '@/types/schema';
import supabase from '../createClient';

export async function getPlantSeasonality(
  input_state: string,
): Promise<Plant[]> {
  const { data, error } = await supabase.rpc('get_plant_seasonality', {
    input_state,
  });
  if (error)
    throw new Error(`Error fetching plant seasonality: ${error.message}`);
  return data;
}
