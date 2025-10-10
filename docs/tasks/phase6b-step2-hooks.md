# Phase 6B Step 2: Dynamic Content Hooks

## Overview
This document describes the data-fetching hooks created for the dynamic homepage implementation.

**Created:** Phase 6B Step 2  
**Status:** ✅ Complete  
**File:** `src/hooks/useDynamicContent.ts`

---

## Purpose
Provide lightweight, Supabase-based hooks to fetch dynamic content for homepage sections without requiring React Query or external caching libraries.

---

## Implemented Hooks

### 1. `useDynamicServices()`
**Purpose:** Fetch all published services for the services grid section

**Usage:**
```typescript
import { useDynamicServices } from '@/hooks/useDynamicContent';

const MyComponent = () => {
  const { data, loading, error } = useDynamicServices();
  
  if (loading) return <div>Loading services...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {data.map(service => (
        <div key={service.id}>{service.title}</div>
      ))}
    </div>
  );
};
```

**Query Details:**
- Table: `services`
- Filter: `published = true`
- Order: `display_order ASC`
- Limit: None (fetches all)

**Return Type:**
```typescript
{
  data: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
    category: string;
    featured: boolean;
    published: boolean;
    display_order: number;
    created_by: string;
    created_at: string;
    updated_at: string;
  }>;
  loading: boolean;
  error: string | null;
}
```

---

### 2. `useDynamicTeam(limit = 4)`
**Purpose:** Fetch published team members for the team grid section

**Usage:**
```typescript
import { useDynamicTeam } from '@/hooks/useDynamicContent';

const TeamSection = () => {
  const { data, loading, error } = useDynamicTeam(4); // Default: 4
  
  if (loading) return <div>Loading team...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {data.map(member => (
        <div key={member.id}>
          <img src={member.photo_url} alt={member.name} />
          <h3>{member.name}</h3>
          <p>{member.title}</p>
        </div>
      ))}
    </div>
  );
};
```

**Query Details:**
- Table: `team_members`
- Filter: `published = true`
- Order: `display_order ASC`
- Limit: Configurable (default: 4)

**Return Type:**
```typescript
{
  data: Array<{
    id: string;
    name: string;
    title: string;
    bio: string;
    photo_url: string;
    social_links: {
      facebook?: string;
      twitter?: string;
      linkedin?: string;
    };
    display_order: number;
    published: boolean;
    created_by: string;
    created_at: string;
    updated_at: string;
  }>;
  loading: boolean;
  error: string | null;
}
```

---

### 3. `useDynamicTestimonials(limit = 3)`
**Purpose:** Fetch published testimonials for testimonial sections

**Usage:**
```typescript
import { useDynamicTestimonials } from '@/hooks/useDynamicContent';

const TestimonialsSection = () => {
  const { data, loading, error } = useDynamicTestimonials(3); // Default: 3
  
  if (loading) return <div>Loading testimonials...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {data.map(testimonial => (
        <div key={testimonial.id}>
          <p>{testimonial.testimonial_text}</p>
          <h4>{testimonial.client_name}</h4>
          <span>{testimonial.client_company}</span>
        </div>
      ))}
    </div>
  );
};
```

**Query Details:**
- Table: `testimonials`
- Filter: `published = true AND featured = true`
- Order: `display_order ASC`
- Limit: Configurable (default: 3)

**Return Type:**
```typescript
{
  data: Array<{
    id: string;
    client_name: string;
    client_company: string;
    client_photo_url: string;
    testimonial_text: string;
    featured: boolean;
    published: boolean;
    display_order: number;
    created_by: string;
    created_at: string;
    updated_at: string;
  }>;
  loading: boolean;
  error: string | null;
}
```

---

### 4. `useDynamicNews(limit = 3)`
**Purpose:** Fetch latest published news articles for news preview section

**Usage:**
```typescript
import { useDynamicNews } from '@/hooks/useDynamicContent';

const NewsSection = () => {
  const { data, loading, error } = useDynamicNews(3); // Default: 3
  
  if (loading) return <div>Loading news...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {data.map(article => (
        <div key={article.id}>
          <img src={article.featured_image} alt={article.title} />
          <h3>{article.title}</h3>
          <p>{article.excerpt}</p>
          <span>{new Date(article.published_at).toLocaleDateString()}</span>
        </div>
      ))}
    </div>
  );
};
```

