# Vortex Compass

A lightweight Next.js/TypeScript quiz with no database, server API, email delivery, or dynamic PDF generation.

## Local setup

1. Run `npm install`.
2. Copy `.env.example` to `.env.local` and add the GoHighLevel webhook and experiences URLs.
3. Run `npm run dev`.

When the webhook is not configured, submissions are stored under `vortexCompassResult` in browser local storage. The result screen always continues.

The five seasonal results share one unified framework:

- South — Nourish | The Alchemist of Restoration
- West — Release | The Alchemist of Liberation
- East — Shine | The Alchemist of Illumination
- North — Connect | The Alchemist of Belonging
- Center — Expand | The Alchemist of Becoming

Webhook submissions include both `primaryArchetype` and `supportingArchetype`. A completed result session is stored locally so refreshing shows the already-settled Compass instead of replaying its animated reveal.

## Static guides

Add the five final PDFs to `public/guides/`, then set each corresponding `guideAvailable` field in `app/quiz-data.ts` to `true`. Until then, production hides the download button and development shows a safe placeholder.

Direction-specific editorial images are stored at `public/images/results/{nourish,release,shine,connect,expand}.jpg`. Missing development images hide safely without interrupting the result reading.

## Deploy

Commit this directory to GitHub, import the repository into Vercel, and configure `NEXT_PUBLIC_GHL_WEBHOOK_URL` and `NEXT_PUBLIC_EXPERIENCES_URL` in the Vercel project settings.
