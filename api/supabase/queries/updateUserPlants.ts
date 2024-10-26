import { UUID } from 'crypto';
import { UserPlants } from '@/types/schema';
import supabase from '../createClient';

export async function updateUserPlants(
  userId: UUID,
  formData: Partial<UserPlants>[],
) {
  formData.map(async curr => {
    const { error } = await supabase.from('user_plants').insert({
      user_id: userId,
      plant_id: curr['plant_id'],
      date_added: curr['date_added'],
      date_harvested: null,
      planting_type: curr['planting_type'],
    });
    if (error) throw new Error(`Error inserting data: ${error.message}`);
  });
}
