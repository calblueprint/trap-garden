import { UUID } from 'crypto';
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

export async function fetchProfileById(userId: UUID) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error)
    throw new Error(`Error fetching profile id ${userId}: ${error.message}`);

  return data;
}
