# VP Website — Frontend Documentation

**Version:** v1.0  
**Last Updated:** 2025-10-09  
**Related PRD:** [PRD.md](./PRD.md) | [Architecture.md](./Architecture.md)

---

## 1. Frontend Overview

The VP Website frontend uses the **Lasight template** (React + TypeScript + Vite) with dynamic content powered by Supabase. All content is managed through the Darkone admin panel and displayed dynamically on the public-facing website.

**Key Technologies:**
- React 18.3.1 + TypeScript 5.9.3
- Vite 5.4.20 (build tool)
- React Router DOM 6.30.1 (routing)
- Lasight CSS + Tailwind CSS (styling)
- @supabase/supabase-js (data fetching)
- React Helmet Async (SEO)
- React Hook Form + Yup (forms)

---

## 2. Directory Structure

```
src/
├── pages/                    # Page components (routes)
│   ├── Home.tsx              # Homepage
│   ├── About.tsx             # About VP page
│   ├── Services.tsx          # Community solutions
│   ├── Blog/                 # News & articles
│   │   ├── BlogList.tsx
│   │   └── BlogDetail.tsx
│   ├── Portfolio/            # Projects & initiatives
│   │   ├── PortfolioList.tsx
│   │   └── PortfolioDetail.tsx
│   ├── Speeches.tsx          # Speeches & documents
│   ├── Contact.tsx           # Contact form
│   ├── Appointments.tsx      # Appointment booking
│   └── Gallery.tsx           # Media gallery (optional)
│
├── components/               # Reusable UI components
│   ├── Header.tsx            # Site header/navigation
│   ├── Footer.tsx            # Site footer
│   ├── QuotesCarousel.tsx    # Homepage quotes carousel
│   ├── ServicesGrid.tsx      # Services display
│   ├── NewsCard.tsx          # News article card
│   ├── ProjectCard.tsx       # Project card
│   ├── PageSection.tsx       # Dynamic page section renderer
│   └── ...
│
├── layouts/                  # Layout wrappers
│   └── MainLayout.tsx        # Main site layout (header + footer)
│
├── hooks/                    # Custom React hooks
│   ├── usePages.ts           # Fetch pages from Supabase
│   ├── useNews.ts            # Fetch news
│   ├── useProjects.ts        # Fetch projects
│   ├── useSpeeches.ts        # Fetch speeches
│   ├── useQuotes.ts          # Fetch quotes
│   ├── useServices.ts        # Fetch services
│   ├── useMedia.ts           # Fetch media
│   └── useEvents.ts          # Fetch events
│
├── lib/                      # Utilities and configurations
│   ├── supabase.ts           # Supabase client initialization
│   └── utils.ts              # Helper functions
│
├── types/                    # TypeScript interfaces
│   ├── database.types.ts     # Auto-generated from Supabase
│   └── index.ts              # Custom types
│
└── router/                   # Route definitions
    └── index.tsx             # React Router setup
```

---

## 3. Supabase Client Setup

**File:** `src/lib/supabase.ts`

```typescript
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
```

**Environment Variables (`.env`):**
```
VITE_SUPABASE_URL=https://[PROJECT_REF].supabase.co
VITE_SUPABASE_ANON_KEY=[ANON_KEY]
```

---

## 4. Custom Hooks

### usePages()

**File:** `src/hooks/usePages.ts`

```typescript
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database.types';

type Page = Database['public']['Tables']['pages']['Row'];

export const usePage = (slug: string) => {
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('pages')
          .select('*')
          .eq('slug', slug)
          .eq('published', true)
          .single();

        if (error) throw error;
        setPage(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug]);

  return { page, loading, error };
};
```

### useNews()

**File:** `src/hooks/useNews.ts`

```typescript
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database.types';

type News = Database['public']['Tables']['news']['Row'];

export const useNews = (limit = 10, featured = false) => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        let query = supabase
          .from('news')
          .select('*')
          .eq('published', true)
          .order('published_at', { ascending: false })
          .limit(limit);

        if (featured) {
          query = query.eq('featured', true);
        }

        const { data, error } = await query;

        if (error) throw error;
        setNews(data || []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [limit, featured]);

  return { news, loading, error };
};

export const useNewsDetail = (slug: string) => {
  const [article, setArticle] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('news')
          .select('*')
          .eq('slug', slug)
          .eq('published', true)
          .single();

        if (error) throw error;
        setArticle(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  return { article, loading, error };
};
```

