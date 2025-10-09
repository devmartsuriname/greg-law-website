# VP Website — Security Documentation

**Version:** v1.0  
**Last Updated:** 2025-10-09  
**Related PRD:** [PRD.md](./PRD.md) | [Backend.md](./Backend.md) | [Architecture.md](./Architecture.md)

---

## 1. Security Overview

This document outlines all security measures, RLS policies, authentication strategies, and best practices for the VP Website project.

**Security Principles:**
- **Defense in Depth:** Multiple layers of security
- **Least Privilege:** Users/roles have minimum necessary permissions
- **Audit Everything:** All admin actions logged
- **Fail Securely:** Errors don't reveal sensitive information
- **Input Validation:** All user input validated and sanitized

---

## 2. Authentication & Authorization

### 2.1 Authentication Strategy

**Method:** Supabase Auth (email + password)

**Flow:**
1. User submits email + password via login form
2. Supabase Auth validates credentials
3. On success, session token stored in localStorage (httpOnly)
4. User profile and role fetched from `profiles` and `user_roles` tables
5. App state updated with user info
6. Protected routes check authentication status

**Password Requirements:**
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character (recommended)

**Session Management:**
- Session timeout: 24 hours (configurable)
- Automatic refresh token rotation
- Session invalidation on logout
- Concurrent session limit: 3 per user (optional)

---

### 2.2 Role-Based Access Control (RBAC)

**Roles:**

| Role | Permissions | Use Case |
|------|-------------|----------|
| `admin` | Full access (CRUD all content, manage users, view audit logs) | IT administrators, senior staff |
| `editor` | Create, edit, delete, publish content (News, Projects, Speeches, etc.) | Communications team, content managers |
| `viewer` | Read-only access (view content, appointments, contact submissions) | Support staff, interns |

**Role Assignment:**
- Only `admin` can assign roles
- Default role for new users: `viewer`
- Role changes logged in `audit_logs`

---

### 2.3 Protected Routes

**Frontend Route Guards:**

```typescript
// src/router/guards.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'editor' | 'viewer';
}

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, role, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (requiredRole && !hasPermission(role, requiredRole)) {
    return <Navigate to="/admin" replace />; // Insufficient permissions
  }

  return <>{children}</>;
};

function hasPermission(userRole: string, requiredRole: string): boolean {
  const roleHierarchy = { admin: 3, editor: 2, viewer: 1 };
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
}
```

**Usage:**

```typescript
<Route
  path="/admin/users"
  element={
    <ProtectedRoute requiredRole="admin">
      <UsersList />
    </ProtectedRoute>
  }
/>
```

---

## 3. Row-Level Security (RLS) Policies

All Supabase tables use RLS to enforce permissions at the database level.

### 3.1 Public Read, Role-Based Write (Content Tables)

**Pattern:** Public users can view published content, authenticated editors/admins can manage.

**Example (News table):**

```sql
-- Enable RLS
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

-- Policy 1: Public can view published news
CREATE POLICY "Public can view published news"
  ON public.news FOR SELECT
  USING (published = true);

-- Policy 2: Editors can view all news (including drafts)
CREATE POLICY "Editors can view all news"
  ON public.news FOR SELECT
  USING (has_role('editor') OR has_role('admin'));

-- Policy 3: Editors can insert news
CREATE POLICY "Editors can create news"
  ON public.news FOR INSERT
  WITH CHECK (has_role('editor') OR has_role('admin'));

-- Policy 4: Editors can update news
CREATE POLICY "Editors can update news"
  ON public.news FOR UPDATE
  USING (has_role('editor') OR has_role('admin'));

-- Policy 5: Admins can delete news
CREATE POLICY "Admins can delete news"
  ON public.news FOR DELETE
  USING (has_role('admin'));
```

**Apply same pattern to:**
- `pages`
- `projects`
- `speeches`
- `quotes`
- `services`
- `events`
- `media`

---

### 3.2 User-Specific Policies (Profiles)

```sql
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (has_role('admin'));

-- Admins can update all profiles
CREATE POLICY "Admins can update all profiles"
  ON public.profiles FOR UPDATE
  USING (has_role('admin'));
```

---

### 3.3 Admin-Only Access (User Roles)

```sql
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Users can view their own role
CREATE POLICY "Users can view own role"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

-- Admins can manage all roles
CREATE POLICY "Admins can manage roles"
  ON public.user_roles FOR ALL
  USING (has_role('admin'));
```

---

### 3.4 Public Insert, Staff Manage (Engagement Tables)

**Appointments & Contact Submissions:**

