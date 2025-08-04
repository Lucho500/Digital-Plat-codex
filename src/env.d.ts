/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  readonly VITE_SIRENE_API_TOKEN: string
  readonly VITE_ONBOARDING_V2: string
  readonly NEXT_PUBLIC_OCR_ENDPOINT: string
  readonly VITE_ADVISORY_PRICE_EUR: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}