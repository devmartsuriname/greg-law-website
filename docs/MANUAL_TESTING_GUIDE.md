# Manual Testing Guide — Auth & Routing

**Version:** 2.0  
**Updated:** 2025-10-10  
**Phase:** Auth Fix & Routing Cleanup

---

## Overview

This guide provides step-by-step instructions for manually testing the authentication system and routing cleanup. Follow these procedures to verify that all authentication flows and route protection mechanisms are working correctly.

---

## Pre-Testing Setup (CRITICAL)

Complete these steps **before** running any tests:

### Step 1: Configure Supabase Authentication

**Location:** Supabase Dashboard → Authentication Settings

1. Navigate to: https://supabase.com/dashboard/project/lokofoekwbjjxmzwyasa/auth/providers

2. **Configure Site URL:**
   - For local development: `http://localhost:8080`
   - For production: `https://yourdomain.com`

3. **Configure Redirect URLs:**
   - Add: `http://localhost:8080/admin`
   - Add: `https://yourdomain.com/admin` (if deploying)
   - Add any other environment URLs

4. **Email Confirmation (Optional for Testing):**
   - Navigate to: Email provider settings
   - Consider **disabling** "Confirm email" for faster testing
   - Re-enable for production!

### Step 2: Prepare for First Admin User

You'll need to run this SQL command **after** your first signup:

```sql
-- Save this for later use
INSERT INTO public.user_roles (user_id, role)
VALUES (
  (SELECT id FROM auth.users WHERE email = 'YOUR_EMAIL@example.com'),
  'admin'
);
```

**Where to run:** https://supabase.com/dashboard/project/lokofoekwbjjxmzwyasa/sql/new

### Step 3: Clear Browser Cache

**Important:** Clear browser history to avoid phantom route confusion.

**Chrome/Edge:**
1. Press `Ctrl+Shift+Delete` (Windows) or `Cmd+Shift+Delete` (Mac)
2. Select "All time"
3. Check: "Browsing history" and "Cached images and files"
4. Click "Clear data"

**Firefox:**
1. Press `Ctrl+Shift+Delete` (Windows) or `Cmd+Shift+Delete` (Mac)
2. Select "Everything"
3. Check: "Browsing & Download History" and "Cache"
4. Click "Clear Now"

**Alternative:** Use Incognito/Private browsing mode

---

## Test Suite 1: Authentication Flow

### Test 1.1: Sign Up (New User)

**Objective:** Verify user registration creates account and profile

1. **Navigate to:** `http://localhost:8080/admin/sign-up`

2. **Verify:**
   - [ ] Page loads with Darkone UI (dark theme, professional design)
   - [ ] Form contains: Full Name, Email, Password, Confirm Password, Terms checkbox
   - [ ] All form fields are empty
   - [ ] "Sign In" link visible at bottom

3. **Fill Form:**
   ```
   Full Name: Test Admin
   Email: testadmin@example.com
   Password: TestPassword123!
   Confirm Password: TestPassword123!
   Terms: [x] Checked
   ```

4. **Click:** "Sign Up" button

5. **Expected Results:**
   - [ ] Success message appears: "Account created! Please check your email..."
   - [ ] Toast notification shows success
   - [ ] Form is cleared or redirects to login
   - [ ] No errors in browser console

6. **Verify in Supabase:**
   - Navigate to: https://supabase.com/dashboard/project/lokofoekwbjjxmzwyasa/auth/users
   - [ ] New user appears in Users list
   - [ ] Email matches what you entered

7. **Verify Profile Created:**
   - Navigate to: https://supabase.com/dashboard/project/lokofoekwbjjxmzwyasa/editor
   - Open `profiles` table
   - [ ] New profile row exists
   - [ ] `id` matches user ID from auth.users
   - [ ] `email` matches