```sql
-- Appointments
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Anyone can create appointment requests
CREATE POLICY "Anyone can create appointments"
  ON public.appointments FOR INSERT
  WITH CHECK (true);

-- Staff can view and manage appointments
CREATE POLICY "Staff can manage appointments"
  ON public.appointments FOR ALL
  USING (has_role('admin') OR has_role('editor') OR has_role('viewer'));

-- Contact Submissions (same pattern)
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create contact submissions"
  ON public.contact_submissions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Staff can manage contact submissions"
  ON public.contact_submissions FOR ALL
  USING (has_role('admin') OR has_role('editor') OR has_role('viewer'));
```

---

### 3.5 Admin-Only Access (Audit Logs)

```sql
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Admins can view audit logs
CREATE POLICY "Admins can view audit logs"
  ON public.audit_logs FOR SELECT
  USING (has_role('admin'));

-- System can insert audit logs (via service role)
CREATE POLICY "System can insert audit logs"
  ON public.audit_logs FOR INSERT
  WITH CHECK (true);
```

---

### 3.6 Storage Bucket Policies

**media-uploads bucket:**

```sql
-- Public can view uploaded media
CREATE POLICY "Public can view media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'media-uploads');

-- Editors can upload media
CREATE POLICY "Editors can upload media"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'media-uploads'
    AND (has_role('editor') OR has_role('admin'))
  );

-- Editors can update media
CREATE POLICY "Editors can update media"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'media-uploads'
    AND (has_role('editor') OR has_role('admin'))
  );

-- Admins can delete media
CREATE POLICY "Admins can delete media"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'media-uploads'
    AND has_role('admin')
  );
```

**documents bucket:** (Same policies as media-uploads)

---

## 4. Input Validation & Sanitization

### 4.1 Form Validation (Frontend)

**Library:** React Hook Form + Yup

**Example Schema:**

```typescript
import * as yup from 'yup';

export const newsSchema = yup.object({
  title: yup.string()
    .required('Title is required')
    .min(5, 'Title must be at least 5 characters')
    .max(200, 'Title must be less than 200 characters'),
  
  slug: yup.string()
    .required('Slug is required')
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be URL-friendly'),
  
  excerpt: yup.string()
    .max(500, 'Excerpt must be less than 500 characters'),
  
  content: yup.string()
    .required('Content is required')
    .min(50, 'Content must be at least 50 characters'),
  
  category: yup.string()
    .required('Category is required'),
  
  published: yup.boolean(),
  
  featured: yup.boolean(),
}).required();
```

**Usage:**

```typescript
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { newsSchema } from '@/lib/validation';

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: yupResolver(newsSchema),
});
```

---

### 4.2 Rich Text Sanitization

**Library:** DOMPurify (recommended)

**Install:**
```bash
npm install dompurify
npm install --save-dev @types/dompurify
```

**Usage:**

```typescript
import DOMPurify from 'dompurify';

function sanitizeHTML(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'ul', 'ol', 'li', 'a', 'img'],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class'],
    ALLOW_DATA_ATTR: false,
  });
}

// Before saving to database
const sanitizedContent = sanitizeHTML(richTextContent);
```

---

### 4.3 SQL Injection Prevention

**Protection:** Supabase uses parameterized queries automatically.

**Safe:**
```typescript
const { data, error } = await supabase
  .from('news')
  .select('*')
  .eq('slug', userInputSlug); // ✅ Safe, parameterized
```

**Unsafe (never do this):**
```typescript
// ❌ NEVER use raw SQL with user input
const { data } = await supabase.rpc('raw_query', {
  sql: `SELECT * FROM news WHERE slug = '${userInputSlug}'`
});
```

---

### 4.4 XSS Prevention

**Frontend:**
- Never use `dangerouslySetInnerHTML` without sanitizing
- Always sanitize user-generated HTML content
- Use Content Security Policy (CSP) headers

**CSP Headers (NGINX):**

```nginx
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://*.supabase.co;";
```

---

## 5. Rate Limiting & Spam Protection

### 5.1 Rate Limiting (Public Forms)

**Contact Form & Appointments:**
- Max 3 submissions per IP per hour
- Implement using Supabase Edge Functions or middleware

**Example (Supabase Edge Function):**

```typescript
// Check rate limit before insert
const { count } = await supabase
  .from('contact_submissions')
  .select('*', { count: 'exact', head: true })
  .eq('ip_address', clientIP)
  .gte('created_at', new Date(Date.now() - 3600000).toISOString());

if (count && count >= 3) {
  return new Response(
    JSON.stringify({ error: 'Rate limit exceeded. Try again later.' }),
    { status: 429 }
  );
}
```

---

### 5.2 Honeypot Field (Anti-Bot)

Add hidden field to forms:

```tsx
<input
  type="text"
  name="website"
  style={{ display: 'none' }}
  tabIndex={-1}
  autoComplete="off"
/>
```

**Validation:**

```typescript
if (formData.website) {
  // Likely a bot, silently reject
  return;
}
```

---

## 6. File Upload Security

### 6.1 Validation

