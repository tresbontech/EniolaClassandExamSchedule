import { createClient } from '@supabase/supabase-js';

// Fallback placeholders prevent build-time crash when env vars aren't set.
// Real calls only happen in the browser where the vars are always present.
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL    ?? 'https://placeholder.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'placeholder-anon-key'
);

export const SCHEDULE_ID = 1;
