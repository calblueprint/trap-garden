import { UUID } from 'crypto';
import { Plant } from '@/types/schema';
import supabase from '../createClient';

export async function get_plant_by_id(
  i_state: string,
  p_id: UUID,
): Promise<Plant[]> {
  const { data, error } = await supabase.rpc('get_plant_by_id', {
    input_state: i_state,
    plant_id: p_id,
  });

  if (error) {
    throw new Error(`Error getting matching plant: ${error.message}`);
  }

  return data;
}
