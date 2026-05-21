# BrianE-Dev Platform

This workspace is split into two applications:

* `frontend/` - React, Vite, Tailwind CSS, and React Router SPA
* `backend/` - Express REST API for auth, courses, ebooks, purchases, payments, downloads, progress, and analytics

## Frontend

```bash
npm --prefix frontend install
npm --prefix frontend run dev
```

The frontend reads the backend base URL from `VITE_API_URL`.

## Backend

```bash
npm --prefix backend install
npm --prefix backend run dev
```

The API defaults to `http://localhost:4000/api`.
