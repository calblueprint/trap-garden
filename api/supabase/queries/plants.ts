import { Plant } from '@/types/schema';
import supabase from '../createClient';

export async function getAllPlants(): Promise<Plant[]> {
  const { data, error } = await supabase.from('plants').select('*');
  if (error) throw new Error(`Error fetching all plants: ${error.message}`);
  return data;
}
