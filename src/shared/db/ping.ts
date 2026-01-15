import { supabase } from "./index";

export async function pingSupabase() {
  const { data, error } = await supabase.from("events").select("id").limit(1);
  if (error) throw error;
  return data;
}
