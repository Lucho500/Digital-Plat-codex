/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  readonly VITE_SIRENE_API_TOKEN: string
  readonly VITE_ONBOARDING_V2: string
  readonly VITE_ONBOARDING_QR: string
  readonly NEXT_PUBLIC_OCR_ENDPOINT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}