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
  There are currently no automated tests configured, so no test command is provided.

## Environment variables

The application expects the following variables (typically defined in a `.env` file):

- `VITE_SUPABASE_URL` – URL of your Supabase instance
- `VITE_SUPABASE_ANON_KEY` – Public anon key for the Supabase project
A sample `.env.example` file is provided as a starting point. Copy it to `.env` and update the values for your setup.

