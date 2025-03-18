import { createClient } from '@supabase/supabase-js';

// Initialize with explicit options to prevent initialization errors
// Use null check to handle potential missing environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Export a memoized client instance with safe initialization
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    detectSessionInUrl: false,
    autoRefreshToken: true,
  },
  global: {
    headers: {
      'x-client-info': 'glue-website',
    },
  },
});