**Allowed file types:**
- Images: `image/jpeg`, `image/png`, `image/webp`, `image/gif`
- Documents: `application/pdf`, `application/msword`, `application/vnd.openxmlformats-officedocument.wordprocessingml.document`

**Max file size:**
- Images: 5MB
- Documents: 10MB

**Validation code:**

```typescript
function validateFile(file: File, type: 'image' | 'document'): boolean {
  const allowedTypes = {
    image: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    document: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  };

  const maxSizes = {
    image: 5 * 1024 * 1024, // 5MB
    document: 10 * 1024 * 1024, // 10MB
  };

  if (!allowedTypes[type].includes(file.type)) {
    return false;
  }

  if (file.size > maxSizes[type]) {
    return false;
  }

  return true;
}
```

---

### 6.2 Filename Sanitization

```typescript
function sanitizeFilename(filename: string): string {
  // Remove special characters, spaces, etc.
  return filename
    .toLowerCase()
    .replace(/[^a-z0-9.-]/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 100);
}

// Generate unique filename
function generateUniqueFilename(originalFilename: string): string {
  const ext = originalFilename.split('.').pop();
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  return `${timestamp}-${random}.${ext}`;
}
```

---

## 7. Audit Logging

### 7.1 Automatic Logging

All admin actions (create, update, delete, publish) should be logged.

**Implementation:**

```typescript
// src/lib/audit.ts
import { supabase } from './supabase';

export async function logAudit(
  action: 'create' | 'update' | 'delete' | 'publish' | 'unpublish',
  tableName: string,
  recordId: string,
  oldValues?: any,
  newValues?: any
) {
  const { error } = await supabase
    .from('audit_logs')
    .insert({
      action,
      table_name: tableName,
      record_id: recordId,
      old_values: oldValues || null,
      new_values: newValues || null,
    });

  if (error) {
    console.error('Failed to log audit:', error);
  }
}
```

**Usage in API calls:**

```typescript
// After updating news
const { data: updatedNews, error } = await supabase
  .from('news')
  .update(updates)
  .eq('id', newsId)
  .select()
  .single();

if (!error && updatedNews) {
  await logAudit('update', 'news', newsId, oldNews, updatedNews);
}
```

---

### 7.2 Login/Logout Logging

```typescript
// On login
await logAudit('login', 'auth', userId);

// On logout
await logAudit('logout', 'auth', userId);
```

---

## 8. HTTPS & Infrastructure Security

### 8.1 SSL Certificate (Let's Encrypt)

**Installation:**

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d vp-suriname.com -d www.vp-suriname.com
```

**Auto-renewal:**

```bash
sudo systemctl status certbot.timer
```

---

### 8.2 NGINX Security Headers

```nginx
# Security headers
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;

# CSP (Content Security Policy)
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://*.supabase.co;" always;
```

---

### 8.3 Firewall Rules (UFW)

```bash
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw enable
sudo ufw status
```

---

### 8.4 SSH Hardening

**Disable password authentication (use SSH keys only):**

Edit `/etc/ssh/sshd_config`:

```
PasswordAuthentication no
PermitRootLogin no
```

Restart SSH:

```bash
sudo systemctl restart sshd
```

---

## 9. Security Checklist

### Pre-Launch Security Audit

- [ ] All tables have RLS enabled
- [ ] All RLS policies tested with different roles
- [ ] All forms have validation (frontend + backend)
- [ ] Rich text content is sanitized before display
- [ ] File uploads validated (type, size)
- [ ] Rate limiting on public forms implemented
- [ ] Honeypot fields added to public forms
- [ ] All API endpoints require authentication (except public reads)
- [ ] Audit logging working for all admin actions
- [ ] SSL certificate installed and auto-renewal configured
- [ ] Security headers configured in NGINX
- [ ] Firewall rules configured (UFW)
- [ ] SSH hardened (key-only authentication)
- [ ] Password requirements enforced
- [ ] Session timeout configured
- [ ] Error messages don't reveal sensitive info
- [ ] Database backups scheduled
- [ ] Monitoring and alerting configured

---

## 10. Incident Response Plan

### 10.1 Security Breach Procedure

1. **Identify & Contain**
   - Isolate affected systems
   - Revoke compromised credentials
   - Block malicious IPs

2. **Investigate**
   - Review audit logs
   - Check database for unauthorized changes
   - Identify attack vector

3. **Recover**
   - Restore from backups if needed
   - Patch vulnerabilities
   - Reset passwords

4. **Report**
   - Notify VP office
   - Document incident
   - Implement preventive measures

### 10.2 Emergency Contacts

| Role | Name | Contact |
|------|------|---------|
| System Administrator | [TBD] | [Phone/Email] |
| Security Lead | [TBD] | [Phone/Email] |
| VP Office Contact | [TBD] | [Phone/Email] |

---

**Document Control:**  
**Author:** Security Team  
**Next Review:** Quarterly or after security incident  
**Change Log:** Initial version — 2025-10-09
