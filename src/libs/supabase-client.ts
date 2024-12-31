import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseSecret = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl!, supabaseKey!);
const supabaseService = createClient(supabaseUrl!, supabaseSecret!, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

export { supabase, supabaseService };