8. **Assign Admin Role (Required for Next Tests):**
   - Navigate to: https://supabase.com/dashboard/project/lokofoekwbjjxmzwyasa/sql/new
   - Run:
     ```sql
     INSERT INTO public.user_roles (user_id, role)
     VALUES (
       (SELECT id FROM auth.users WHERE email = 'testadmin@example.com'),
       'admin'
     );
     ```
   - [ ] Query succeeds (1 row inserted)

### Test 1.2: Sign Up Validation

**Objective:** Verify form validation works correctly

**Test Invalid Email:**
1. Navigate to: `/admin/sign-up`
2. Enter: `invalid-email`
3. Try to submit
4. Expected: Error message "Invalid email address"

**Test Weak Password:**
1. Enter: `email@example.com`
2. Enter password: `123`
3. Try to submit
4. Expected: Error message about password requirements

**Test Password Mismatch:**
1. Enter password: `TestPassword123!`
2. Enter confirm: `DifferentPassword123!`
3. Try to submit
4. Expected: Error message "Passwords do not match"

**Test Missing Terms:**
1. Fill all fields correctly
2. Leave Terms checkbox unchecked
3. Try to submit
4. Expected: Error message "You must accept the terms"

**Test Duplicate Email:**
1. Use email from Test 1.1: `testadmin@example.com`
2. Fill form correctly
3. Submit
4. Expected: Error message "User already registered"

### Test 1.3: Login (Existing User)

**Objective:** Verify login flow works correctly

1. **Navigate to:** `http://localhost:8080/admin/login`

2. **Verify:**
   - [ ] Page loads with Darkone UI
   - [ ] Form contains: Email, Password fields
   - [ ] "Sign Up" link visible
   - [ ] "Forgot Password?" link visible
   - [ ] "Remember Me" checkbox present

3. **Enter Credentials:**
   ```
   Email: testadmin@example.com
   Password: TestPassword123!
   ```

4. **Click:** "Sign In" button

5. **Expected Results:**
   - [ ] Success toast notification appears
   - [ ] Redirects to `/admin` dashboard
   - [ ] Dashboard loads successfully
   - [ ] User is authenticated
   - [ ] No errors in console

6. **Verify Session Persistence:**
   - [ ] Press `F5` to refresh page
   - [ ] Verify you remain logged in
   - [ ] Verify redirect does NOT occur
   - [ ] Dashboard still accessible

### Test 1.4: Login Validation

**Objective:** Verify login error handling

**Test Invalid Credentials:**
1. Navigate to: `/admin/login`
2. Enter: `testadmin@example.com` / `WrongPassword`
3. Submit
4. Expected: Error message "Invalid login credentials"

**Test Empty Fields:**
1. Leave email empty
2. Try to submit
3. Expected: Error message "Email is required"

**Test Invalid Email Format:**
1. Enter: `not-an-email`
2. Try to submit
3. Expected: Error message "Invalid email address"

### Test 1.5: Forgot Password

**Objective:** Verify password reset flow

1. **Navigate to:** `http://localhost:8080/admin/forgot-password`

2. **Verify:**
   - [ ] Page loads with Darkone UI
   - [ ] Form contains: Email field
   - [ ] "Back to Login" link visible

3. **Enter Email:**
   ```
   Email: testadmin@example.com
   ```

4. **Click:** "Send Reset Link" button

5. **Expected Results:**
   - [ ] Success message: "Password reset email sent!"
   - [ ] Toast notification appears
   - [ ] Form is cleared or shows success state
   - [ ] No errors in console

6. **Check Email (if email enabled):**
   - [ ] Open email inbox for `testadmin@example.com`
   - [ ] Verify reset email received
   - [ ] Verify email contains reset link
   - [ ] Click reset link (optional: test full reset flow)

### Test 1.6: Logout

**Objective:** Verify logout clears session

1. **Prerequisites:** Be logged in from Test 1.3

2. **Locate Logout Button:**
   - Look in admin header/navigation
   - Usually in user dropdown or top-right

