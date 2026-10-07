/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Supabase project URL; leave unset to run on this device only */
  readonly VITE_SUPABASE_URL?: string
  readonly VITE_SUPABASE_ANON_KEY?: string
}
