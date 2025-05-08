import { FAQ, PlantTip } from '@/types/schema';
import supabase from '../createClient';

export async function getAllPlantTips(): Promise<PlantTip[]> {
  const { data, error } = await supabase.from('gardening_tips').select('*');
  if (error) throw new Error(`Error fetching all tips: ${error.message}`);
  return data;
}

export async function getAllFAQs(): Promise<FAQ[]> {
  const { data, error } = await supabase.from('faqs').select('*');
  if (error) throw new Error(`Error fetching all FAQs: ${error.message}`);
  return data;
}
