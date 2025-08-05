# Changelog

## [v1.1 – Performance, UX & Manager View]
- CLP-101: Index and Redis cache for task listing to improve LCP.
- CLP-102: Multi-file drag & drop upload of attachments via react-dropzone with 5 MB chunking.
- CLP-103: AI Bank Match v2 using GPT and cosine string similarity targeting 98% matching.
- CLP-104: Manager portfolio view with heat-map for 30 accounts and Slack alerts.
- KPI targets: LCP listing < 700 ms; unmatched bank lines ≤ 2 %; NPS Clôture +5 pts; heat-map adopted by 90 % of managers.
- Ensured test coverage ≥ 85 % with no regression on v1 tasks.

## [Onboarding Express]
- Added intelligent module and expert preselection with `ModulesExpertStep`.
- New hook `useModuleRecommendations` and expert table.
- Introduced premium completion screen with `OnboardingSuccess` and micro feedback.

## [Onboarding QR]
- Added `QRScanStep` component generating time-limited QR codes for document upload.
- Introduced `onboardingQR` feature flag and Supabase `ocr_sessions` tracking.

## [Onboarding QR Express]
- Added mobile `QrUploadPage` with secure document upload and progress tracking.
- Implemented hooks `useSessionValidation` and `useFileUpload` with analytics events.
- Introduced Fastify route `/api/ocr/upload` and temporary `ocr-temp` storage bucket.
- Added OCR parsing pipeline with `/api/ocr/parse` endpoint and realtime updates.
- New `useOcrUpdates` hook pre-fills company form after mobile upload.
- Created `ocr-service` microservice and cleanup script for temporary storage.
- Implemented OCR autofill with validation drawer and mismatch detection.
- Added runtime `onboardingQR` feature flag with admin dashboard and SWR hook.

## [Analytics]
- Added real-time QR onboarding KPI dashboard with `/admin/kpi-qr` page and `get_qr_kpi` RPC.
