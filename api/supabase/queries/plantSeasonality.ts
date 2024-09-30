import { Plant } from '@/types/schema';
import supabase from '../createClient';

export async function getPlantSeasonality(
  input_state: string,
): Promise<Plant[]> {
  const { data, error } = await supabase
    .from('plant_seasonality')
    .select('*')
    .eq('state', input_state);
  if (error)
    throw new Error(`Error fetching plant seasonality: ${error.message}`);
  return data;
}
