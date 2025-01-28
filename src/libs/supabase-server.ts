import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseSecret = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseSecret)
  throw new Error("Missing Supabase credentials");

const supabase = createClient(supabaseUrl, supabaseSecret, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
  },
});

export { supabase };
