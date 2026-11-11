import { createClient } from "@supabase/supabase-js";

// Nur der öffentliche Publishable-Key. Kein service_role-Key hier (siehe CLAUDE.md).
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
);
