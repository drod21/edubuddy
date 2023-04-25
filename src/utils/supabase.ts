import { type SupabaseClient, createClient } from "@supabase/supabase-js";
import type { Database } from '~/types/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "";

type Client = SupabaseClient<Database, 'public'>;

export const supabase: Client = createClient<Database>(supabaseUrl, supabaseKey);
export default supabase;