3. **Click:** Logout button

4. **Expected Results:**
   - [ ] Success toast: "Logged out successfully"
   - [ ] Redirects to `/admin/login`
   - [ ] Login page loads
   - [ ] Session is cleared

5. **Verify Session Cleared:**
   - [ ] Try to navigate to `/admin` directly
   - [ ] Expected: Redirected back to `/admin/login`
   - [ ] Refresh page
   - [ ] Expected: Remain on login page

---

## Test Suite 2: Route Protection

### Test 2.1: Anonymous User Access

**Objective:** Verify unauthenticated users cannot access protected routes

**Prerequisites:** Be logged out

1. **Navigate to:** `http://localhost:8080/admin`

2. **Expected Results:**
   - [ ] Redirected to `/admin/login`
   - [ ] URL changes to `/admin/login?redirectTo=/admin` or similar
   - [ ] Login page loads
   - [ ] No protected content visible

3. **Try Other Protected Routes:**
   - Navigate to: `/admin/dashboard` (if exists)
   - Expected: Redirect to login
   - Navigate to: `/admin/users` (if exists)
   - Expected: Redirect to login

### Test 2.2: Authenticated User Redirect

**Objective:** Verify logged-in users are redirected away from login

**Prerequisites:** Be logged in from Test 1.3

1. **Navigate to:** `http://localhost:8080/admin/login`

2. **Expected Results:**
   - [ ] Immediately redirected to `/admin`
   - [ ] Dashboard loads
   - [ ] Login form NOT visible

3. **Try Other Auth Pages:**
   - Navigate to: `/admin/sign-up`
   - Expected: Redirect to `/admin`
   - Navigate to: `/admin/forgot-password`
   - Expected: Redirect to `/admin`

### Test 2.3: Protected Route Access

**Objective:** Verify authenticated users CAN access protected routes

**Prerequisites:** Be logged in

1. **Navigate to:** `http://localhost:8080/admin`
   - Expected: Dashboard loads successfully

2. **Navigate to:** `/admin/dashboard` (if exists)
   - Expected: Page loads successfully

3. **Verify No Redirects:**
   - [ ] No automatic redirects occur
   - [ ] Content displays properly
   - [ ] No authentication errors

---

## Test Suite 3: Route Cleanup Verification

### Test 3.1: Phantom Routes Return 404

**Objective:** Verify demo routes are removed and return 404

**Test Auth Phantom Routes:**
1. Navigate to: `http://localhost:8080/auth/sign-in`
   - Expected: 404 error page
2. Navigate to: `/auth/sign-up`
   - Expected: 404 error page
3. Navigate to: `/sign-up`
   - Expected: 404 error page
4. Navigate to: `/register`
   - Expected: 404 error page
5. Navigate to: `/login`
   - Expected: 404 error page

**Test Demo UI Routes:**
1. Navigate to: `/base-ui/avatar`
   - Expected: 404 error page
2. Navigate to: `/base-ui/buttons`
   - Expected: 404 error page
3. Navigate to: `/tables/basic`
   - Expected: 404 error page
4. Navigate to: `/icons/boxicons`
   - Expected: 404 error page

**Test Layout Demo Routes:**
1. Navigate to: `/dark-sidenav`
   - Expected: 404 error page
2. Navigate to: `/small-sidenav`
   - Expected: 404 error page
3. Navigate to: `/hidden-sidenav`
   - Expected: 404 error page
4. Navigate to: `/dark-topnav`
   - Expected: 404 error page

**Test Other Demo Routes:**
1. Navigate to: `/testimonial`
   - Expected: 404 error page
2. Navigate to: `/portfolio/2-col`
   - Expected: 404 error page
3. Navigate to: `/portfolio/masonry`
   - Expected: 404 error page
4. Navigate to: `/products`
   - Expected: 404 error page

### Test 3.2: Production Routes Work

**Objective:** Verify all production routes load correctly

