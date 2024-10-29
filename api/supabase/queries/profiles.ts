import { Profile } from '@/types/schema';
import supabase from '../createClient';

export async function upsertProfile(profile: Profile) {
  const { data, error } = await supabase
    .from('profiles')
    .upsert(profile)
    .select()
    .single();

  if (error) throw new Error(`Error upserting profile data: ${error.message}`);

  return data;
}