### useQuotes()

**File:** `src/hooks/useQuotes.ts`

```typescript
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database.types';

type Quote = Database['public']['Tables']['quotes']['Row'];

export const useQuotes = (featured = false) => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        setLoading(true);
        let query = supabase
          .from('quotes')
          .select('*')
          .eq('published', true)
          .order('display_order', { ascending: true });

        if (featured) {
          query = query.eq('featured', true);
        }

        const { data, error } = await query;

        if (error) throw error;
        setQuotes(data || []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, [featured]);

  return { quotes, loading, error };
};
```

**Similar hooks needed:**
- `useProjects.ts`
- `useSpeeches.ts`
- `useServices.ts`
- `useMedia.ts`
- `useEvents.ts`

---

## 5. Page Components

### Home.tsx (Dynamic Homepage) ✅ IMPLEMENTED

**File:** `src/pages/Home.tsx`

The homepage has been successfully migrated to use fully dynamic content from Supabase.

```typescript
import { Helmet } from "react-helmet-async";
import { usePage } from "@/hooks/usePages";
import { PageSection } from "@/components/PageSection";

export default function Home() {
  const { page, loading, error } = usePage('home');

  if (loading) {
    return (
      <div className="container" style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="text-center">
          <h3>Loading...</h3>
        </div>
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="container" style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="text-center">
          <h3>Page not found</h3>
          <p>The homepage content is not yet available. Please configure it in the admin panel.</p>
        </div>
      </div>
    );
  }

  // Sort sections by order
  const sortedSections = [...page.sections].sort((a, b) => a.order - b.order);

  return (
    <>
      <Helmet>
        <title>{page.meta_title || page.title}</title>
        <meta name="description" content={page.meta_description || ''} />
      </Helmet>

      {sortedSections.map((section) => (
        <PageSection key={section.id} section={section} />
      ))}
    </>
  );
}
```

**Key Features:**
- Fully dynamic content driven by database
- Uses `usePage('home')` hook to fetch page data
- Renders sections using `PageSection` component
- SEO meta tags from database
- Loading and error states
- Sections ordered by `order` field

### Blog/BlogList.tsx

**File:** `src/pages/Blog/BlogList.tsx`

```typescript
import { useNews } from '@/hooks/useNews';
import NewsCard from '@/components/NewsCard';
import { Helmet } from 'react-helmet-async';

export default function BlogList() {
  const { news, loading, error } = useNews(20);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <Helmet>
        <title>News & Updates - VP Gregory Allan Rusland</title>
        <meta name="description" content="Latest news and updates from the Vice President's office." />
      </Helmet>

      <div className="blog-list">
        <h1>Latest News</h1>
        <div className="news-grid">
          {news.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </>
  );
}
```

### Contact.tsx (With Form Submission)

**File:** `src/pages/Contact.tsx`

```typescript
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { supabase } from '@/lib/supabase';
import { Helmet } from 'react-helmet-async';

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string(),
  subject: yup.string(),
  message: yup.string().required('Message is required'),
}).required();

type FormData = yup.InferType<typeof schema>;

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const { error: submitError } = await supabase
        .from('contact_submissions')
        .insert({
          name: data.name,
          email: data.email,
          phone: data.phone || null,
          subject: data.subject || null,
          message: data.message,
        });

      if (submitError) throw submitError;

      setSubmitted(true);
      setError(null);
    } catch (err) {
      setError('Failed to submit form. Please try again.');
      console.error(err);
    }
  };

  if (submitted) {
    return (
      <div className="contact-success">
        <h2>Thank you for your message!</h2>
        <p>We will get back to you as soon as possible.</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Contact - VP Gregory Allan Rusland</title>
        <meta name="description" content="Get in touch with the Vice President's office." />
      </Helmet>

      <div className="contact-page">
        <h1>Contact Us</h1>
        
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input {...register('name')} type="text" id="name" />
            {errors.name && <span className="error">{errors.name.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input {...register('email')} type="email" id="email" />
            {errors.email && <span className="error">{errors.email.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input {...register('phone')} type="tel" id="phone" />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input {...register('subject')} type="text" id="subject" />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message *</label>
            <textarea {...register('message')} id="message" rows={6} />
            {errors.message && <span className="error">{errors.message.message}</span>}
          </div>

          <button type="submit" disabled={isSubmitting} className="btn btn-primary">
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </>
  );
}
```