**Test Public Routes:**
1. Navigate to: `http://localhost:8080/`
   - Expected: Home page loads ✅
2. Navigate to: `/about`
   - Expected: About page loads ✅
3. Navigate to: `/services`
   - Expected: Services page loads ✅
4. Navigate to: `/blog`
   - Expected: Blog page loads ✅
5. Navigate to: `/contact`
   - Expected: Contact page loads ✅

**Test Admin Routes (while logged in):**
1. Navigate to: `/admin`
   - Expected: Dashboard loads ✅
2. Navigate to: `/admin/login` (while logged in)
   - Expected: Redirects to `/admin` ✅

### Test 3.3: Navigation Links

**Objective:** Verify all navigation links are functional

**Test Header Navigation:**
1. **On Home Page:** Click each navigation link
   - Home → Loads home page ✅
   - About → Loads about page ✅
   - Services → Loads services page ✅
   - Portfolio → Loads portfolio page ✅
   - Blog → Loads blog page ✅
   - Contact → Loads contact page ✅

2. **Verify No 404s:**
   - [ ] All links work
   - [ ] No broken links
   - [ ] No demo route links visible

**Test Footer Links:**
1. Scroll to footer
2. Click each link
3. Verify all links functional
4. Verify no demo route links present

---

## Test Suite 4: Cross-App Integration

### Test 4.1: Supabase Connection

**Objective:** Verify both apps use same Supabase project

1. **Check Environment Variables:**
   - Open browser DevTools (F12)
   - In Console, type:
     ```javascript
     console.log(import.meta.env.VITE_SUPABASE_URL)
     ```
   - Expected: `https://lokofoekwbjjxmzwyasa.supabase.co`

2. **Verify Database Writes:**
   - Sign up creates user in `auth.users` ✅ (from Test 1.1)
   - Sign up creates profile in `profiles` ✅ (from Test 1.1)
   - Login uses same user ✅ (from Test 1.3)

3. **Check Network Requests:**
   - Open Network tab (F12)
   - Perform login
   - Look for requests to `lokofoekwbjjxmzwyasa.supabase.co`
   - Expected: Requests go to correct Supabase project

### Test 4.2: Role-Based Access Control

**Objective:** Verify role system works correctly

1. **Prerequisites:** Admin role assigned (from Test 1.1 Step 8)

2. **Verify Role in Database:**
   - Navigate to: https://supabase.com/dashboard/project/lokofoekwbjjxmzwyasa/editor
   - Open `user_roles` table
   - [ ] Your user ID has 'admin' role

3. **Test Role Check (if admin-only features exist):**
   - Log in as admin user
   - Access admin-only pages
   - Expected: Access granted

4. **Test No Role (future test with second user):**
   - Create second user without admin role
   - Try to access admin pages
   - Expected: Access denied or limited features

---

## Test Summary Checklist

Use this checklist to track overall testing progress:

### ✅ Authentication Tests
- [ ] 1.1: Sign Up creates user and profile
- [ ] 1.2: Sign Up validation works
- [ ] 1.3: Login successful with correct credentials
- [ ] 1.4: Login validation works
- [ ] 1.5: Forgot Password sends email
- [ ] 1.6: Logout clears session

### ✅ Route Protection Tests
- [ ] 2.1: Anonymous users redirected from protected routes
- [ ] 2.2: Authenticated users redirected from login
- [ ] 2.3: Authenticated users can access protected routes

### ✅ Route Cleanup Tests
- [ ] 3.1: Phantom routes return 404
- [ ] 3.2: Production routes load correctly
- [ ] 3.3: Navigation and footer links work

### ✅ Integration Tests
- [ ] 4.1: Supabase connection verified
- [ ] 4.2: Role-based access control works

---

## Troubleshooting

### Issue: Email Confirmation Not Received

**Cause:** Email confirmation enabled in Supabase

