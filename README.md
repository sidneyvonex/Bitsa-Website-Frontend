# BITSA Website Frontend

A modern React + TypeScript frontend for the BITSA platform. This application powers the public website, authentication flows, role-based dashboards, and data-driven modules such as events, blogs, communities, projects, reports, and administration tools.

## Table of Contents

- [Project Overview](#project-overview)
- [Core Features](#core-features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Authentication and Access Control](#authentication-and-access-control)
- [API Layer](#api-layer)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## Project Overview

BITSA Website Frontend is a single-page application (SPA) built with Vite, React 19, and TypeScript. It includes:

- Public-facing pages (home, about, events, blogs, projects, contact, gallery, marketplace)
- Authentication flows (sign up, sign in, forgot/reset password, email verification)
- Role-protected dashboards for:
	- Students
	- Admins
	- Super Admins
- State management and API communication using Redux Toolkit + RTK Query
- Cloudinary image upload utility integration

## Core Features

- Public website pages with reusable UI components
- Dynamic routing using nested routes with React Router
- Role-based access protection via a shared `ProtectedRoute` component
- Token-based auth state persisted in `localStorage`
- RTK Query APIs for modular backend integration:
	- Auth
	- Users
	- Events
	- Blogs
	- Communities
	- Projects
	- Leaders
	- Partners
	- Interests
	- Reports
	- AI (powers the `AIAssistant` chat component for in-app user assistance)
	- Audit Logs (Super Admin activity tracking)
- Toast notifications using Sonner
- Charts and analytics widgets using Recharts
- Utility support for Cloudinary uploads and media URL generation

## Technology Stack

### Frontend

- React 19
- TypeScript 5
- React Router DOM 7

### State Management and Data Fetching

- Redux Toolkit
- React Redux
- RTK Query (`createApi`, endpoint injection, caching/tag invalidation)

### Styling and UI

- Tailwind CSS v4 (via Vite plugin)
- DaisyUI
- Lucide React icons
- React Spinners
- SweetAlert2
- Sonner

### Data and Visualization

- Recharts
- date-fns

### Tooling

- Vite 7
- ESLint 9 (flat config)
- TypeScript strict mode

## Architecture

High-level flow:

1. `main.tsx` bootstraps React and wraps the app with Redux `Provider`.
2. `App.tsx` defines the route tree using `createBrowserRouter`.
3. Protected sections are guarded by `ProtectedRoute` (auth + role checks).
4. API calls go through `baseApi` with:
	 - base URL from env
	 - auth header injection
	 - refresh-token retry logic on `401`
5. Feature APIs extend the base RTK Query API using endpoint injection.

## Project Structure

```text
src/
  Components/
    About/
    AdminDasboard/          ← folder name has a typo in the codebase (missing 's')
    DashboardDesign/
    Events/
    Home/
    StudentDashboard/
    SuperAdminDashboard/
    AIAssistant.tsx         ← AI chat assistant component
    HelpButton.tsx
    ProtectedRoutes.tsx
    Topbar.tsx
    Footer.tsx
    LoadingScreen.tsx
    InterestSelectionModal.tsx

  features/
    api/
      baseApi.ts            ← RTK Query base with auth + refresh logic
      blogsApi.ts
      communitiesApi.ts
      eventApi.ts
      projectApi.ts
      userApi.ts
      leadersApi.ts
      partnersApi.ts
      interestsApi.ts
      reportsApi.ts
      aiApi.ts              ← AI assistant API endpoints
      auditApi.ts
      index.ts              ← barrel re-export for all hooks/types
    app/
      store.tsx
      hooks.tsx
    auth/
      authSlice.ts          ← auth state, localStorage persistence
      authApi.ts            ← login/register/verify/refresh endpoints

  Pages/
    Home.tsx
    About.tsx
    Events.tsx  /  EventsCalendarview.tsx
    Blogs.tsx   /  BlogDetails.tsx
    Communities.tsx
    Projects.tsx
    Leaders.tsx
    Gallery.tsx
    Contact.tsx
    MarketPlace.tsx
    SignIn.tsx  /  SignUp.tsx
    ForgotPassword.tsx  /  ResetPassword.tsx
    EmailVerification.tsx
    StudentDashboard.tsx
    AdminDashboard.tsx
    SuperAdminDashboard.tsx
    NotFound.tsx
    Help.tsx

  utils/
    CloudinaryUtil.ts       ← upload, URL generation, validation helpers

  App.tsx                   ← route tree definition
  main.tsx                  ← Redux Provider bootstrap
```

## Getting Started

### Prerequisites

- Node.js 20+ recommended
- pnpm (**required** — a `pnpm-lock.yaml` is committed; using `npm` or `yarn` will produce dependency conflicts)

### Installation

```bash
pnpm install
```

### Run Development Server

```bash
pnpm dev
```

Vite server runs on:

- `http://localhost:5173`

### Build for Production

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

## Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=https://your-backend-api-url

# Cloudinary
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_unsigned_upload_preset

# Optional / only if you intentionally use client-side delete (not recommended)
VITE_CLOUDINARY_API_KEY=your_api_key
VITE_CLOUDINARY_API_SECRET=your_api_secret
```

### Important Notes

- `VITE_API_BASE_URL` is required. The app throws an error at startup if missing.
- Client-side usage of Cloudinary API secret is not recommended for production. Prefer backend-signed/delegated operations.
- Commit a `.env.example` file (with placeholder values, no secrets) so new contributors know which variables are needed.

## Available Scripts

- `pnpm dev`: Start development server
- `pnpm build`: Type-check and build production bundle
- `pnpm lint`: Run ESLint
- `pnpm preview`: Preview built application

## Authentication and Access Control

- Auth state is managed in `authSlice`.
- Token, refresh token, and user data are persisted in `localStorage`.
- `ProtectedRoute` enforces:
	- login requirement
	- role restrictions (`Student`, `Admin`, `SuperAdmin`)
	- route-level access checks and redirects
- On unauthorized API responses (`401`), the base query attempts token refresh and retries the request.

## API Layer

The API layer is centralized with RTK Query.

- `baseApi.ts`:
	- sets base URL
	- injects `Authorization: Bearer <token>`
	- adds default `Accept: application/json`
	- handles refresh-token flow
- Feature API files (`eventApi.ts`, `blogsApi.ts`, etc.) inject endpoints and provide hooks.
- `src/features/api/index.ts` re-exports all hooks/types for convenient imports.

## Route Reference

| Path | Access | Description |
|------|--------|-------------|
| `/` | Public | Home page |
| `/about` | Public | About BITSA |
| `/about/leadership` | Public | Leaders directory |
| `/events` | Public | Events list |
| `/events/calendar-view` | Public | Calendar view |
| `/events/:eventId` | Public | Event detail |
| `/blogs` | Public | Blog list |
| `/blogs/:slug` | Public | Blog detail |
| `/communities` | Public | Communities |
| `/projects` | Public | Projects |
| `/gallery` | Public | Gallery |
| `/shop` | Public | Marketplace |
| `/contact` | Public | Contact page |
| `/signup` | Public | Registration |
| `/login` | Public | Sign in |
| `/forgot-password` | Public | Forgot password |
| `/reset-password` | Public | Reset password |
| `/verify-email` | Public | Email verification |
| `/dashboard` | Student | Student dashboard (overview, events, blogs, communities, projects, profile, settings, help) |
| `/admindashboard` | Admin | Admin dashboard (overview, events, blogs, communities, projects, interests, reports, profile, settings) |
| `/superadmin` | SuperAdmin | Super Admin dashboard (users, logs, leaders, partners) |

## Deployment

This project is configured as an SPA for static hosting:

- `vercel.json` rewrites all routes to `index.html`
- `public/_redirects` includes Netlify-style SPA redirect behavior

This ensures deep links like `/events/calendar-view` or dashboard nested routes resolve correctly in production.

## Troubleshooting

### App fails on startup with API base URL error

Ensure `.env` contains a valid `VITE_API_BASE_URL`.

### Protected routes keep redirecting to login

- Verify token/user are present in local storage
- Confirm backend login response shape matches what `authSlice` expects

### Cloudinary upload errors

- Verify cloud name and upload preset values
- Ensure your upload preset is unsigned (if using unsigned upload flow)
- Prefer backend signing for production-grade security

---

## Contributing

- Add new domain APIs under `src/features/api/` (inject endpoints into `baseApi`, export hooks via `index.ts`)
- Keep route-level page components in `src/Pages/`
- Place reusable UI in `src/Components/`
- Use the typed hooks from `src/features/app/hooks.tsx` (`useAppSelector`, `useAppDispatch`) instead of raw `useSelector`/`useDispatch`
- Run `pnpm lint` and `pnpm build` before opening a pull request to catch type and lint errors early
- Keep environment-specific configuration in `.env` (never commit secrets)
