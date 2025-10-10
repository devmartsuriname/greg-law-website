# Routes Before Cleanup

**Created:** 2025-10-10  
**Purpose:** Document the routing state before Phase 0.5 cleanup

---

## Context

This document captures the state of routes **before** the Auth Fix & Routing Cleanup phase. However, upon inspection during the cleanup phase, it was discovered that:

1. **Demo routes were already removed** in previous cleanup efforts
2. The "phantom routes" seen in browser dropdowns (e.g., `/auth/sign-in`, `/tables/basic`, `/icons/boxicons`) were **browser history/autocomplete artifacts** from the `_reference/darkone-react` directory
3. **No actual code changes were needed** for route cleanup

---

## Historical Routes (from _reference/ only)

The following routes existed in the `_reference/darkone-react` template but were **never part of the production application**:

### Authentication Routes (Reference Only)
- `/auth/sign-in` → `_reference/darkone-react/src/pages/auth/SignIn.tsx`
- `/auth/sign-up` → `_reference/darkone-react/src/pages/auth/SignUp.tsx`

### Demo UI Routes (Reference Only)
- `/base-ui/avatar` → Avatar demo page
- `/base-ui/badge` → Badge demo page
- `/base-ui/breadcrumb` → Breadcrumb demo page
- `/base-ui/buttons` → Buttons demo page
- `/base-ui/cards` → Cards demo page
- `/base-ui/carousel` → Carousel demo page
- `/base-ui/collapse` → Collapse demo page
- `/base-ui/dropdown` → Dropdown demo page
- `/base-ui/list-group` → List group demo page
- `/base-ui/modal` → Modal demo page
- `/base-ui/nav-tabs` → Nav tabs demo page
- `/base-ui/offcanvas` → Offcanvas demo page
- `/base-ui/pagination` → Pagination demo page
- `/base-ui/popovers` → Popovers demo page
- `/base-ui/progress` → Progress demo page
- `/base-ui/spinners` → Spinners demo page
- `/base-ui/toasts` → Toasts demo page
- `/base-ui/tooltips` → Tooltips demo page

### Table Routes (Reference Only)
- `/tables/basic` → Basic tables demo
- `/tables/gridjs` → GridJS demo

### Icon Routes (Reference Only)
- `/icons/boxicons` → Boxicons demo
- `/icons/solaricons` → Solar icons demo

### Layout Demo Routes (Reference Only)
- `/dark-sidenav` → Dark sidenav demo
- `/small-sidenav` → Small sidenav demo
- `/hidden-sidenav` → Hidden sidenav demo
- `/dark-topnav` → Dark topnav demo
- `/dark-mode` → Dark mode demo

---

## Actual Production Routes (Already Clean)

### Public Routes (Frontend - Lasight)
```
/ → Home
/about → About page
/services → Services listing
/services/:slug → Service detail
/portfolio/:id → Portfolio/Project detail
/blog → Blog listing
/blog/:slug → Blog post detail
/contact → Contact page
```

### Admin Routes (Backend - Darkone)
```
/admin/login → Admin login (Darkone UI, Supabase auth)
/admin/sign-up → Admin signup (Darkone UI, Supabase auth)
/admin/forgot-password → Password reset (Darkone UI, Supabase auth)
/admin → Dashboard (protected)
/admin/* → Other protected admin routes
```

---

## Key Finding

**NO CLEANUP WAS NEEDED** because the production application (`src/App.tsx`, `src/router/admin.tsx`) was already clean. The phantom routes were browser artifacts from the reference directory.

---

## Next Steps

See `ROUTES_AFTER_CLEANUP.md` for the final state and `ROUTES_DIAGNOSTIC_REPORT.md` for detailed analysis.
