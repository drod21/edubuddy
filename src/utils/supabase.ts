import { auth } from "@clerk/nextjs/app-beta";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "~/types/db";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "";
export const createSupabaseClient = async (accessToken?: string) => {
  const { getToken } = auth();
  const supabaseAccessToken =
    accessToken ?? (await getToken({ template: "supabase" })) ?? "";
  const supabase = createClient(supabaseUrl, supabaseKey, {
    global: { headers: { Authorization: `Bearer ${supabaseAccessToken}` } },
  });
  // set Supabase JWT on the client object,
  // so it is sent up with all Supabase requests
  return supabase;
};
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
export default supabase;
