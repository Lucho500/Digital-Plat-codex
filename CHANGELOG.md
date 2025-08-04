# Changelog

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