---

## 6. Reusable Components

### PageSection.tsx (Generic Section Renderer)

**File:** `src/components/PageSection.tsx`

```typescript
interface PageSectionProps {
  section: {
    type: string;
    title?: string;
    content?: string;
    image?: string;
    cta_text?: string;
    cta_link?: string;
    order: number;
  };
}

export default function PageSection({ section }: PageSectionProps) {
  switch (section.type) {
    case 'hero':
      return (
        <section className="hero-section" style={{ backgroundImage: `url(${section.image})` }}>
          <div className="hero-content">
            <h1>{section.title}</h1>
            <p>{section.content}</p>
            {section.cta_text && (
              <a href={section.cta_link} className="btn btn-primary">
                {section.cta_text}
              </a>
            )}
          </div>
        </section>
      );

    case 'text_image':
      return (
        <section className="text-image-section">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h2>{section.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: section.content || '' }} />
                {section.cta_text && (
                  <a href={section.cta_link} className="btn btn-secondary">
                    {section.cta_text}
                  </a>
                )}
              </div>
              <div className="col-md-6">
                {section.image && <img src={section.image} alt={section.title} />}
              </div>
            </div>
          </div>
        </section>
      );

    case 'text':
      return (
        <section className="text-section">
          <div className="container">
            <h2>{section.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: section.content || '' }} />
          </div>
        </section>
      );

    case 'cta':
      return (
        <section className="cta-section">
          <div className="container">
            <h2>{section.title}</h2>
            <p>{section.content}</p>
            {section.cta_text && (
              <a href={section.cta_link} className="btn btn-primary btn-lg">
                {section.cta_text}
              </a>
            )}
          </div>
        </section>
      );

    default:
      return null;
  }
}
```

### QuotesCarousel.tsx

**File:** `src/components/QuotesCarousel.tsx`

```typescript
import { useState, useEffect } from 'react';
import type { Database } from '@/types/database.types';

type Quote = Database['public']['Tables']['quotes']['Row'];

interface QuotesCarouselProps {
  quotes: Quote[];
}

export default function QuotesCarousel({ quotes }: QuotesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (quotes.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [quotes.length]);

  if (quotes.length === 0) return null;

  const currentQuote = quotes[currentIndex];

  return (
    <section className="quotes-carousel">
      <div className="container">
        <div className="quote-content">
          <blockquote>
            <p>"{currentQuote.quote_text}"</p>
            <footer>
              <cite>
                {currentQuote.author_name}
                {currentQuote.author_title && <span>, {currentQuote.author_title}</span>}
              </cite>
            </footer>
          </blockquote>
        </div>
        <div className="carousel-dots">
          {quotes.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to quote ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## 7. SEO Implementation

All pages must include:
- `<title>` tag (unique, <60 characters)
- Meta description (<160 characters)
- Open Graph tags (for social sharing)
- Structured data (JSON-LD) where applicable

**Example SEO Component:**

```typescript
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

export default function SEO({ title, description, image, url, type = 'website' }: SEOProps) {
  const siteUrl = 'https://vp-suriname.com';
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const ogImage = image || `${siteUrl}/images/og-default.jpg`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
    </Helmet>
  );
}
```

---

## 8. Performance Optimization

### Lazy Loading Routes

**File:** `src/router/index.tsx`

```typescript
import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';

// Lazy load pages
const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));
const Services = lazy(() => import('@/pages/Services'));
const BlogList = lazy(() => import('@/pages/Blog/BlogList'));
const BlogDetail = lazy(() => import('@/pages/Blog/BlogDetail'));
const Contact = lazy(() => import('@/pages/Contact'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: 'about',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <About />
          </Suspense>
        ),
      },
      // ... more routes
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
```

### Image Lazy Loading

```tsx
<img src={imageUrl} alt={altText} loading="lazy" />
```

---

**Document Control:**  
**Author:** Development Team  
**Next Review:** After Phase 1 completion  
**Change Log:** Initial version — 2025-10-09
