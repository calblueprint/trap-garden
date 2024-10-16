import { UUID } from 'crypto';
import { Plant } from '@/types/schema';
import supabase from '../createClient';

export async function getPlantById(
  i_state: string,
  p_id: UUID,
): Promise<Plant> {
  // const { data, error } = await supabase
  //   .from('plant_seasonality')
  //   .select('*')
  //   .eq('state', i_state)
  //   .eq("plant_seed_indoors_start", "January");
  // if (error)
  //   throw new Error(`Error fetching plant seasonality: ${error.message}`);
  // return data;
  const { data, error } = await supabase.rpc('get_plant_by_id', {
    input_state: i_state,
    plant_id: p_id,
  });

  if (error) {
    throw new Error(`Error getting matching plant: ${error.message}`);
  }

  return data[0];
}
