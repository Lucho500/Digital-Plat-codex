# DigitalPlatform V3

DigitalPlatform V3 is a web application built with [Vite](https://vitejs.dev/), React and TypeScript. It connects to a Supabase backend and provides dashboards for managing budgets, invoices, suppliers, employees and other financial data.

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- npm (comes with Node.js)

## Running locally

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` in the project root and provide the required environment variables (see below).
4. Start the development server:
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:5173` by default.

## Available commands

- **Build:**
  ```bash
  npm run build
  ```
  Generates a production build in the `dist` folder.
- **Lint:**
  ```bash
  npm run lint
  ```
  Runs ESLint on the project sources.
- **Test:**
  ```bash
  npm test
  ```
  Runs the Vitest test suite.

## Environment variables

The application expects the following variables (typically defined in a `.env` file):

- `VITE_SUPABASE_URL` – URL of your Supabase instance
- `VITE_SUPABASE_ANON_KEY` – Public anon key for the Supabase project
A sample `.env.example` file is provided as a starting point. Copy it to `.env` and update the values for your setup. These variables are also required for the onboarding pages to communicate with Supabase.

## Supabase Setup

1. Install the Supabase CLI:
   ```bash
   npm install -g supabase
   ```
2. Start the local Supabase stack:
   ```bash
   supabase start
   ```
   This launches a local Postgres instance and the Supabase API on `http://localhost:54321`.
3. Apply the database migrations:
   ```bash
   supabase db reset
   ```
   Or push the migrations without resetting:
   ```bash
   supabase db push
   ```
   The initial migration file can be found at `supabase/migrations/20250523095722_crimson_glitter.sql`.

## Onboarding Flow

With the development server and Supabase running you can try the onboarding experience:

1. Ensure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set in your `.env` file.
2. Navigate to `http://localhost:5173/onboarding/tax` to start the fiscal onboarding wizard.

The onboarding screens rely on the same Supabase connection as the rest of the app.

### Resume progress

If you close the browser before finishing the onboarding, your answers are stored in `localStorage` (and synced to Supabase when logged in). When you return to `/onboarding/tax`, the app offers to resume from the last saved step.


## Success screens

The premium onboarding flow ends with `OnboardingSuccess`. This screen summarizes the modules enabled and the assigned expert, then prompts the user with a single primary action: **Accéder au tableau de bord**. The CTA receives focus automatically to comply with accessibility guidelines.

## Feature flags

The "Onboarding QR Express" flow is controlled by the `onboardingQR` feature flag stored in Supabase. Check its status in React components via `useFeatureFlag('onboardingQR')`; results are cached for 5 minutes with SWR.

Admins and product owners can toggle flags and export CSV logs from `/admin/feature-flags`.

## Recommendation model

The hybrid recommendation engine combines a simple rules mapping with a light logistic model.

### How to retrain

1. Export anonymised usage statistics to `database/usage_stats.json`.
2. Run the training script:
   ```bash
   npm run train:reco
   ```
   It writes refreshed weights to `src/reco/weights.ts`.
3. Deploy the server with `TFJS_BACKEND=wasm` to use the WebAssembly backend.
