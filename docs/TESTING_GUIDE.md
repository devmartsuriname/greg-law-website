# Phase 4: Testing & Validation Guide

**Version:** v1.0  
**Last Updated:** 2025-10-10  
**Purpose:** Manual testing checklist for authentication, routing, and Supabase integration

---

## Pre-Testing Setup

### 1. Create First Admin User

⚠️ **CRITICAL: Complete this step first!**

1. Navigate to `/admin/sign-up`
2. Sign up with your admin email/password
3. Go to [Supabase Dashboard - Users](https://supabase.com/dashboard/project/lokofoekwbjjxmzwyasa/auth/users)
4. Copy your user UUID
5. Go to [SQL Editor](https://supabase.com/dashboard/project/lokofoekwbjjxmzwyasa/sql/new)
6. Run:
```sql
INSERT INTO public.user_roles (user_id, role)
VALUES ('[paste-your-uuid-here]', 'admin'::app_role);
```
7. Refresh the page and verify you can access admin routes

### 2. Optional: Disable Email Confirmation (for testing)

To speed up testing, you can disable email confirmation:
1. Go to [Supabase Auth Settings](https://supabase.com/dashboard/project/lokofoekwbjjxmzwyasa/auth/providers)
2. Click on "Email" provider
3. Uncheck "Confirm email"
4. Save

**Note:** Re-enable this in production!

---

## 4.1 Authentication Tests

### Test 1: Sign Up with Valid Credentials ✅
**Steps:**
1. Open incognito/private window
2. Navigate to `/admin/sign-up`
3. Fill form:
   - Name: "Test User"
   - Email: "test@example.com"
   - Password: "Test123456" (meets requirements)
   - Check "I accept Terms and Conditions"
4. Click "Sign Up"

**Expected Results:**
- ✅ Success message appears
- ✅ If email confirmation enabled: "Please check your email to confirm"
- ✅ If email confirmation disabled: Auto-redirect to `/admin` or `/admin/login`
- ✅ Check Supabase Dashboard → Users: New user exists
- ✅ Check Supabase Dashboard → Table Editor → profiles: Profile created with full_name

**Verification Query:**
```sql
SELECT u.id, u.email, p.full_name, p.created_at
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.id
WHERE u.email = 'test@example.com';
```

---

### Test 2: Sign Up with Existing Email ❌
**Steps:**
1. Navigate to `/admin/sign-up`
2. Use same email from Test 1: "test@example.com"
3. Fill password and name
4. Click "Sign Up"

**Expected Results:**
- ❌ Error message: "An account with this email already exists. Please sign in instead."
- ✅ No duplicate user created
- ✅ No navigation/redirect occurs

---

### Test 3: Sign Up with Weak Password ❌
**Steps:**
1. Navigate to `/admin/sign-up`
2. Fill form:
   - Email: "newuser@example.com"
   - Password: "weak" (does not meet requirements)
3. Click "Sign Up"

**Expected Results:**
- ❌ Error message appears (client-side validation or Supabase error)
- ✅ Form remains on page
- ✅ No user created

**Password Requirements:**
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number

---

### Test 4: Sign Up Creates Profile Entry ✅
**Verification:**
This is verified in Test 1. Every signup should create both:
- Entry in `auth.users`
- Entry in `public.profiles` (via `handle_new_user()` trigger)

**SQL Verification:**
```sql
-- Check trigger exists and is active
SELECT tgname, tgenabled 
FROM pg_trigger 
WHERE tgname = 'on_auth_user_created';

-- Check profiles match users
SELECT 
  u.id,
  u.email,
  u.created_at as user_created,
  p.full_name,
  p.created_at as profile_created
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.id
ORDER BY u.created_at DESC
LIMIT 5;
```

---

### Test 5: Login with Valid Credentials ✅
**Steps:**
1. Navigate to `/admin/login`
2. Enter credentials:
   - Email: [your admin email from setup]
   - Password: [your password]
3. Click "Sign In"

**Expected Results:**
- ✅ Success: Redirect to `/admin` (Dashboard)
- ✅ User email appears in top-right dropdown
- ✅ Role appears in dropdown (should be "admin")
- ✅ All admin menu items visible
- ✅ No console errors

**Console Verification:**
Open browser DevTools → Console. Should see:
- No authentication errors
- No RLS policy violations

---

### Test 6: Login with Invalid Credentials ❌
**Steps:**
1. Navigate to `/admin/login`
2. Enter:
   - Email: "wrong@example.com"
   - Password: "WrongPassword123"
3. Click "Sign In"

**Expected Results:**
- ❌ Error message: "Invalid email or password. Please try again."
- ✅ Remains on login page
- ✅ No redirect occurs
- ✅ No session created

---

### Test 7: Forgot Password Flow 📧
**Steps:**
1. Navigate to `/admin/forgot-password`
2. Enter valid email address
3. Click "Reset Password"

**Expected Results:**
- ✅ Success message: "Password reset instructions have been sent to your email"
- ✅ Check email inbox for reset link
- ✅ Auto-redirect to `/admin/login` after 5 seconds

**Email Verification:**
1. Check email for reset link
2. Click link → should redirect to password reset page
3. Enter new password
4. Submit → redirect to login
5. Login with new password → success

**Troubleshooting:**
- If no email received, check Supabase → Authentication → URL Configuration
- Ensure Site URL and Redirect URLs are set correctly

---

### Test 8: Logout Clears Session 🚪
**Steps:**
1. Login to `/admin` (if not already logged in)
2. Click user dropdown in top-right
3. Click "Logout"

**Expected Results:**
- ✅ Redirects to `/admin/login`
- ✅ User dropdown no longer shows user info
- ✅ localStorage cleared (check DevTools → Application → Local Storage)
- ✅ Attempting to access `/admin` redirects to `/admin/login`

**localStorage Verification:**
Before logout, check:
```
localStorage.getItem('supabase.auth.token')
```
Should show token data.

After logout:
```
localStorage.getItem('supabase.auth.token')
```
Should return null.

---

### Test 9: Authenticated User Accessing Auth Pages 🔄
**Steps:**
1. Login to admin panel
2. Manually navigate to `/admin/login` in URL bar
3. Press Enter

**Expected Results:**
- ✅ Immediately redirects to `/admin`
- ✅ Does not show login form
- ✅ No flicker or delay

**Repeat for:**
- `/admin/sign-up` → redirects to `/admin`
- `/admin/forgot-password` → redirects to `/admin`

**Code Reference:**
Check `src/admin/pages/Login.tsx`, `SignUp.tsx`, `ForgotPassword.tsx`:
```typescript
useEffect(() => {
  if (user && !authLoading) {
    navigate('/admin');
  }
}, [user, authLoading, navigate]);
```

---

### Test 10: Unauthenticated User Accessing Admin 🔒
**Steps:**
1. Logout (or open incognito window)
2. Navigate to `/admin`

**Expected Results:**
- ✅ Redirects to `/admin/login`
- ✅ Shows loading spinner briefly during auth check
- ✅ Login form appears
- ✅ No "Access Denied" error (just redirect)

**Also test protected routes:**
- `/admin/news` → redirects to `/admin/login`
- `/admin/users` → redirects to `/admin/login`
- `/admin/settings` → redirects to `/admin/login`

**Code Reference:**
Check `src/admin/components/ProtectedRoute.tsx`:
```typescript
if (!user) {
  return <Navigate to="/admin/login" replace />;
}
```

---

## 4.2 Route Cleanup Tests

### Test 11: Demo Routes Return 404 ❌

**Removed Routes (should all return 404):**
1. `/testimonial`
2. `/portfolio/2-col`
3. `/portfolio/masonry`

**Steps for each:**
1. Navigate to URL
2. Verify 404 page appears

**Expected Results:**
- ✅ "Page Not Found" or similar message
- ✅ 404 status code (check Network tab)
- ✅ No content from old pages

**Note:** `/base-ui/*` and `/products` were never implemented, so they should naturally 404.

---

### Test 12: Production Routes Work ✅

**Frontend Routes (Public):**
- [x] `/` → Home page
- [x] `/about` → About page
- [x] `/services` → Services listing
- [x] `/services/business-law` → Service detail (sample slug)
- [x] `/portfolio/1` → Portfolio single (sample id)
- [x] `/blog` → Blog listing
- [x] `/blog/sample-post` → Blog single (sample slug)
- [x] `/contact` → Contact form

**Steps:**
1. Test each route
2. Verify page loads without errors
3. Check no console errors
4. Verify responsive design

**Backend Routes (Authenticated):**
- [x] `/admin` → Dashboard (requires login)
- [x] `/admin/news` → News list (requires role)
- [x] `/admin/projects` → Projects list
- [x] `/admin/speeches` → Speeches list
- [x] `/admin/media` → Media library
- [x] `/admin/users` → Users list (admin only)
- [x] `/admin/settings` → Settings (admin only)

---

### Test 13: Navigation Shows Only Valid Links ✅

**Header Navigation:**
1. Check main nav menu
2. Verify dropdowns work
3. Confirm only production routes are linked

**Expected Structure:**
```
Home
About Us → /about (no dropdown)
Services → Services, Service Detail
Portfolio → Portfolio Single (only)
Blog → Blog List, Blog Single
Contact
```

**Removed:**
- ❌ Testimonial (from About dropdown)
- ❌ Portfolio Two Column
- ❌ Portfolio Masonry

**Code Reference:**
Check `src/data/navigation.ts`

---

### Test 14: Footer Shows Only Valid Links ✅

**Footer Links Section:**
Check `src/components/Footer.tsx`

**Expected Links:**
- Home
- Services
- About us
- News (Blog)
- Contact

**Removed:**
- ❌ Testimonials

---

## 4.3 Cross-App Integration Tests

### Test 15: Frontend Reads Published Content ✅

**Steps:**
1. Login to admin panel
2. Create a test news article:
   - Title: "Test Article"
   - Content: "This is a test"
   - **Check "Published"**
   - Save
3. Navigate to frontend `/blog`
4. Verify article appears

**SQL Verification:**
```sql
-- Insert test news (as admin)
INSERT INTO public.news (title, content, slug, published, author_id)
VALUES (
  'Test Article',
  'This is a test article',
  'test-article',
  true,
  '[your-user-id]'
);

-- Verify frontend can read
SELECT id, title, published 
FROM public.news 
WHERE published = true;
```

**Expected Results:**
- ✅ Published content visible on frontend
- ✅ Unpublished content NOT visible on frontend
- ✅ RLS policies working correctly

---

### Test 16: Backend Can Create/Edit Content ✅

**Steps:**
1. Login to admin panel
2. Navigate to `/admin/news`
3. Click "Create New"
4. Fill form and save
5. Verify news appears in list
6. Edit the news
7. Verify changes saved

**Console Errors to Watch For:**
- ❌ "new row violates row-level security policy"
- ❌ "permission denied for table"
- ❌ "column does not exist"

**If errors occur:**
Check RLS policies:
```sql
-- View policies on news table
SELECT * FROM pg_policies WHERE tablename = 'news';

-- Test policy with specific user
SET LOCAL role authenticated;
SET LOCAL request.jwt.claims TO '{"sub": "[your-user-id]"}';
SELECT * FROM public.news;
```

---

### Test 17: Both Apps Use Same Supabase Project ✅

**Verification:**
1. Check `.env` file:
   ```
   VITE_SUPABASE_URL="https://lokofoekwbjjxmzwyasa.supabase.co"
   ```
2. Check `src/integrations/supabase/client.ts`:
   - Same URL hardcoded
   - Same anon key
3. Create content in admin → should appear on frontend
4. No duplicate data in Supabase dashboard

**Supabase Dashboard Checks:**
- [Table Editor](https://supabase.com/dashboard/project/lokofoekwbjjxmzwyasa/editor) - View data
- [Authentication](https://supabase.com/dashboard/project/lokofoekwbjjxmzwyasa/auth/users) - View users
- [Storage](https://supabase.com/dashboard/project/lokofoekwbjjxmzwyasa/storage/buckets) - View files

---

### Test 18: No CORS Errors ✅

**What to Check:**
1. Open Browser DevTools → Console
2. Perform various actions (login, create content, upload files)
3. Monitor Network tab

**Expected Results:**
- ✅ No CORS errors
- ✅ All Supabase requests succeed (200 status)
- ✅ No "blocked by CORS policy" messages

**Common CORS Issues:**
- Wrong Site URL in Supabase settings
- Missing Redirect URLs
- Incorrect origin headers

**Fix:**
Go to [Supabase URL Configuration](https://supabase.com/dashboard/project/lokofoekwbjjxmzwyasa/auth/url-configuration)
- Set Site URL to your preview/production URL
- Add Redirect URLs for all environments

---

### Test 19: RLS Policies Enforce Access Control 🔒

**Test A: Unauthenticated Access**
1. Logout or open incognito
2. Try to fetch data directly:
```javascript
// Open DevTools Console on frontend
const { data, error } = await supabase.from('news').select('*').eq('published', false);
console.log(data); // Should be empty or null
console.log(error); // May show RLS error
```

**Expected:**
- ✅ Cannot read unpublished content
- ✅ Can read published content

**Test B: Non-Admin User**
1. Create a second user (sign up)
2. Do NOT assign admin role
3. Login as that user
4. Try to access `/admin/users`

**Expected:**
- ✅ "Access Denied" message
- ✅ Cannot modify other users' data

**Test C: Role Hierarchy**
Roles: admin > editor > viewer

1. Create users with different roles
2. Test access to protected routes
3. Verify hierarchy works

**SQL to Assign Roles:**
```sql
-- Make user an editor
INSERT INTO public.user_roles (user_id, role)
VALUES ('[user-id]', 'editor'::app_role);

-- Make user a viewer
INSERT INTO public.user_roles (user_id, role)
VALUES ('[user-id]', 'viewer'::app_role);
```

---

## Testing Checklist Summary

### ✅ Authentication (10 tests)
- [ ] Sign up with valid email/password → success
- [ ] Sign up with existing email → error message shown
- [ ] Sign up with weak password → error message shown
- [ ] Sign up creates profile entry in database
- [ ] Login with valid credentials → redirect to /admin
- [ ] Login with invalid credentials → error message shown
- [ ] Forgot password sends reset email
- [ ] Logout clears session and redirects to login
- [ ] Authenticated user accessing /admin/login → redirect to /admin
- [ ] Unauthenticated user accessing /admin → redirect to /admin/login

### ✅ Route Cleanup (4 tests)
- [ ] /testimonial returns 404
- [ ] /portfolio/2-col returns 404
- [ ] /portfolio/masonry returns 404
- [ ] All production routes work correctly
- [ ] Navigation dropdowns only show valid links
- [ ] Footer only shows valid links

### ✅ Cross-App Integration (5 tests)
- [ ] Frontend can read published content from Supabase
- [ ] Backend can create/edit content in Supabase
- [ ] Both apps use same Supabase project
- [ ] No CORS errors between apps
- [ ] RLS policies enforce proper access control

---

## Troubleshooting Common Issues

### Issue: "Email not confirmed" error
**Solution:**
- Check email inbox for confirmation link
- Or disable email confirmation in Supabase settings

### Issue: Cannot see created content on frontend
**Solution:**
- Verify `published` field is set to `true`
- Check RLS policies allow public read
- Verify slug/id matches route

### Issue: "Permission denied" errors
**Solution:**
- Check user has correct role assigned
- Verify RLS policies in Supabase
- Run security scan: `supabase db linter`

### Issue: Redirect loop on auth pages
**Solution:**
- Check `useEffect` dependencies in auth pages
- Verify `authLoading` state is properly managed
- Clear localStorage and try again

### Issue: 404 on valid routes
**Solution:**
- Check route definition in `src/App.tsx` or `src/router/admin.tsx`
- Verify lazy imports are correct
- Check file names and paths match

---

## Post-Testing Actions

After completing all tests:

1. **Document Issues:**
   - Create list of failed tests
   - Note error messages and screenshots
   - Identify blockers vs. nice-to-haves

2. **Security Review:**
   - Run Supabase linter: [SQL Editor](https://supabase.com/dashboard/project/lokofoekwbjjxmzwyasa/sql/new)
   ```sql
   SELECT * FROM supabase_admin.policy_check();
   ```

3. **Performance Check:**
   - Monitor Network tab for slow queries
   - Check bundle size
   - Test on mobile devices

4. **Update Documentation:**
   - Mark completed tests in this document
   - Update `docs/Tasks.md` with Phase 4 status
   - Note any deviations from expected behavior

---

## Next Steps

After Phase 4 testing is complete and all issues resolved:

✅ **Phase 5: Module Implementation**
- Begin building admin CRUD interfaces
- Implement public-facing content pages
- Add rich text editors and media uploads
- Build advanced features (YouTube sync, calendar integration)

---

**Last Updated:** 2025-10-10  
**Tested By:** [Your Name]  
**Status:** Ready for Testing
