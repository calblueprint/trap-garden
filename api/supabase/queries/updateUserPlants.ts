import { UUID } from 'crypto';
import supabase from '../createClient';

interface FormData {
  name: string;
  date: string;
  plant_type: string;
  plantID: UUID;
}

export async function updateUserPlants(userId: UUID, formData: FormData[]) {
  formData.map(async curr => {
    const genUUID = crypto.randomUUID();
    const { error } = await supabase.from('user_plants').insert({
      id: genUUID,
      user_id: userId,
      plant_id: curr['plantID'],
      date_added: curr['date'],
      date_harvested: null,
      planting_type: curr['plant_type'],
    });
    if (error) throw new Error(`Error inserting data: ${error.message}`);
  });
}
