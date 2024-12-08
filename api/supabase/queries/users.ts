import supabase from '../createClient';

export async function checkEmailExists(email: string): Promise<boolean> {
  const { data, error } = await supabase.rpc('check_email_exists', {
    p_email: email,
  });

  if (error) {
    throw new Error(`Error checking email existence: ${error.message}`);
  }

  return data;
}
