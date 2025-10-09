# LawSight - React Migration

This project is a migration of the LawSight Law HTML template to a modern React + TypeScript + Vite stack.

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **React Helmet Async** - SEO management
- **Original CSS** - Kept all original stylesheets (Bootstrap, custom CSS)
- **Original JavaScript** - Legacy scripts loaded for animations and plugins

## Project Structure

```
/
├── public/                    # Static assets (moved from root)
│   ├── css/                  # Original CSS files
│   ├── fonts/                # Font files
│   ├── images/               # All images
│   └── js/                   # Original jQuery and plugins
├── src/
│   ├── components/           # Reusable React components
│   │   ├── Header.tsx        # Main navigation header
│   │   ├── Footer.tsx        # Footer component
│   │   ├── HiddenBar.tsx     # Sidebar navigation
│   │   ├── PageTitle.tsx     # Page title with breadcrumbs
│   │   ├── Preloader.tsx     # Loading animation
│   │   └── ScrollToTop.tsx   # Scroll restoration on route change
│   ├── data/                 # Data files and constants
│   │   ├── navigation.ts     # Navigation menu structure
│   │   ├── services.ts       # Services data
│   │   └── testimonials.ts   # Testimonials data
│   ├── layouts/              # Layout components
│   │   └── MainLayout.tsx    # Main layout with header/footer
│   ├── pages/                # Page components (routes)
│   │   ├── Home.tsx          # Homepage (from index-2.html)
│   │   ├── About.tsx         # About page
│   │   ├── Testimonial.tsx   # Testimonials page
│   │   ├── Services.tsx      # Services listing
│   │   ├── ServicesDetail.tsx # Service detail page
│   │   ├── BlogList.tsx      # Blog listing
│   │   ├── BlogSingle.tsx    # Single blog post
│   │   ├── Contact.tsx       # Contact form
│   │   ├── PortfolioMasonry.tsx     # Portfolio masonry layout
│   │   ├── PortfolioTwoColumn.tsx   # Portfolio 2-column layout
│   │   ├── PortfolioSingle.tsx      # Portfolio single item
│   │   └── NotFound.tsx      # 404 page
│   ├── App.tsx               # Main app with routing
│   ├── main.tsx              # Entry point
│   └── vite-env.d.ts         # Vite type definitions
├── index-react.html          # HTML entry point for React
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Dependencies
└── README.md                 # This file
```

## HTML to React Page Mapping

| Original HTML File       | React Route              | Component Location          |
|-------------------------|--------------------------|----------------------------|
| index-2.html (primary)   | `/`                      | src/pages/Home.tsx         |
| index.html               | (not used, index-2 chosen)| -                         |
| about.html               | `/about`                 | src/pages/About.tsx        |
| testimonial.html         | `/testimonial`           | src/pages/Testimonial.tsx  |
| services.html            | `/services`              | src/pages/Services.tsx     |
| services-detail.html     | `/services/:slug`        | src/pages/ServicesDetail.tsx |
| portfolio-masonry.html   | `/portfolio/masonry`     | src/pages/PortfolioMasonry.tsx |
| portfolio-2-column.html  | `/portfolio/2-col`       | src/pages/PortfolioTwoColumn.tsx |
| portfolio-single.html    | `/portfolio/:id`         | src/pages/PortfolioSingle.tsx |
| blog-list.html           | `/blog`                  | src/pages/BlogList.tsx     |
| blog-single.html         | `/blog/:slug`            | src/pages/BlogSingle.tsx   |
| contact.html             | `/contact`               | src/pages/Contact.tsx      |
| -                        | `/404` (catch-all)       | src/pages/NotFound.tsx     |

## Assets Migration

All static assets have been moved to the `/public` directory:

- `/css` → `/public/css` - All original CSS files preserved
- `/fonts` → `/public/fonts` - Font files
- `/images` → `/public/images` - All images
- `/js` → `/public/js` - Original jQuery and plugin scripts

Assets are referenced with absolute paths (e.g., `/images/logo.png`) in components.

## Key Features

### Routing
- Client-side routing with React Router v6
- Lazy loading for all pages
- Automatic scroll restoration on route changes
- Dynamic routes for services, blog posts, and portfolio items

### SEO
- Each page has unique title and meta tags via react-helmet-async
- Breadcrumb navigation on all internal pages
- Proper semantic HTML structure maintained

### Forms
- Contact form with React state management
- Form validation
- **TODO**: Connect to actual backend or email service (Resend, EmailJS, etc.)
  - Currently uses mock submission
  - See `src/pages/Contact.tsx` for implementation

### Scripts
- Original jQuery and plugins loaded after React mounts
- Owl Carousel for sliders
- Fancybox for lightboxes
- WOW.js for scroll animations
- All animations and interactive elements preserved

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Runs the app in development mode at `http://localhost:5173`

### Build

```bash
npm run build
```

Builds the app for production to the `/dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Adding a New Page

1. **Create the page component** in `src/pages/YourPage.tsx`:

```typescript
import PageTitle from '../components/PageTitle';

export default function YourPage() {
  return (
    <>
      <PageTitle
        title="Your Page Title"
        breadcrumbs={[{ label: 'Your Page' }]}
        metaTitle="Your Page | LawSight"
        metaDescription="Description for SEO"
      />
      
      <section className="your-section">
        <div className="container">
          {/* Your content here */}
        </div>
      </section>
    </>
  );
}
```

2. **Add the route** in `src/App.tsx`:

```typescript
// Import
const YourPage = lazy(() => import('./pages/YourPage'));

// Add route
<Route path="your-path" element={<YourPage />} />
```

3. **Add navigation link** in `src/data/navigation.ts`:

```typescript
{
  label: 'Your Page',
  path: '/your-path',
}
```

## Adding Data

To add services, testimonials, or other data:

1. Edit the relevant file in `src/data/`
2. Follow the TypeScript interface for type safety
3. The data will automatically appear on the respective pages

## Customization

### Styling
- Original CSS files are in `/public/css/`
- Modify `main.css` for custom styles
- All Bootstrap classes work as expected

### Content
- Edit page components in `src/pages/`
- Update data files in `src/data/`
- Replace images in `/public/images/`

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2020 JavaScript features
- React 18 compatible

## TODO

- [ ] Connect contact form to backend email service
- [ ] Add actual blog CMS or API integration
- [ ] Implement portfolio filtering
- [ ] Add search functionality
- [ ] Consider migrating from jQuery to React-only solutions for better performance
- [ ] Add unit tests
- [ ] Add E2E tests

## Notes

- **index-2.html was chosen** as the primary homepage because it has a cleaner, more modern design
- **jQuery is still used** for original animations and plugins. Consider migrating to React alternatives for better performance
- **sendemail.php** was replaced with a React form component. Backend integration needed for actual email sending

## License

Original template by Themexriver. React migration by [Your Name].