**Query Details:**
- Table: `news`
- Filter: `published = true`
- Order: `published_at DESC` (most recent first)
- Limit: Configurable (default: 3)

**Return Type:**
```typescript
{
  data: Array<{
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featured_image: string;
    category: string;
    tags: string[];
    author_id: string;
    published: boolean;
    featured: boolean;
    published_at: string;
    created_at: string;
    updated_at: string;
  }>;
  loading: boolean;
  error: string | null;
}
```

---

## Design Patterns

### Consistent Return Shape
All hooks follow the same pattern:
```typescript
{
  data: Array<T>,
  loading: boolean,
  error: string | null
}
```

### Error Handling
- Try-catch blocks around all Supabase queries
- Errors logged to console for debugging
- User-friendly error messages in state
- Loading state managed properly

### Loading States
- Initial state: `loading = true`
- After fetch: `loading = false`
- Error state still sets `loading = false`

### Dependencies
- Hooks re-run when `limit` parameter changes
- Uses `useEffect` dependency array properly
- No stale closure issues

---

## Integration Plan (Next Steps)

### Step 3: Connect to PageSection.tsx
Update section type handlers to use these hooks:

```typescript
// In PageSection.tsx

// services_grid_dynamic section
if (type === 'services_grid_dynamic') {
  const { data: services } = useDynamicServices();
  // ... render with services
}

// team_grid section
if (type === 'team_grid') {
  const { data: team } = useDynamicTeam(data.limit || 4);
  // ... render with team
}

// news_preview section
if (type === 'news_preview') {
  const { data: news } = useDynamicNews(data.limit || 3);
  // ... render with news
}
```

### Step 4: Create HomeDynamic.tsx
Use `usePage('home')` to fetch page sections and render with PageSection component:

```typescript
import { usePage } from '@/hooks/usePages';
import { PageSection } from '@/components/PageSection';

export const HomeDynamic = () => {
  const { page, loading, error } = usePage('home');
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading page</div>;
  
  return (
    <>
      {page?.sections.map(section => (
        <PageSection key={section.id} section={section} />
      ))}
    </>
  );
};
```

---

## Testing Checklist

### Manual Testing
- [ ] Verify services query returns published services only
- [ ] Confirm team query respects limit parameter
- [ ] Check testimonials filtered by featured flag
- [ ] Validate news ordered by published_at descending
- [ ] Test error handling with invalid queries
- [ ] Confirm loading states work correctly

### Data Validation
- [ ] Ensure RLS policies allow public read access to published records
- [ ] Verify foreign key relationships intact
- [ ] Check display_order sorting works correctly
- [ ] Confirm date formatting works for news articles

---

## Performance Considerations

### Current Implementation
- Simple `useEffect` with Supabase client
- No caching layer
- Re-fetches on component mount
- Suitable for Phase 6B proof-of-concept

### Future Optimizations (Phase 7+)
- Add React Query for caching and background updates
- Implement stale-while-revalidate pattern
- Add pagination for large datasets
- Consider edge function for data aggregation
- Add real-time subscriptions for live updates

---

## Rollback Procedure
If issues arise:
1. These hooks are isolated - no dependencies on existing code
2. Can be safely deleted without affecting static homepage
3. No database changes required
4. No RLS policy modifications needed

---

## Success Criteria
✅ All 4 hooks implemented and exported  
✅ Consistent API and return types  
✅ Proper error handling and loading states  
✅ TypeScript types properly defined  
✅ No build errors or warnings  
✅ Documentation complete  
✅ Ready for integration in Step 3

---

## Next Steps
**Step 3:** Create `src/pages/HomeDynamic.tsx` and preview route `/preview/home`  
**Step 4:** Connect dynamic hooks to PageSection.tsx section types  
**Step 5:** Seed database with homepage section data  
**Step 6:** QA testing and visual parity validation