**Solution:**
1. Navigate to: https://supabase.com/dashboard/project/lokofoekwbjjxmzwyasa/auth/providers
2. Click "Email" provider
3. Uncheck "Confirm email"
4. Save changes
5. Try signing up again

**Alternative:**
- Check spam/junk folder
- Check Supabase logs for email sending errors

### Issue: "Invalid login credentials"

**Causes & Solutions:**

1. **Wrong password:**
   - Reset password via Forgot Password flow
   - Or check password in database

2. **Email not confirmed:**
   - Disable email confirmation in Supabase
   - Or manually confirm in Supabase Dashboard

3. **User doesn't exist:**
   - Sign up first
   - Check Users table in Supabase Dashboard

### Issue: Redirect Loop (login → admin → login)

**Cause:** Session not persisting

**Solution:**
1. Clear browser cache completely
2. Check browser console for errors
3. Verify Supabase client configuration
4. Check if cookies/localStorage are blocked

### Issue: "Forbidden" or Permission Denied

**Cause:** RLS policies blocking access

**Solution:**
1. Check user has correct role in `user_roles` table
2. Verify RLS policies allow access
3. Check `has_role()` function works:
   ```sql
   SELECT has_role('<user_id>', 'admin');
   ```
4. Review RLS policies in Supabase Dashboard

### Issue: Phantom Routes Appear in Autocomplete

**Cause:** Browser history from `_reference/` directory

**Solution:**
- This is expected behavior
- Routes correctly return 404 when accessed
- Clear browser history if confusing
- Use incognito mode for clean testing

---

## Post-Testing Actions

After completing all tests:

### 1. Document Results
- [ ] Note any failing tests
- [ ] Screenshot any errors
- [ ] Record console errors
- [ ] Note browser/device used

### 2. Security Review
- [ ] Verify passwords are not logged to console
- [ ] Check Network tab for sensitive data exposure
- [ ] Verify HTTPS used (in production)
- [ ] Confirm RLS policies are active

### 3. Performance Check
- [ ] Note page load times
- [ ] Check for slow queries in Supabase logs
- [ ] Verify no excessive re-renders

### 4. Update Documentation
- [ ] Mark any issues in GitHub/project management
- [ ] Update known issues in documentation
- [ ] Note any deviations from expected behavior

---

## Next Steps

After all tests pass:
1. ✅ Phase 0.5 (Auth Fix & Routing Cleanup) is complete
2. ✅ System is production-ready for authentication
3. 🚀 Ready to begin Phase 1 (Pages Management)

If tests fail:
1. Document failures
2. Review error messages
3. Check Supabase logs
4. Review `ROUTES_DIAGNOSTIC_REPORT.md`
5. Contact development team if needed

---

## Quick Reference

### Supabase Dashboard Links
- Project: https://supabase.com/dashboard/project/lokofoekwbjjxmzwyasa
- Auth Users: https://supabase.com/dashboard/project/lokofoekwbjjxmzwyasa/auth/users
- Database Editor: https://supabase.com/dashboard/project/lokofoekwbjjxmzwyasa/editor
- SQL Editor: https://supabase.com/dashboard/project/lokofoekwbjjxmzwyasa/sql/new
- Auth Settings: https://supabase.com/dashboard/project/lokofoekwbjjxmzwyasa/auth/providers

### Test Credentials (Created During Testing)
```
Email: testadmin@example.com
Password: TestPassword123!
Role: admin
```

### Common SQL Queries
```sql
-- Check if user exists
SELECT * FROM auth.users WHERE email = 'testadmin@example.com';

-- Check if profile exists
SELECT * FROM profiles WHERE email = 'testadmin@example.com';

-- Check user roles
SELECT * FROM user_roles WHERE user_id = '<user_id>';

-- Assign admin role
INSERT INTO user_roles (user_id, role) 
VALUES ('<user_id>', 'admin');

-- Test has_role function
SELECT has_role('<user_id>', 'admin');
```

---

**End of Testing Guide**
