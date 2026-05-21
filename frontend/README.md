# BrianE-Dev

A React SPA starter for a developer education platform, marketplace, and content publishing engine.

## Stack

* React + Vite
* Tailwind CSS
* React Router
* Express REST API target
* PostgreSQL, Redis, Paystack, Cloudflare R2, Mux, and PostHog as the planned platform services

## Pages

* Public: Home, Courses, Tutorials, Blog, Ebooks, Pricing, About, Contact
* Authenticated shell: Dashboard with courses, ebooks, progress, settings, and downloads

## Getting started

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Run linting:

```bash
npm run lint
```

## Environment

Use `VITE_API_URL` for the Express API base URL.

```bash
VITE_API_URL=http://localhost:4000/api
```

## Recommended architecture next steps

* Add JWT auth and role guards for ADMIN, INSTRUCTOR, and STUDENT
* Build Express modules for courses, lessons, ebooks, purchases, and downloads
* Add secure PDF/video delivery with signed URLs and hosted video
* Integrate Paystack checkout and webhook access grants
* Add PostHog analytics and lesson progress tracking
